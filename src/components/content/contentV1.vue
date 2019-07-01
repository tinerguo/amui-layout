<template>
    <div :class="wrapClasses" :style="wrapStyles">

        <div id="page-content-wrapper" class="page-content-wrapper">
            <slot>
                <iframe id="pageIframeContent" frameborder="none" style="position: absolute;top:0;right:0;left:0;bottom:0;" name="pageIframeContent" allowtransparency="true"
                        :src="t_url"
                        height="100%" width="100%"></iframe>
            </slot>
        </div>



    </div>
</template>


<script>
    export default {
        name: 'amContent',
        props: {
            url: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                top:64,
                bottom:0,
                left:200,
                t_url:this.url
            };
        },
        computed: {
            wrapClasses () {
                return [
                    `am-content`
                ];
            },
            wrapStyles(){
                return {
                    left:this.left+'px',
                    top:this.top+'px',
                    bottom:this.bottom+'px',
                    "border-bottom-right-radius":"6px",
                    "border-top-right-radius":"6px",
                }
            }
        },
        methods:{
            //todo: sider layout渲染完成处理
            layoutInit:function(arr){

                //布局中amFooter不存在
                if(arr.indexOf("amFooter") === -1){
                    this.bottom = 0;
                }
                //布局中amHeader不存在
                if(arr.indexOf("amHeader") === -1){
                    this.top = 0;
                }
                //布局中amSider不存在
                if(arr.indexOf("amSider") === -1){
                    this.left = 0;
                }
            },
            //todo:监听Sider宽度改变
            layoutSiderChange:function (value) {
//                console.log('content: 监听Sider宽度改变');
                this.left = value;
            },
            //todo:监听header高度改变
            layoutHeaderChange:function(value){
//                console.log('content: 监听header高度改变');
                this.top = value;
            },
            //todo:监听footer高度改变
            layoutFooterChange:function(value){
//                console.log('content: 监听footer高度改变');
                this.bottom = value;
            }
        },
        created(){
            //todo:监听layout渲染完成事件
            this.$amui.$on('am-layout-mounted-end', this.layoutInit);
            //todo:监听sider宽度改变
            this.$amui.$on('am-sider-width-change', this.layoutSiderChange);
            //todo:监听header高度
            this.$amui.$on('am-header-height-change', this.layoutHeaderChange);
            //todo:监听footer高度
            this.$amui.$on('am-footer-height-change', this.layoutFooterChange);
        },
        mounted(){
            var _this = this;
            //加载url事件
            this.$amui.$on('openContentPage', function (obj) {
                _this.t_url = obj.url;
            });
        }

    }
</script>

<style lang="scss">
    .am-content{
        position: absolute;
        box-sizing: border-box;
        right:0;
        overflow: hidden;
        border-bottom-right-radius: 2px;border-top-right-radius: 2px;

    }
</style>