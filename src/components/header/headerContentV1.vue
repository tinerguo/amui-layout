<template>
    <div :class="wrapClasses" :style="wrapStyles">
        <img class="logo" :src="logo"  alt="">
        <span class="logo-title-text">
            {{title}}
        </span>
        <div class="top-menu">
            <ul>
                <li @click="onSelectMemu(i,item)" :class="liwrapper(i,item)" v-for="(item, i) in menuData"
                     :key="i">
                    <i class="ivu-icon ivu-icon-ios-card-outline"></i>
                    {{item.name}}
                </li>
            </ul>
        </div>
        <div class="header-menu">
            <slot name="header-menu"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'amHeaderContent',
        props:{
            backgroundImg:{
                type:String,
                default:''
            },
            logo:{
                type:String,
                default:''
            },
            title:{
                type:String,
                default:''
            }
        },
        data () {
            return {
                menuData:[],
                index:0
            };
        },
        watch:{

        },
        computed: {
            wrapClasses () {
                return [
                    `am-header-content`
                ];
            },
            wrapStyles(){
                if(this.backgroundImg){
                    return {
                        'background':`url({{this.backgroundImg}}) 0 0 no-repeat`,
                        'background-size':'100% 100%'
                    }
                }

            }
        },
        methods:{
            //todo:监听sider数据
            amMenuDataInit:function(data){
                this.menuData = data;
                this.$amui.$emit('am-head-menuSelect',0);
            },
            //todo:菜单选中事件
            onSelectMemu:function(i,item){
                this.$amui.$emit('am-head-menuSelect',i);
                this.index = i;
            },
            //todo:菜单是否选中
            liwrapper:function(i,item){
                    if(this.index == i){
                        return {
                            "active":true
                        }
                    }
            }
        },
        created(){
            //todo:监听sider数据
            this.$amui.$on('am-menu-dataInit',this.amMenuDataInit);
            var menuIds = this.$amui.getStore("menuIds");
            if(menuIds){
                this.index = menuIds.topIndex;
            }

        },
        mounted(){
        }

    }
</script>

<style    lang="scss" rel="stylesheet/scss" >
    .am-header-content{
        position: relative;
        height:100%;
        padding:0 20px;
        .logo{
            height: 42px;
            vertical-align: middle;
            margin-right:8px;
        }
        .logo-title-text{
            font-size: 20px;
            vertical-align: middle;
            color: #fff;
        }
    }
    .top-menu{
        float: right;
        display: inline-block;
        position: absolute;
        right: 190px;
        box-sizing: border-box;
        ul,li{
            list-style: none;
        }
        li{
            float: left;
            color:#fff;
            margin-right:20px;
            font-size: 14px;
            cursor: pointer;
            box-sizing: border-box;
            transition: all 0.8s;
            color:#fff;
            padding:0 10px;
        }
        li:hover{
            color:#fff;
        }
        li.active{
            color:#fff;
            background: rgba(255,255,255,0.3);
        }
    }
    .header-menu{
        position: absolute;
        top: 10px;
        right: 10px;
        background: red;
        line-height: 18px;
        border-radius: 12px;
        padding: 4px 12px;
        background: #033186;
        img{
            vertical-align: middle;
            margin-right:12px;
            cursor: pointer;
        }
        img:last-child
        {
            margin-right:0px;
        }
    }
</style>
