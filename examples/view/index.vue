<template>
    <div>
        <div class="layout-editor">
            <am-layoutv1 :theme="theme">

            <am-headerv1 :height.sync="header.headerHeight" :background-color="header.backgroundColor">
                
              <div :name="msg" ref="markedContent22"></div>
            </am-headerv1>

            <!--
                sider属性:
                width:sider默认宽度
                collapsible:是否可以收起
                collapsed-width:收起后的宽度
                breakpoint:监测断点
             -->
            <am-siderv1 :width.sync="sider.siderWidth"
                        :collapsible="sider.collapsible"
                        :default-collapsed="sider.defaultCollapsed"
                        v-model="isCollapsible"></am-siderv1>


            <!--<am-siderv1 v-model="isCollapsible" :collapsible="true" :default-collapsed="true">-->

            </am-siderv1>

            <am-footerv1 :height.sync="footer.footerHeight" :background-color="footer.backgroundColor" ></am-footerv1>

            <am-contentv1 ></am-contentv1>

        </am-layoutv1>
        </div>
        <header class="layout-editor-header">
            <div style="padding:0 60px;">
                <h1>layout布局编辑器
                </h1>
            </div>
        </header>
        <aside class="layout-editor-left-panel"  ref="layoutEditorLeftWrap">
            <ul>
                <li>
                    <!-- todo:layout panel -->
                    <Card style="width:100%;margin-bottom:12px;margin-top:8px;">
                        <p slot="title">
                          <Icon type="ios-cube-outline" />
                          <Icon type="md-download" />
                            <Icon type="ios-film-outline"></Icon>
                            amLayout
                        </p>
                        <div class="panel-line-model">
                            <Dropdown>
                                <Button type="default">
                                    主题
                                    <Icon type="ios-arrow-down"></Icon>
                                </Button>
                                <DropdownMenu slot="list">
                                    <DropdownItem>浅蓝</DropdownItem>
                                    <DropdownItem>蓝色</DropdownItem>
                                    <DropdownItem divided>黑色</DropdownItem>
                                    <DropdownItem>深黑</DropdownItem>
                                    <DropdownItem divided>白色</DropdownItem>
                                    <DropdownItem>灰色</DropdownItem>
                                    <DropdownItem divided>橘红</DropdownItem>
                                    <DropdownItem>橘红</DropdownItem>

                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </Card>
                </li>
                <li>
                    <!-- todo:header panel -->
                    <Card style="width:100%;margin-bottom:12px;">
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            amHeader
                        </p>
                        <div class="panel-content">
                            <div class="panel-line-model">
                                高度:<span class="l-w6"></span><InputNumber :min="0" :step="10" v-model="header.headerHeight" ></InputNumber><span class="l-w6"></span>{{header.headerHeight}}
                            </div>
                            <div class="panel-line-model">
                                颜色:<span class="l-w6"></span><ColorPicker v-model="header.backgroundColor" alpha /><span class="l-w6"></span>{{header.backgroundColor}}
                            </div>
                        </div>
                    </Card>
                </li>
                <li>
                    <!-- todo:footer panel -->
                    <Card style="width:100%;margin-bottom:12px;">
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            amFooter
                        </p>
                        <div class="panel-content">
                            <div class="panel-line-model">
                                高度:<span class="l-w6"></span><InputNumber :min="0" :step="10" v-model="footer.footerHeight" ></InputNumber><span class="l-w6"></span>{{footer.headerHeight}}
                            </div>
                            <div class="panel-line-model">
                                颜色:<span class="l-w6"></span><ColorPicker v-model="footer.backgroundColor" alpha /><span class="l-w6"></span>{{footer.backgroundColor}}
                            </div>
                        </div>
                    </Card>
                </li>
                <li>
                    <!-- todo:sider panel -->
                    <Card style="width:100%;margin-bottom:12px;">
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            amSider
                        </p>
                        <div class="panel-content">
                            <div class="panel-line-model" style="margin-bottom:20px;">
                                模式:<span class="l-w6"></span>
                                <RadioGroup v-model="sider.siderModel">
                                    <Radio label="position">
                                        <Icon type="logo-android"></Icon>
                                        <span>占位</span>
                                    </Radio>
                                    <Radio label="fixed">
                                        <Icon type="logo-apple"></Icon>
                                        <span>悬浮</span>
                                    </Radio>
                                </RadioGroup>
                            </div>
                            <div class="panel-line-model">
                                宽度:<span class="l-w6"></span><InputNumber :min="0" :step="10" v-model="sider.siderWidth" ></InputNumber>
                                <span class="l-w6"></span>{{sider.siderWidth}}
                            </div>
                            <div class="panel-line-model">
                                打开响应式布局:<span class="l-w6"></span>
                                <RadioGroup v-model="collapsibleLable">
                                    <Radio  label="true">
                                        <Icon type="logo-android"></Icon>
                                        <span>打开</span>
                                    </Radio>
                                    <Radio label="false">
                                        <Icon type="logo-apple"></Icon>
                                        <span>关闭</span>
                                    </Radio>
                                </RadioGroup>
                            </div>
                            <div class="panel-line-model">
                                响应式节点:<span class="l-w6"></span>
                                <RadioGroup v-model="sider.breakpoint">
                                    <Radio  label="xs">
                                        <Icon type="logo-android"></Icon>
                                        <span>xs(480)</span>
                                    </Radio>
                                    <Radio  label="sm">
                                        <Icon type="logo-android"></Icon>
                                        <span>sm(768)</span>
                                    </Radio>
                                    <Radio  label="md">
                                        <Icon type="logo-android"></Icon>
                                        <span>md(992)</span>
                                    </Radio>
                                    <Radio  label="lg">
                                        <Icon type="logo-android"></Icon>
                                        <span>lg(1200)</span>
                                    </Radio>
                                    <Radio  label="xl">
                                        <Icon type="logo-android"></Icon>
                                        <span>xl(1600)</span>
                                    </Radio>
                                </RadioGroup>
                            </div>
                            <div class="panel-line-model">
                                默认是否关闭:<span class="l-w6"></span>
                                <RadioGroup v-model="defaultCollapsedLable">
                                    <Radio  label="false">
                                        <Icon type="logo-android"></Icon>
                                        <span>否</span>
                                    </Radio>
                                    <Radio  label="true">
                                        <Icon type="logo-android"></Icon>
                                        <span>是</span>
                                    </Radio>
                                </RadioGroup>
                            </div>
                        </div>
                    </Card>
                </li>
                <li>
                    <!-- todo:sider panel -->
                    <Card style="width:100%;margin-bottom:12px;">
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            amSider
                        </p>
                        <div class="panel-content">
                            <div class="panel-line-model" style="margin-bottom:20px;">
                                模式:<span class="l-w6"></span>
                                <RadioGroup v-model="sider.siderModel">
                                    <Radio label="position">
                                        <Icon type="logo-android"></Icon>
                                        <span>占位</span>
                                    </Radio>
                                    <Radio label="fixed">
                                        <Icon type="logo-apple"></Icon>
                                        <span>悬浮</span>
                                    </Radio>
                                </RadioGroup>
                            </div>
                            <div class="panel-line-model">
                                宽度:<span class="l-w6"></span><InputNumber :min="0" :step="10" v-model="sider.siderWidth" ></InputNumber>
                                <span class="l-w6"></span>{{sider.siderWidth}}
                            </div>
                            <div class="panel-line-model">
                                打开响应式布局:<span class="l-w6"></span>
                                <RadioGroup v-model="collapsibleLable">
                                    <Radio  label="true">
                                        <Icon type="logo-android"></Icon>
                                        <span>打开</span>
                                    </Radio>
                                    <Radio label="false">
                                        <Icon type="logo-apple"></Icon>
                                        <span>关闭</span>
                                    </Radio>
                                </RadioGroup>
                            </div>
                            <div class="panel-line-model">
                                响应式节点:<span class="l-w6"></span>
                                <RadioGroup v-model="sider.breakpoint">
                                    <Radio  label="xs">
                                        <Icon type="logo-android"></Icon>
                                        <span>xs(480)</span>
                                    </Radio>
                                    <Radio  label="sm">
                                        <Icon type="logo-android"></Icon>
                                        <span>sm(768)</span>
                                    </Radio>
                                    <Radio  label="md">
                                        <Icon type="logo-android"></Icon>
                                        <span>md(992)</span>
                                    </Radio>
                                    <Radio  label="lg">
                                        <Icon type="logo-android"></Icon>
                                        <span>lg(1200)</span>
                                    </Radio>
                                    <Radio  label="xl">
                                        <Icon type="logo-android"></Icon>
                                        <span>xl(1600)</span>
                                    </Radio>
                                </RadioGroup>
                            </div>
                            <div class="panel-line-model">
                                默认是否关闭:<span class="l-w6"></span>
                                <RadioGroup v-model="defaultCollapsedLable">
                                    <Radio  label="false">
                                        <Icon type="logo-android"></Icon>
                                        <span>否</span>
                                    </Radio>
                                    <Radio  label="true">
                                        <Icon type="logo-android"></Icon>
                                        <span>是</span>
                                    </Radio>
                                </RadioGroup>
                            </div>
                        </div>
                    </Card>
                </li>
                <li>
                    <!-- todo:sider panel -->
                    <Card style="width:100%;margin-bottom:12px;">
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            amSider
                        </p>
                        <div class="panel-content">
                            <div class="panel-line-model" style="margin-bottom:20px;">
                                模式:<span class="l-w6"></span>
                                <RadioGroup v-model="sider.siderModel">
                                    <Radio label="position">
                                        <Icon type="logo-android"></Icon>
                                        <span>占位</span>
                                    </Radio>
                                    <Radio label="fixed">
                                        <Icon type="logo-apple"></Icon>
                                        <span>悬浮</span>
                                    </Radio>
                                </RadioGroup>
                            </div>
                            <div class="panel-line-model">
                                宽度:<span class="l-w6"></span><InputNumber :min="0" :step="10" v-model="sider.siderWidth" ></InputNumber>
                                <span class="l-w6"></span>{{sider.siderWidth}}
                            </div>
                            <div class="panel-line-model">
                                打开响应式布局:<span class="l-w6"></span>
                                <RadioGroup v-model="collapsibleLable">
                                    <Radio  label="true">
                                        <Icon type="logo-android"></Icon>
                                        <span>打开</span>
                                    </Radio>
                                    <Radio label="false">
                                        <Icon type="logo-apple"></Icon>
                                        <span>关闭</span>
                                    </Radio>
                                </RadioGroup>
                            </div>
                            <div class="panel-line-model">
                                响应式节点:<span class="l-w6"></span>
                                <RadioGroup v-model="sider.breakpoint">
                                    <Radio  label="xs">
                                        <Icon type="logo-android"></Icon>
                                        <span>xs(480)</span>
                                    </Radio>
                                    <Radio  label="sm">
                                        <Icon type="logo-android"></Icon>
                                        <span>sm(768)</span>
                                    </Radio>
                                    <Radio  label="md">
                                        <Icon type="logo-android"></Icon>
                                        <span>md(992)</span>
                                    </Radio>
                                    <Radio  label="lg">
                                        <Icon type="logo-android"></Icon>
                                        <span>lg(1200)</span>
                                    </Radio>
                                    <Radio  label="xl">
                                        <Icon type="logo-android"></Icon>
                                        <span>xl(1600)</span>
                                    </Radio>
                                </RadioGroup>
                            </div>
                            <div class="panel-line-model">
                                默认是否关闭:<span class="l-w6"></span>
                                <RadioGroup v-model="defaultCollapsedLable">
                                    <Radio  label="false">
                                        <Icon type="logo-android"></Icon>
                                        <span>否</span>
                                    </Radio>
                                    <Radio  label="true">
                                        <Icon type="logo-android"></Icon>
                                        <span>是</span>
                                    </Radio>
                                </RadioGroup>
                            </div>
                        </div>
                    </Card>
                </li>
            </ul>
        </aside>
        <aside class="layout-editor-right-panel"  ref="layoutEditorRightWrap">
            <ul>
                <li>
                    <!-- todo:header components -->
                    <Card style="width:350px">
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            头部组件
                        </p>
                        <ul class="component-wrap">
                            <li @click="addHeader" v-for="(component,index) in headerComponents">
                                <img class="thumbimg" src="/static/images/head01.png" alt="">
                                <div class="title">
                                    头部组件
                                </div>
                                <div class="title-sub">
                                    版本:V1.0 说明:xxxxx
                                </div>
                                <div>
                                    <a href="">查看详情</a>
                                </div>
                            </li>

                        </ul>
                    </Card>
                </li>
            </ul>
        </aside>

        <Modal v-model="screenWidthWind" :footer-hide="true" class-name="vertical-center-modal screenwidth-wind" :closable="false"  width="188" >
            <div class="screenWidthWind-text">{{screenWidthWindValue}}</div>
        </Modal>


    </div>
