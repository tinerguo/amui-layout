<template>
    <div :class="wrapClasses"
         :style="wrapStyles">


        <span v-show="showZeroTrigger" @click="toggleCollapse" :class="zeroWidthTriggerClasses">
            <i class="ivu-icon ivu-icon-navicon-round"></i>
        </span>


        <div :class="childClasses">
            <slot></slot>
        </div>

        <slot name="trigger">
            <div v-show="showBottomTrigger" :class="triggerClasses" @click="toggleCollapse" :style="{width: siderWidth + 'px'}">
                <i :class="triggerIconClasses"></i>
            </div>
        </slot>

    </div>
</template>

<!-- 模块思考

    宽度:
    宽度为0的情况:
    触发的断点:
    是否收起:

    收起后宽度:
    默认是否收起:
    触发器是否显示:

 -->
<script>
    import { on, off } from '../../utils/dom';
    import { oneOf, dimensionMap, setMatchMedia } from '../../utils/assist';
    const prefixCls = 'am-layout-sider';
    export default {
        name: 'amSider',
        data () {
            return {
            };
        },
        props: {
            layout:{
                type:Object,
                default:{
                }
            },
            //侧边栏是否收起
            value: {
                type: Boolean,
                default: false
            },
            width: {//宽度
                type: [Number, String],
                default: 200
            },
            //缩小后的宽度
            collapsedWidth: {
                type: [Number, String],
                default: 64
            },
            //隐藏默认触发器 按钮
            hideTrigger: {
                type: Boolean,
                default: false
            },
            //触发响应式布局的断点
            breakpoint: {
                type: String,
                validator (val) {
                    return  ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(val) !== -1;
                }
            },
            //是否可收起
            collapsible: {
                type: Boolean,
                default: false
            },
            //是否默认收起
            defaultCollapsed: {
                type: Boolean,
                default: false
            },
            //改变侧边栏触发器箭头方向，和改变侧边栏收起方向，当Sider在右边时可以使用。
            reverseArrow: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                prefixCls: prefixCls,//前缀
                mediaMatched: false//多媒体匹配
            };
        },
        computed: {
            wrapClasses () {
                return [
                    `${prefixCls}`,//设置前缀
                    this.siderWidth ? '' : `${prefixCls}-zero-width`,//如果没有siderWidth那么添加zero-width class
                    this.value ? `${prefixCls}-collapsed` : ''//设置打开或者关闭class
                ];
            },
            wrapStyles () {
                return {
                    width: `${this.siderWidth}px`,
                    minWidth: `${this.siderWidth}px`,
                    maxWidth: `${this.siderWidth}px`,
                    flex: `0 0 ${this.siderWidth}px`,
                    height:`${document.body.clientHeight - this.layout.header.height}px`
                };
            },



            triggerClasses () {
                return [
                    `${prefixCls}-trigger`,
                    this.value ? `${prefixCls}-trigger-collapsed` : '',
                ];
            },
            childClasses () {
                return `${this.prefixCls}-children`;
            },
            zeroWidthTriggerClasses () {
                return [
                    `${prefixCls}-zero-width-trigger`,
                    this.reverseArrow ? `${prefixCls}-zero-width-trigger-left` : ''
                ];
            },
            triggerIconClasses () {
                return [
                    'ivu-icon',
                    `ivu-icon-chevron-${this.reverseArrow ? 'right' : 'left'}`,
                    `${prefixCls}-trigger-icon`,
                ];
            },
            siderWidth () {
                return  this.collapsible ?
                        (this.value ? (this.mediaMatched ? 0 : parseInt(this.collapsedWidth)) : parseInt(this.width))
                        : this.width;
            },
            showZeroTrigger () {
                return this.collapsible ? (this.mediaMatched && !this.hideTrigger || (parseInt(this.collapsedWidth) === 0) && this.value && !this.hideTrigger) : false;
            },
            showBottomTrigger () {
                return this.collapsible ? !this.mediaMatched && !this.hideTrigger : false;
            }
        },
        methods:{
            toggleCollapse () {
                let value = this.collapsible ? !this.value : false;
                this.$emit('input', value);
            },
            matchMedia () {
                let matchMedia;
                if (window.matchMedia) {
                    matchMedia = window.matchMedia;
                }
                let mediaMatched = this.mediaMatched;
                this.mediaMatched = matchMedia(`(max-width: ${dimensionMap[this.breakpoint]})`).matches;

                if (this.mediaMatched !== mediaMatched) {
                    this.$emit('input', this.mediaMatched);
                }
            },
            onWindowResize () {
                this.matchMedia();
            }
        },
        watch: {
            value (stat) {
                this.$emit('on-collapse', stat);
            }
        },
        mounted () {
            if (this.defaultCollapsed) {
                this.$emit('input', this.defaultCollapsed);
            }
            if (this.breakpoint !== undefined) {
                on(window, 'resize', this.onWindowResize);
                this.matchMedia();
            }
//            console.log(this.layout.header.height);
        },
        beforeDestroy () {
            if (this.breakpoint !== undefined) {
                off(window, 'resize', this.onWindowResize);
            }
        }
    }
</script>

<style  scoped lang="scss" rel="stylesheet/scss">
    .am-layout-sider{
        border:1px solid blue;
        transition: all .2s ease-in-out;
        position: relative;
        background: #495060;
        min-width: 0;
        &-children {
             height: 100%;
             padding-top: 0.1px;
             margin-top: -0.1px;
        }

        &-has-trigger {
             padding-bottom: 48px;
        }
        &-trigger {
            position: fixed;
            bottom: 0;
            text-align: center;
            cursor: pointer;
            height: 48px;
            line-height: 48px;
            color: #fff;
            background: #495060;
            z-index: 1000;
            transition: all .2s ease-in-out;
            .ivu-icon {
                font-size: 16px;
            }
            >* {
                transition: all .2s;
            }
            &-collapsed {
                .am-layout-sider-trigger-icon {
                     transform: rotateZ(180deg);
                }
            }
        }

        &-zero-width {
            & > * {
                overflow: hidden;
            }

            &-trigger {
                position: absolute;
                top: 64px;
                right: 36px;
                text-align: center;
                width: 36px;
                height: 42px;
                line-height: 42px;
                background: #495060;
                color: #fff;
                font-size: 13px;
                border-radius: 0 6px 6px 0;
                cursor: pointer;
                transition: background .3s ease;

                &:hover {
                    /*background: tint(#495060, 10%);*/
                }

                &-left {
                    right: 0;
                    left: -36px;
                    border-radius: 6px 0 0 6px;
                }
            }
        }
    }



</style>