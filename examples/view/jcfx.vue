<!--基层防汛项目layout-->
<template>
    <div class="layout-editor-wrap">
        <div class="layout-editor">
            <am-layoutv1 :theme="layout.theme" ref="layout">

                <am-headerv1 :height.sync="header.headerHeight" >
                    <am-header-contentv1 :title="header.title" :logo="header.logo">
                        <div slot="header-menu">
                            <img :src="require('./jcfx/images/top-icon01.png')" alt="">
                            <img :src="require('./jcfx/images/top-icon02.png')" alt="">
                            <img :src="require('./jcfx/images/top-icon03.png')" alt="">
                        </div>
                    </am-header-contentv1>
                </am-headerv1>
                <!--
                    sider属性:
                    width:sider默认宽度
                    collapsible:是否可以收起
                    collapsed-width:收起后的宽度
                    breakpoint:监测断点
                 -->
                <am-siderv1 style="background: rgba(255,255,255,0.4);border-top-left-radius: 2px;border-bottom-left-radius: 2px;"
                        :width.sync="sider.siderWidth"
                            :default-collapsed="sider.defaultCollapsed"
                            :breakpoint="sider.breakpoint"
                            :collapsible="sider.collapsible"
                            v-model="sider.isCollapsible">
                    <am-menuv1  :menuData="sider.menuData"  :isTopMenu="sider.isTopMenu" :store="sider.store">
                    </am-menuv1>
                </am-siderv1>

                <!--<am-footerv1 :height.sync="footer.footerHeight">
                    <div style="float: right;margin-right:20px;color:#fff;box-sizing: border-box;position: relative;top:-1px;">
                        北京奥特美克股份有限公司 <div style="display: inline-block;width:20px;"></div> 版本:V1.0
                    </div>
                </am-footerv1>-->

                <am-contentv1 :url="content.defaultURL" style="background: #fff;border-bottom-right-radius: 2px;
                border-top-right-radius: 2px;
                box-shadow: -1px 2px 2px #565656;"></am-contentv1>
                
                
                
            </am-layoutv1>
        </div>

    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import Vue from 'vue';
    import axios from 'axios';
    import {toTreeData} from '@/utils/dom'
    export default {
        name: 'jcfx',
        data () {
            return {
                baseURL:window.configs.UI_ROOT,
                content:{
                    //设置默认地址
                    defaultURL:'http://www.json.cn'
                },
                header: {
                    headerHeight: 60,
                    backgroundColor: 'rgba(2,57,145,1)',
                    logo:require('./jcfx/images/logo.png'),
                    title:'东丽区防汛监测预警平台'
                },
                sider: {
                    siderWidth: 169,
                    siderModel: 'position',
                    collapsible: false,
                    breakpoint: 'sm',
                    defaultCollapsed: false,
                    isTopMenu:false,
                    store:false,
                    menuData:[
                    ]
                },
                layout: {
                    theme: 'ok'
                }
            }
        },
        watch: {
        },
        methods: {
            setMenuItem:function(code,url){
                this.$refs.layout.oniframeSelectMenuItem({
                    ids:code,//菜单编码
                    level:1,//级别
                    topIndex:0,//顶部菜单下标
                    url:url//页面url
                });
            },
            getMenuData(){
                var that = this;
                           
                axios.get(window.configs.UI_ROOT+'/static/json/jcfx/menuData.json')
                        .then(function (response) {
                            that.sider.menuData = response.data;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            }
        },
        mounted () {
            let _this = this;
            this.tostTm = setTimeout(function () {
                _this.screenWidthWind = false;
            }, 200);
            this.getMenuData();
        }
    }

    /**
     *   ifame调用这个方法,设置菜单
         //window.parent.oniframeSelectMenuItem
         function oniframeSelectMenuItem(code){
            app.setMenuItem(code,url);
         }
     */

</script>

<style lang="scss" rel="stylesheet/scss">
    .layout-editor{
        position: absolute;
        left:2px;
        right:2px;
        bottom:0px;
        top:0px;
        min-width: 1100px;
        min-height:700px;
    }
    .layout-editor-wrap{
        height:100%;
        width:100%;
        background: url("./jcfx/images/pagebk.jpg") 0 0 no-repeat;
        background-size: 100% 100%;
    }

</style>