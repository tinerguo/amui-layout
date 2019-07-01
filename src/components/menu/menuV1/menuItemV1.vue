<template>


            <li :class="liWrapClass" ref="text" @click.prevent="onClickSelect" >
                <a href="javascript:;">
                    <img v-if="t_nemuData.icon" :src="t_nemuData.icon" alt="" style="height:24px;margin-left:8px;margin-right: 4px;vertical-align: middle">
                    {{t_nemuData.name}}
                    <i class="am-icon sideNav-arrow am-icon-ios-arrow-down" style="float: right;"></i>
                </a>
                <ul  v-if="t_nemuData.children && t_nemuData.children.length > 0" class="sub" :class="ulClass">
                    <menu-item ref="menuItem" v-for="(item, i) in t_nemuData.children"
                           :key="item.id"
                           :level="t_level"
                           :id-link="t_idLink"
                           :top-index="topIndex"
                           :store="store"
                           :menu-data="item"></menu-item>
                </ul>
            </li>
</template>


<script>
    import BScroll from 'better-scroll';
    export default {
        name:'menuItem',
        props: {
            //todo:数据
            menuData: {
                type: Object,
                default () {
                    return {};
                }
            },
            //todo:等级
            level: {
                type: Number,
                default () {
                    return 0;
                }
            },
            //todo:菜单id链
            idLink:{
                type:String,
                default () {
                    return "";
                }
            },
            //todo:头部header菜单index
            topIndex:{
                type:Number,
                default(){
                    return 0;
                }
            },
            //todo:浏览器是否存储
            store:{
                type: Boolean,
                default () {
                    return true;
                }
            },
            //todo:浏览器存储对象
            storActiveObj:{
                type: Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                //todo:数据拷贝
                t_nemuData:Object.assign({"expand":false}, this.menuData),
                //todo:数据拷贝
                t_level:Number(this.level)+1,
                //todo:数据拷贝
                t_idLink:this.idLink+","+this.menuData.id,
                active:false,
                mouseover:false,
                timer:null
            };
        },
        computed: {
            //todo:菜单样式包装器
            liWrapClass:function(){
                return {
                    hasChild:this.t_nemuData.children && this.t_nemuData.children.length>0,
                    expand: this.t_nemuData.children && this.t_nemuData.expand,
                    active:this.mouseover == true ?true:this.active
                }
            },
            //todo:ul包装器
            ulClass:function(){
                return [
                        "level-"+this.t_level
                ]
            }
        },
        watch:{
            menuData(newVal,oldVal){
                this.t_nemuData = Object.assign({"expand":false}, newVal)
            }
        },
        methods:{
            //todo:菜单点击事件
            onSelectDefault:function(){
                console.log("菜单点击事件");
                var obj = {
                    ids:this.t_idLink,
                    level:this.t_level,
                    topIndex:this.topIndex,
                    name:this.t_nemuData.name
                };
                //预留 todo: 这里判断是否存储obj值
                if(this.store){}
                if(!this.t_nemuData.children){
                    //todo:发送菜单点击事件
                    this.$amui.$emit('openContentPage',Object.assign({"url":this.t_nemuData.url},obj));
                    //todo:存储active id 链,用户菜单切换默认选中
                    console.log("存储active id 链,用户菜单切换默认选中");
                    console.log(obj);
                    this.$amui.setStore("topIndex",obj);
                }else{
                    //todo:发送菜单点击事件
                    this.$amui.$emit('menuItemClick',obj);
                    this.$nextTick(function(){
                            if(this.$refs["menuItem"] && this.$refs["menuItem"].length > 0){
                                    this.$refs["menuItem"][0].onSelectDefault()
                            }
                    });
                }
            },
            //todo:菜单点击事件
            onClickSelect:function(){
                console.log("菜单点击事件");
                var obj = {
                    ids:this.t_idLink,
                    level:this.t_level,
                    topIndex:this.topIndex,
                    name:this.t_nemuData.name
                };

                //预留 todo: 这里判断是否存储obj值
                if(this.store){}
                if(!this.t_nemuData.children){
                    //todo:发送菜单点击事件
                    this.$amui.$emit('openContentPage',Object.assign({"url":this.t_nemuData.url},obj));
                    //todo:存储active id 链,用户菜单切换默认选中
                    console.log("存储active id 链,用户菜单切换默认选中");
                    console.log(obj);
                    this.$amui.setStore("topIndex",obj);
                }else{
                    //todo:发送菜单点击事件
                    this.$amui.$emit('menuItemClick',obj);
                }
            },
            //todo:菜单鼠标悬浮事件
            onMouEnter:function(){
                var obj = {
                    ids:this.t_idLink,
                    level:this.t_level,
                    topIndex:this.topIndex
                };
                this.t_nemuData.expand = true;
                this.mouseover = true;

            },
            //todo:菜单鼠标离开事件
            onMouLeave:function(){
                var obj = {
                    ids:this.t_idLink,
                    level:this.t_level,
                    topIndex:this.topIndex
                };
                this.t_nemuData.expand = false;
                this.mouseover = false;

            },
            //todo:监听菜单点击事件
            onMenuItemClick:function(value){
                //todo:当前对象为自己
                if(value.ids == this.t_idLink){
                    if(this.level == 1){
                        return;
                    }
                    this.t_nemuData.expand = !this.t_nemuData.expand;
                    return;
                }
                //todo:当前对象为一级菜单
                if(value.level == 1){

                    if(value.ids.indexOf(","+this.t_nemuData.id)>=0){
                        this.t_nemuData.expand = true;
                    }else{
                        this.t_nemuData.expand = false;
                    }
                    return;
                }
                //todo:打开该菜单的父级菜单
                if(this.t_level < value.level && value.ids.indexOf(","+this.t_nemuData.id)>=0){
                    this.t_nemuData.expand = true;
                    return;
                }
                this.t_nemuData.expand = false;
            },
            //todo:打开页面事件
            openContentPage:function(value){
                //todo:当前对象为自己
                if(value.ids == this.t_idLink){
                    this.active = true;
                    return;
                }
                //todo:当前对象为一级菜单
                if(value.level == 1){
                    if(value.ids.indexOf(","+this.t_nemuData.id)>=0){
                        this.active = true;
                    }else{
                        this.active = false;
                    }
                    if(value.ids.indexOf(this.t_nemuData.id)>=0){
                        this.active = true;
                    }else{
                        this.active = false;
                    }
                    return;
                }
                //todo:打开该菜单的父级菜单
                if(this.t_level < value.level && value.ids.indexOf(","+this.t_nemuData.id)>=0){
                    this.active = true;
                    return;
                }

                this.active = false;
            }
        },
        mounted () {
            var _this = this;
            //todo:监听菜单点击事件
            this.$amui.$on("menuItemClick",this.onMenuItemClick);
            //todo:默认菜单展开
            var menuIds = this.$amui.getStore("menuIds");
            if(menuIds){
                this.onMenuItemClick(this.$amui.getStore("menuIds"));
            }

            //todo:监听页面打开事件
            this.$amui.$on("openContentPage",this.openContentPage);

            var text = this.$refs.text;

            if(this.level == 1){
                text.addEventListener('mouseenter',function(){
                    _this.onMouEnter();
                });
                text.addEventListener('mousemove',function(){
                    window.clearTimeout(_this.timer);
                });
                text.addEventListener('mouseleave',function(){
                    _this.timer = setTimeout(function(){
                        _this.onMouLeave();
                    },200)
                });
                if(this.storActiveObj && this.storActiveObj.ids && this.storActiveObj.ids.indexOf(this.t_nemuData.id)>=0){
                    this.active = true;
                }
            }
        }
    }
</script>

<style  lang="scss" rel="stylesheet/scss">

</style>