<template>
    <div :class="wrapClasses" :style="wrapStyles" ref="amSider">
        <div :class="childClasses">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import { on, off } from '../../utils/dom';
    import BScroll from 'better-scroll';
    import { oneOf, dimensionMap, setMatchMedia } from '../../utils/assist';
    const prefixCls = 'am-sider';
    export default {
        name: 'amSider',
        data () {
            return {
            };
        },
        props: {
            //props  todo:宽度
            width:{
                type:[Number, String],
                default:200
            },
            //props  todo:缩小后的宽度
            collapsedWidth: {
                type: [Number, String],
                default: 64
            },
            //props  todo:侧边栏是否收起
            value: {
                type: Boolean,
                default: false
            },
            //props  todo:隐藏默认触发器 按钮
            hideTrigger: {
                type: Boolean,
                default: false
            },
            //props  todo:触发响应式布局的断点
            breakpoint: {
                type: String,
                default:'xl',
                validator (val) {
                    return  ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(val) !== -1;
                }
            },
            //props  todo:是否可收起
            collapsible: {
                type: [Boolean,String],
                default: false
            },
            //props  todo:是否默认收起
            defaultCollapsed: {
                type: Boolean,
                default: false
            },
            //props  todo:改变侧边栏触发器箭头方向，和改变侧边栏收起方向，当Sider在右边时可以使用。
            reverseArrow: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                top:64,
                bottom:0,
                prefixCls: prefixCls,//前缀
                mediaMatched: false//多媒体匹配
            };
        },
        computed: {
            wrapClasses(){
                return [
                    `${prefixCls}`,
                    //设置打开或者关闭class
                    this.value ? `${prefixCls}-collapsed` : ''
                ]
            },
            wrapStyles(){
                return {
                    bottom:this.bottom+'px',
                    top:this.top+'px',
                    width: `${this.siderWidth}px`,
                    minWidth: `${this.siderWidth}px`,
                    maxWidth: `${this.siderWidth}px`,
                }
            },
            //子元素class
            childClasses () {
                return `${prefixCls}-children`;
            },
            //是否显示底部切换按钮
            showBottomTrigger () {
                //return this.collapsible ? !this.mediaMatched && !this.hideTrigger : false;
            },
            //computed  todo:设置sider的宽度
            siderWidth () {
//                console.log("设置sider的宽度");
                //相当于监听了,collapsible、value、collapsedWidth、width的值,只要这几个值有变化就执行该方法

                let width = this.collapsible ?
                        (//允许关闭

                                this.value ?
                                (//关闭状态

                                        parseInt(this.collapsedWidth)
                                )
                                : (this.mediaMatched ? parseInt(this.collapsedWidth) : parseInt(this.width))
                        )
                        : this.width;
                //computed  siderWidth  todo:todo:宽度变化后,发起通知
                this.$amui.$emit(`${prefixCls}-width-change`, width);
                return width;
            },
        },
        methods:{
            //methods  todo: sider layout渲染完成处理
            layoutInit:function(arr){
                this.$amui.$emit(`${prefixCls}-width-change`, this.width);

                //布局中amFooter不存在
                if(arr.indexOf("amFooter") === -1){
                    this.bottom = 0;
                }
                //布局中amHeader不存在
                if(arr.indexOf("amHeader") === -1){
                    this.top = 0;
                }
            },
            //methods  todo:内部改变宽度方法
            changeWidth:function(){
                this.$emit("update:width",300);
            },
            //methods  todo:监听header高度改变
            layoutHeaderChange:function(value){
//                console.log('sider: 监听header高度改变');
                this.top = value;
            },
            //methods  todo:监听footer高度改变
            layoutFooterChange:function(value){
//                console.log('sider: 监听footer高度改变');
                this.bottom = value;
            },
            //methods  todo:监听浏览器改变事件
            onWindowResize () {
                this.matchMedia();
            },
            //methods  todo:根据浏览器变化监听是否关闭或者打开左侧sider窗口
            matchMedia () {
                //首先是支持响应式
                if(!this.collapsible){
                    return ;
                }
                let matchMedia;
                //window.matchMedia根据条件查询
                if (window.matchMedia) {
                    matchMedia = window.matchMedia;
                }
                let mediaMatched = this.mediaMatched;

                if(false){
                    //这里需要判断IE9兼任,因为window.matchMedia只支持IE10+
                }
                this.mediaMatched = matchMedia(`(max-width: ${dimensionMap[this.breakpoint]})`).matches;

                if (this.mediaMatched !== mediaMatched) {
//                    console.log("this.mediaMatched = "+this.mediaMatched);
                    //methods  todo: v-model 修改value的值
                    this.$emit('input', this.mediaMatched);
                }
            }
        },
        created(){
            //created   todo:监听layout渲染完成事件
            this.$amui.$on('am-layout-mounted-end', this.layoutInit);

            //created   todo:监听header高度
            this.$amui.$on('am-header-height-change', this.layoutHeaderChange);

            //created   todo:监听footer高度
            this.$amui.$on('am-footer-height-change', this.layoutFooterChange);

        },
        mounted(){
            if (this.defaultCollapsed) {
                this.$emit('input', this.defaultCollapsed);
            }

            //mounted   todo:如果用户传递的breakpoint 不为undefined的话,监听浏览器resize事件
            if (this.breakpoint !== undefined) {
                on(window, 'resize', this.onWindowResize);
                //mounted   todo:是否默认收起,那么页面加载不检测
                if(!this.defaultCollapsed){
                    this.matchMedia();
                }
            }

            this.$nextTick(() => {
                this.leftscroll = new BScroll(this.$refs.amSider, {
                    scrollbar: {
                        fade: false,
                        interactive: false // 1.8.0 新增
                    },
                    mouseWheel: {
                        speed: 20,
                        invert: false,
                        easeTime: 300
                    }
                });
            });
        },
        beforeDestroy () {
            if (this.breakpoint !== undefined) {
                off(window, 'resize', this.onWindowResize);
            }
        }
    }
</script>

<style   lang="scss" rel="stylesheet/scss">
    .am-sider{
        position: absolute;
        left:0;
        box-sizing: border-box;
        z-index: 9999;
    }
</style>