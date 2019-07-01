<template>
    <div :class="wrapClasses" :style="wrapStyles">
        <slot></slot>
    </div>
</template>


<script>
    export default {
        name: 'amFooter',
        props:{
            height:{
                type:Number,
                default:50
            },
            backgroundColor:{
                type:String,
                default:'rgba(0,0,0,0)'
            }
        },
        data () {
            return {
            };
        },
        watch:{
            //todo:监听父组件传递高度值,初始化不会执行,当改变的时候执行
            height:function(value){
                this.$amui.$emit('am-footer-height-change', value);
            }
        },
        computed: {
            wrapClasses(){
                return [
                    'am-footer'
                ]
            },
            wrapStyles(){
                return {
                    height:this.height+"px",
                    "line-height":this.height+"px",
                    'background-color':this.backgroundColor
                }
            }
        },
        methods:{
            //todo: sider layout渲染完成处理
            layoutInit:function(){
                this.$amui.$emit('am-footer-height-change', this.height);
            },
            //todo:内部改变高度方法
            changeHeight:function(){
                this.$emit("update:height",300);
            }
        },
        created(){
            //todo:监听layout渲染完成事件
            this.$amui.$on('am-layout-mounted-end', this.layoutInit);
        },
        mounted(){
        }
    }
</script>

<style lang="scss">
    .am-footer{
        position: absolute;
        bottom:0;
        left:0;
        right:0;
        box-sizing: border-box;
        z-index: 9999;
        box-sizing: border-box;
    }
</style>