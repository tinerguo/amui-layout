<template>
    <div :class="wrapClasses" :style="wrapStyles">
        <slot></slot>
    </div>
</template>


<script>
    export default {
        name: 'amHeader',
        props:{
            height:{
                type:Number,
                default:64
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
                this.$amui.$emit('am-header-height-change', value);
            }
        },
        computed: {
            wrapClasses () {
                return [
                    `am-header`
                ];
            },
            wrapStyles(){
                return {
                    'height':this.height+'px',
                    'line-height':this.height+'px',
                    'background-color':this.backgroundColor
                }
            }
        },
        methods:{
            //todo: sider layout渲染完成处理
            layoutInit:function(){
                this.$amui.$emit('am-header-height-change', this.height);
            },
            //todo:内部改变高度方法
            changeHeight:function(){
                this.$emit("update:height",300);
            },
            //todo:监听Sider宽度改变
            layoutSiderChange:function () {
//                console.log('header: 监听Sider宽度改变');
            }
        },
        created(){
            //todo:监听layout渲染完成事件
            this.$amui.$on('am-layout-mounted-end', this.layoutInit);
            //todo:监听sider宽度改变
            this.$amui.$on('am-sider-width-change', this.layoutSiderChange);
        },
        mounted(){
        }

    }
</script>

<style lang="scss">
    .am-header{
        padding:0;
        position: absolute;
        top:0;
        left:0;
        right:0;
        z-index: 9999;
        box-sizing: border-box;
    }
</style>