</template>

<script>
    import { on, off } from '../../src/utils/dom';
    import BScroll from 'better-scroll';
    import Vue from 'vue';
    import AMLayout from '../../src/index';

    export default {
        name: 'index',
        data () {
            return {
                msg:'你给点力吧',
                header:{
                    headerHeight:64,
                    backgroundColor:'rgba(0,0,0,1)'
                },
                footer:{
                    footerHeight:50,
                    backgroundColor:'rgba(255,255,255,1)'
                },
                sider:{
                    siderWidth:200,
                    siderModel:'position',
                    collapsible:true,
                    breakpoint:'xl',
                    defaultCollapsed:false
                },
                theme:'ok',
                defaultCollapsedLable:'false',
                collapsibleLable:'true',
                screenWidthWind:true,
                isCollapsible:false,//sider是否默认收起
                screenWidthWindValue:document.documentElement.clientWidth,
                tostTm:null,
                leftscroll:null,
                rightscroll:null,
                headerComponents:[
                    {
                        name:'头部组件',
                        id:'V1.0',
                        version:'V1.0',
                        common:'xxxxxxxx',
                        doc:'xxxxxxxxx'
                    },
                    {
                        name:'头部组件',
                        id:'V1.0',
                        version:'V1.0',
                        common:'xxxxxxxx',
                        doc:'xxxxxxxxx'
                    },
                    {
                        name:'头部组件',
                        id:'V1.0',
                        version:'V1.0',
                        common:'xxxxxxxx',
                        doc:'xxxxxxxxx'
                    },
                    {
                        name:'头部组件',
                        id:'V1.0',
                        version:'V1.0',
                        common:'xxxxxxxx',
                        doc:'xxxxxxxxx'
                    },
                    {
                        name:'头部组件',
                        id:'V1.0',
                        version:'V1.0',
                        common:'xxxxxxxx',
                        doc:'xxxxxxxxx'
                    },
                    {
                        name:'头部组件',
                        id:'V1.0',
                        version:'V1.0',
                        common:'xxxxxxxx',
                        doc:'xxxxxxxxx'
                    }
                ]

            }
        },
        watch:{
            collapsibleLable:function(value){
                if(value == 'true')this.sider.collapsible = true;
                if(value == 'false')this.sider.collapsible = false;
            },
            defaultCollapsedLable:function(value){
                if(value == 'true')this.sider.collapsible = true;
                if(value == 'false')this.sider.collapsible = false;
            }
        },
        methods:{
            onWindowResize:function(){
                let value = document.documentElement.clientWidth
                this.screenWidthWind = true;
                this.screenWidthWindValue = value;
                let _this = this;
                clearTimeout(this.tostTm);
                this.tostTm =setTimeout(function(){
                    _this.screenWidthWind = false;
                },800);
            },
            addHeader:function(){

                // 变量html是生成好的vue格式的HTML模板字符串，
                // 这个模板里面可以包含各种vue的指令，数据绑定等操作，
                // 比如 v-if, :bind, @click 等。
                const html33 = "<i-button @click='showInfo(\"你好d\")'>你好</i-button>"

                // Vue.extend是vue的组件构造器，专门用来构建自定义组件的，
                // 但是不会注册，类似于js中的createElement，
                // 创建但是不会添加。
                // 在这里创建出一个子组件对象构造器。
                const Component = Vue.extend({

                    props: {
                        name:{
                            type:String,
                            default:'ddddddddd'
                        },
                    },
                    // 模板文件。由于Markdown解析之后可能会有多个根节点，
                    // 因此需要包裹起来。
                    // 实际的内容是：
                    // `<div><img src="url" @click="showInfo(`图片文字')"></div>`
                    template: `<div> ${html33} {{name}}</div>`,

                    // 这里面写的就是这个动态生成的新组件中的方法了，
                    // 当然你也可加上data、mounted、updated、watch、computed等等。
                    methods: {

                        // 上面模板中将点击事件绑定到了这里，因此点击了之后就会调用这个函数。
                        // 你可以写多个函数在这里，但是这里的函数的作用域只限在这个子组件中。
                        showInfo (title) {
                        }
                    }

                });

                // new Component()是将上面构建的组件对象给实例化，
                // $mount()是将实例化的组件进行手动挂载，
                // 将虚拟dom生成出实际渲染的dom，
                // 这里的markedComponent是完成挂载以后的子组件
                const markedComponent = new Component().$mount();

                // 将挂载以后的子组件dom插入到父组件中
                // markedComponent.$el就是挂载后生成的渲染dom
                this.$refs['markedContent22'].appendChild(markedComponent.$el);
            }
        },
        mounted () {
            let _this = this;
            this.tostTm =setTimeout(function(){
                _this.screenWidthWind = false;
            },200);
            on(window, 'resize', this.onWindowResize);
            this.$nextTick(() => {
                this.leftscroll = new BScroll(this.$refs.layoutEditorLeftWrap, {
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
                this.rightscroll = new BScroll(this.$refs.layoutEditorRightWrap, {
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
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    $h: 'layout-editor';
    $left-width: 280px;
    $right-width: 400px;
    $head-width:50px;
    .#{$h}{
        position: fixed;
        top:#{$head-width};
        left:#{$left-width};
        right:#{$right-width};
        bottom:0;
    }
    .#{$h}-header{
        height:46px;
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        z-index: 9999;
        background: #fff;
        box-shadow: 1px 2px 2px #ccc;
    }
    .#{$h}-left-panel{
        position: fixed;
        top:#{$head-width};
        left:0;
        bottom:0;
        width: #{$left-width};
        padding:0 20px;
    }
    .#{$h}-right-panel{
        position: fixed;
        top:#{$head-width};
        right:0;
        bottom:0;
        width: #{$right-width};
        box-sizing: border-box;
        padding:0 20px;
    }
    .l-w6{
        display: inline-block;
        width: 6px;
    }
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal-body{
            font-size: 90px;
            font-weight: 700;
            text-align: center;
        }
    }
    .screenWidthWind-text{
        font-size: 60px;
        font-weight: 900;
        width: 100%;
        text-align: center;
    }
    .panel-wrap{
        margin:0 auto;
        border:1px solid #ccc;
        width: 100%;
        min-height: 120px;
        border-radius: 2px;
        overflow: hidden;
        margin-bottom:10px;
        margin-top:10px;
        box-shadow: 1px 1px 2px #ccc;
        .panel-header{
            height:32px;
            line-height: 32px;
            background: #ccc;
            color: #fff;
            text-align: center;
            font-size: 16px;
        }
        .panel-content{
            padding: 4px 10px;
            .panel-line-model{
                margin-bottom:4px;
            }
        }
    }
    .panel-wrap:hover{
        box-shadow: 2px 2px 12px #ccc;
    }
    li,ul{
        list-style: none;
    }
    .component-wrap{
        overflow: hidden;
        border:1px solid #eee;
        padding:1px 2px;
        li{
            width: 50%;
            float: left;
            height:80px;
            border:1px solid #eeeeee;
            margin-bottom:1px;
            box-sizing: border-box;
            text-align: center;
            position: relative;
            font-size: 12px;
            cursor: pointer;
            .thumbimg{
                width: 90%;
                margin: 0 auto;
                height:10px;
            }
            .title{
                text-align: center;
                font-size: 14px;
            }
            .title-sub{
                text-align: center;
                font-size: 12px;
                color: #d4d4d4;
            }
        }
        li:hover{
            box-shadow: 1px 1px 2px #eee;
        }
        li:nth-child(odd)
        {
            position: relative;
            left:-1px;
        }
        li:nth-child(even)
        {
            position: relative;
            left:1px;
        }
    }

</style>
