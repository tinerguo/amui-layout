<template>
    <div class="side-nav">
        <ul class="sub" :class="ulClass" >
            <menu-item  ref="menuItem" v-for="(item, i) in t_menuData"
                   :key="item.id"
                   :id-link="idLink"
                   :level="level"
                   :store="store"
                   :top-index="topIndex"
                   :stor-active-obj="storActiveObj"
                   :menu-data="item"
            ></menu-item>
        </ul>
        <!--<ul class="nav">
            <li v-for="(item,i) in menuData" :key="i" :class="liWrapClass(item)"
                :index="i">
                <a @click.prevent="handleSelect" href="javascript:;">
                    <i class="menu-icon-02 am-icon am-icon-waterdrop"></i>
                    {{item.name}}
                    <i class="am-icon sideNav-arrow am-icon-ios-arrow-down" style="float: right;"></i>
                </a>

                <menu-item v-if="item.children" v-for="(childItem, i) in item.children"
                           :key="childItem.id"
                           :menuData="childItem"></menu-item>
            </li>
        </ul>-->
    </div>
</template>


<script>
    import menuItem from './menuItemV1.vue'
    export default {
        name: 'am-menu',
        components: { menuItem },
        props: {
            isTopMenu:{
                type: Boolean,
                default () {
                    return false;
                }
            },
            menuData: {
                type: Array,
                default () {
                    return [];
                }
            },
            store:{
                type: Boolean,
                default () {
                    return true;
                }
            }
        },
        data () {
            return {
                t_menuData:[],
                idLink:'',
                level:1,
                topIndex:0,//如果header中存在menu菜单的话,这个是headermenu菜单的下标
                storActiveObj:{}
            };
        },
        computed: {
            //todo:ul包装器
            ulClass:function(){
                return [
                    "level-"+this.level
                ]
            }
        },
        methods:{
            liWrapClass:function(item){
                return {
                    hasChild:item.children && item.children.length>0,
                    expand:item.children && item.expand
                }
            },
            layoutInit:function(){
                //预留字段 todo:判断header中是否显示菜单
                if(this.isTopMenu) {
                    this.$amui.$emit('am-menu-dataInit', this.menuData);
                }
            },
            //todo:监听header菜单点击事件
            onHeaderMemuSelect:function(i){
                let t_obj = this.$amui.getStore("topIndex");
                this.storActiveObj = t_obj;
                if(this.menuData && this.menuData.length > 0){
                    this.t_menuData =  this.menuData[i].children;
                    this.idLink = this.menuData[i].id+"";
                }
                this.topIndex = i;
                //todo:头部菜单修改的时候,默认选中一个菜单
                /*DOM还没更新*/
                this.$nextTick(function(){
                    debugger;
                    if(this.$refs["menuItem"] && this.$refs["menuItem"].length > 0){
                        
                        this.$refs["menuItem"][0].onSelectDefault()
                    }
                    
                });
            }
        },
        created(){
            //todo:监听layout渲染完成事件
            this.$amui.$on('am-layout-mounted-end', this.layoutInit);

            //如果不存在头部菜单的话,初始化设置菜单数据
            //如果存在头部菜单的话,通过监听菜单的选择时间设置菜单数据
            if(!this.isTopMenu){
                this.t_menuData =  this.menuData;
            }
        },
        watch:{
            menuData(newVal,oldVal){
                if(this.isTopMenu){
                  this.t_menuData = this.menuData[0].children;
                }else{
                    this.t_menuData =  this.menuData;
                }
                this.$amui.$emit('am-menu-dataInit', this.menuData);
            }
        },
        mounted () {
            var _this = this;
            //todo:监听header菜单选择事件
            this.$amui.$on('am-head-menuSelect', this.onHeaderMemuSelect);
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .side-nav {
        padding-top:20px;
        padding-left:10px;
        li,ul{
            list-style: none;
            position: relative;

        }
        //全局配置
        .nav>li, .nav>li>a {
            position: relative;
            display: block;
        }
        ul>li.expand{
            &>a>.sideNav-arrow {
                transform:rotate(0deg);
                -ms-transform:rotate(0deg); 	/* IE 9 */
                -moz-transform:rotate(0deg); 	/* Firefox */
                -webkit-transform:rotate(0deg); /* Safari 和 Chrome */
                -o-transform:rotate(0deg); 	/* Opera */
            }
        }
        ul>li{
            cursor: pointer;
            &>a {
                display: inline-block;
                width: 100%;
                position: relative;
                line-height: 20px;
                letter-spacing: .3px;
                transition: background;
                transition-duration: .4s;
                color:#fff;
                .menu-icon-02 {
                    color: #f7b55e;
                }
                &>.sideNav-arrow {
                    margin-right: 5px;
                    font-size: 14px;
                    transition: all;
                    transition-duration: .4s;
                    margin-top: 0;
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    margin-top: -6px;
                    display: none;
                    transform:rotate(90deg);
                    -ms-transform:rotate(90deg); 	/* IE 9 */
                    -moz-transform:rotate(90deg); 	/* Firefox */
                    -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
                    -o-transform:rotate(90deg); 	/* Opera */
                }
            }



            &.hasChild>a>.sideNav-arrow {
                display: block;
            }
        }
    }

    //菜单配置
    .side-nav .sub{
        li{
            /*padding-left:20px;*/
        }
    }
    .side-nav li{
        //设置菜单默认关闭
        &>ul.sub{
            display: none;
        }
        //li存在expend那么打开
        &.hasChild.expand{
            &>ul.sub{
                display: block;
            }
        }
    }
    //一级菜单
    .side-nav .sub.level-1{
        &>li{
            padding-left:0;
            position: relative;
        }
    }

    .side-nav ul.level-1 > li{
        width:159px;
        height:60px;
        line-height: 60px;
        color:#fff;
        border-bottom-left-radius: 8px;
        border-top-left-radius: 8px;
        padding:0 0 0 20px;
        font-size: 16px;
        margin-bottom:4px;
        &>a{
            &>.sideNav-arrow{
                display: none;
            }
        }
    }
    .side-nav ul.level-1 > li.expand,
    .side-nav ul.level-1 > li.active{
        box-shadow: -2px 2px 2px #565656;
        background: #fff;
        &>a{
            color:#ff892f;
            &>.sideNav-arrow{
                display: none;
            }
        }
    }
    .side-nav ul.level-2{
        position: absolute;
        top:0;
        width:200px;
        right:-181px;
        background: #fff;
        overflow: hidden;
        border-bottom-right-radius: 8px;
        border-top-right-radius: 8px;
        box-shadow: 4px 2px 4px #ccc;
        z-index: 9999;
        li{
            border-bottom:1px solid #f5f5f5;
            padding-left:20px;
        }
        a{
            font-size: 14px;
        }

    }

    .side-nav ul.level-2 li > a{
        height:40px;
        line-height: 40px;
        color:#333;

    }
</style>