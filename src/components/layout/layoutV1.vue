<script>
//    import {postMessage,receiveMessage} from '../../utils/postmessage.js'
    import Emitter from '../../mixins/emitter'

    const prefixCls = 'am-layout';
    export default {
        name: prefixCls,
        mixins: [Emitter],
        data(){
            return {
                normal:true,
                LayoutFooter:true,
                name:String,
                hasSider: false,
                hasFooter: false,
                hasHeader: false,
                amContent:false
            }
        },
        props: {
            //todo:主题
            theme: {
                type:String,
                default:'default'
            }
        },

        methods:{
            onContentBeyond:function(height){
                if(height  > (document.documentElement.clientHeight - 100)){
                    this.normal = false;
                }else{
                    this.normal = true;
                }
            },
            /**
             * var obj = {
                    ids:"0.24858316962199756",//菜单编号
                    level:1,//菜单级别
                    topIndex:0,//顶部菜单数组下标
                    name:""
                };
             **/
            oniframeSelectMenuItem:function(obj){
                //todo:发送菜单点击事件
                this.$amui.$emit('openContentPage',obj);
                this.$amui.setStore("topIndex",obj);
            }
        },
        computed: {
            wrapClasses () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-has-sider`]: this.hasSider
                    },
                    {
                        [`${prefixCls}-has-footer`]: this.hasFooter
                    },
                    {
                        [`${prefixCls}-has-header`]: this.hasHeader
                    },
                    {
                        ['theme-'+this.theme]: true,
                        ['normal']:this.normal
                    }
                ];
            }
        },
        created(){
            var _this = this;
            //todo:监听事件 - 内容绑定,设置内容高度
            this.$amui.$on('contentBeyond',function(obj){
                _this.onContentBeyond(obj.contentHeight);
            });
        },
        mounted () {
            //todo:因为layout的mounted是最后执行的,所有在这里可以通知子元素开始共享资源
            var _this = this;
            //todo:判断子元素是否有footer
            this.hasFooter = this.hasChild("amFooter").hashChild;
            //todo:判断子元素是否有Sider
            this.hasSider = this.hasChild("amSider").hashChild;
            //todo:判断子元素是否有Header
            this.hasHeader = this.hasChild("amHeader").hashChild;
            //todo:判断子元素是否有Content
            this.amContent = this.hasChild("amContent").hashChild;

            var arr = [];
            if(this.hasFooter)arr.push('amFooter');
            if(this.hasSider)arr.push('amSider');
            if(this.hasHeader)arr.push('amHeader');
            if(this.amContent)arr.push('amContent');

            //todo:发送laout渲染完成事件
            this.$amui.$emit(prefixCls+'-mounted-end', arr);
            //todo:监听iframe设置的菜单
            this.$amui.$on("iframeSelectMenuItem",this.oniframeSelectMenuItem);

            //todo:接收到客户端消息,并全局发送
            /*receiveMessage(function (e) {
                //收到消息
                try {
                    var client_data = JSON.parse(e.data);
                    _this.$amui.$emit('iframeSendMsg', client_data);
                } catch (e) {
                }
            });*/
        },
        render (h) {
            const data = {
                'class': this.wrapClasses,
                attrs: {'data-app': true}
            }
            return h('div', data, this.$slots.default);
        }
    }
</script>

<style   lang="scss" rel="stylesheet/scss">
    .am-layout{
        height:100%;
    }
</style>