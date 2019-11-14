<template>
  <div  :class="themeClassWrap" style="width: 100%;
    height: 100%;
    position: relative;">
    <div
      class="d2-layout-header-aside-group"
      :style="styleLayoutMainGroup"
      :class="{grayMode: grayActive}">
      <!-- 半透明遮罩 -->
      <div class="d2-layout-header-aside-mask"></div>

      <!-- 主体内容 -->
      <div class="d2-layout-header-aside-content" flex="dir:top" >

        <!-- 顶栏 -->
        <div class="d2-theme-header"
          :style="{
          opacity: this.searchActive ? 0.5 : 1,
          height: !this.setting.headerAsideHeight ? '60px' : this.setting.headerAsideHeight+'px'
        }"
          flex-box="0"
          flex>


          <template v-if="!setting.headerAsideCollapse">

            <div class="logo-group" :style="{width:'auto'}"
                 style="font-size: 18px;"
                 flex-box="0"  flex="main:center cross:center">

              <!-- 如果标题存在 -->
              <template v-if="title">

                <img :src="`${baseUrl}images/theme/${themeActiveSetting.name}/logo/icon-only.png`">
                <span >{{title}}</span>
              </template>


              <!-- 如果标题不存在 -->
              <template v-else>
                <img  :src="`${baseUrl}images/theme/${themeActiveSetting.name}/logo/all.png`">
              </template>

            </div>


          </template>

          <template v-else>

            <div class="logo-group" :style="{width: asideCollapse ? this.menu.asideWidthCollapse : 'auto'}"
                 style="font-size: 16px;"
                 flex-box="0"  flex="main:center cross:center">

              <!--&lt;!&ndash; 如果标题存在 &ndash;&gt;-->
              <template v-if="title">

                <img :src="`${baseUrl}images/theme/${themeActiveSetting.name}/logo/icon-only.png`">
                <span v-if="!asideCollapse">{{title}}</span>
              </template>


              <!--&lt;!&ndash; 如果标题不存在 &ndash;&gt;-->
              <template v-else>
                <img v-if="asideCollapse" :src="`${baseUrl}images/theme/${themeActiveSetting.name}/logo/icon-only.png`">
                <img v-else :src="`${baseUrl}images/theme/${themeActiveSetting.name}/logo/all.png`">
              </template>

            </div>

          </template>
  
          
          
          <div class="toggle-aside-btn" @click="handleToggleAside"  flex-box="0">
            <slot name="toggle-aside-btn">
              <Icon type="md-menu" />
            </slot>
          </div>

          <div flex="cross:center" class="d2-theme-header-menu" flex-box="1">
            <div flex-box="1" flex="" class="d2-theme-header-menu__content"></div>
          </div>


          <!-- 顶栏右侧 -->
          <div class="d2-header-right" flex-box="0">
            <!--todo:菜单插槽-->
            <slot name="header"></slot>
            <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
          </div>

        </div>

        <!-- 下面 主体 -->
        <div class="d2-theme-container" flex-box="1" flex>

          <!-- 主体 侧边栏 菜单 -->
          <div class="d2-theme-container-aside"
            v-show="!menu.asideClose"
            flex-box="0"
            ref="aside"
            
            :style="{
            width: asideCollapse ? this.menu.asideWidthCollapse : this.menu.asideWidth,
            opacity: this.searchActive ? 0.5 : 1
          }">

            <!--todo:菜单插槽-->
            <slot name="menusider" ></slot>

          </div>

          <!-- 主体 -->
          <div class="d2-theme-container-main" flex-box="1" flex>

            <!-- 搜索 -->
            <transition name="fade-scale">
              <div v-show="searchActive" class="d2-theme-container-main-layer" flex="dir:top">
              </div>
            </transition>


            <!-- 内容 -->
            <transition name="fade-scale">
              <div v-show="!searchActive" class="d2-theme-container-main-layer" flex="dir:top">
                <!-- tab -->
                <div class="d2-theme-container-main-header" flex-box="0">
                  <slot name="tab" >
                  </slot>
                </div>
                <!-- 页面 -->
                <div class="d2-theme-container-main-body" flex-box="1"
                     style="margin-right: 4px;
                   background: #fff;
                          border-left: 1px solid #ccc;
                          border-right: 1px solid #ccc;
                          border-bottom: 1px solid #ccc;">
                      <!--todo:内容插槽-->
                      <slot name="pageContent" >
                        <vue-friendly-iframe v-for="(item,index) in iframeList" :key="item.id"
                                             v-show="item.id == iframectivate"
                                             @load="iframeLoad(item.id)"
                                             :id="'layoutPageIframe'+item.id"
                                             :src="item.url"></vue-friendly-iframe>
                      </slot>
                </div>
              </div>
            </transition>


          </div>
          
          
          
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import Vue from 'vue'
  import VueFriendlyIframe from 'vue-friendly-iframe';
  // flex 布局库

  import setting from './layout-d2admin/d2adminSetting'
  import d2Icon from '@/widgets/d2-icon/index.vue'
  import amIcon from '@/widgets/am-icon/index.vue'
  import eventConst from '@/config/EventConst.js'
  import emitter from '@/mixins/emitter'
  import {TAB,BREADCRUMB,HEADERMENU} from '@/config/widgetNameConst.js'
  import store from 'store';
  
  Vue.component('d2-icon',d2Icon)
  Vue.component('am-icon',amIcon)
  
  export default {
    name: 'layout-d2admin',
    components: {
      'vue-friendly-iframe': VueFriendlyIframe
    },
    props: {
      setting: {
        type: Object,
        required: false,
        default: () => {}
      }
    },
    mixins:[emitter],
    data () {
      return {
        iframectivate:'empty',
        iframeList:[
          {
            id:'empty',
            url: 'about:blank',
            searchTerm: 'tiger'
          }
        ],
        example1Form: {
          src: 'about:blank',
          searchTerm: 'tiger'
        },
        // 快捷键
        // 支持快捷键 例如 ctrl+shift+s
        hotkey: setting.hotkey,
        //todo:项目图片服务器地址
        baseUrl:this.setting.baseUrl,
        //todo:主题设置
        themeActiveSetting:this.setting.themeActiveSetting,
        title:this.setting.title,
        //todo:激活页面灰色显示
        gray:{
          active:false
        },
        //todo:激活查询页面
        search:{
          active:false
        },
        // todo:是否默认开启页面切换动画
        transition:{
          active:true
        },
        // todo:在读取持久化数据失败时默认页面
        page:{
          // 可以在多页 tab 模式下显示的页面
          pool: [],
          // 当前页面
          current: '',
          // 需要缓存的页面 name
          keepAlive: [],
          // 当前显示的多页面列表
          opened:setting.page.opened
        },
        // todo:侧边栏默认折叠状态
        menu:{
          // 顶栏菜单
          header: [],
          // 侧栏菜单
          aside: [],
          // 侧边栏收缩
          asideCollapse:false,
          // [侧边栏宽度] 正常状态
          asideWidth: this.setting.menu.asideWidth,
          // [侧边栏宽度] 折叠状态
          asideWidthCollapse: this.setting.menu.asideWidthCollapse,
          asideClose:false
        },
        // todo:在读取持久化数据失败时默认用户信息
        user: setting.user,
        // 注册的主题
        theme: {
          list: [
            {
              title: 'd2admin 经典',
              name: 'd2',
              preview: 'image/theme/d2/preview@2x.png'
            },
            {
              title: '紫罗兰',
              name: 'violet',
              preview: 'image/theme/violet/preview@2x.png'
            },
            {
              title: '简约线条',
              name: 'line',
              backgroundImage: 'image/theme/line/bg.jpg',
              preview: 'image/theme/line/preview@2x.png'
            },
            {
              title: '流星',
              name: 'star',
              backgroundImage: 'image/theme/star/bg.jpg',
              preview: 'image/theme/star/preview@2x.png'
            },
            {
              title: 'Tomorrow Night Blue (vsCode)',
              name: 'tomorrow-night-blue',
              preview: 'image/theme/tomorrow-night-blue/preview@2x.png'
            }
          ]
        },
        // todo:子组件是存在判断
        childrenWidget:{
          hasTabD2admin:true,
          breadcrumb:true,
          headermenu:{}
        }
      }
    },
    computed:{
      styleLayoutMainGroup(){
        return this.themeActiveSetting.backgroundImage ? {
          backgroundImage: `url('${this.baseUrl}${this.themeActiveSetting.backgroundImage}')`
        } : {}
      },
      //页面灰色显示
      grayActive(){
        return this.gray.active
      },
      transitionActive(){
        return this.transition.active;
      },
      keepAlive(){
        return this.page.keepAlive;
      },
      asideCollapse(){
        return this.menu.asideCollapse;
      },
      //todo:激活查询页面
      searchActive(){
        return this.search.active;
      },
      themeClassWrap(){
        
          return [
            `theme-${this.themeActiveSetting.name}`
          ];
        
      }
    },
    methods: {
      handleToggleAside () {
        debugger;
        //发送
        this.asideCollapseToggle()
      },
      asideCollapseToggle(){
        this.menu.asideCollapse = !this.menu.asideCollapse;
        this.$amui.$emit(eventConst.ASIDE_COLLAPSE_EVENT,this.menu.asideCollapse);
      },
      pageClose(pages){
        debugger;
        pages.forEach((item) => {
  
          let index = this.iframeList.findIndex((tempObj) => {
            return tempObj.id == item.id;
          });
          this.iframeList.splice(index, 1);
          
          var iframeItem=document.getElementById("layoutPageIframe"+item.id);
          iframeItem.remove();
        });
      },
      pageChange(item){
        if(!item.url || item.url == ""){
          item.url = "about:blank";
        }else{
          item.url = item.url;
        }
        
        let obj = this.iframeList.find((tempObj) => {
          return tempObj.id == item.id;
        });
        
        if(obj){
          this.iframectivate = obj.id;
        }else{
          this.iframectivate = item.id;
          this.iframeList.push(item);
        }

      },
      /** 边框关闭 **/
      siderClose(falg){
        this.menu.asideClose = falg;
      },
      /** 加载页面 **/
      iframeLoad(id){
        var iframe = document.querySelector("#layoutPageIframe"+id+" iframe");
        if(iframe){
          var dif = 60;
          if(this.childrenWidget.hasTabD2admin.hashChild){
            dif += 32;
          }
          if(this.childrenWidget.breadcrumb.hashChild){
            dif += 42;
          }
  
          iframe.height = document.body.clientHeight - dif;
        }
      },
      /** 打开页面 **/
      openPage(item){
        var page = {
          name:item.name,
          url:item.url,
          id:item.id,
          closable:true
        };
        this.$amui.$emit(eventConst.MENBU_CHANGE_EVENT,page);
        this.$amui.$emit(eventConst.TAB_ADD_EVENT,item);
        this.$amui.$emit(eventConst.PAGE_CHANGE_EVENT,item);
      },
      /** 主题修改事件 **/
      themeChange(themeSetting){
        this.themeActiveSetting.backgroundImage  = themeSetting.backgroundImage ? themeSetting.backgroundImage:"";
        this.themeActiveSetting.name  = themeSetting.name;
      },
      FullScreenChange(falg){
        var that = this;
        this.$nextTick(function () {
          setTimeout(function(){
            that.iframeLoad();
          },400);
        });

      }
    },
    created(){
        this.$amui.layoutSetting = this.setting;
    },
    mounted(){
  
      if(store.get("currentTheme")){
        this.themeActiveSetting.name = store.get("currentTheme");
      }
      
      
      //todo:监听iframe设置的菜单
      this.$amui.$emit(eventConst.LAYOUT_INIT_EVENT,this.setting)
      this.$amui.$on(eventConst.PAGE_CHANGE_EVENT,this.pageChange);
      this.$amui.$on(eventConst.PAGE_CLOSE_EVENT,this.pageClose);
      this.$amui.$on(eventConst.ASIDE_CLOSE_EVENT,this.siderClose);
      this.$amui.$on(eventConst.THEME_CHANGE_EVENT,this.themeChange);
  
      
      
      
      this.childrenWidget.hasTabD2admin = this.hasChild(TAB);
      this.childrenWidget.breadcrumb = this.hasChild(BREADCRUMB);
      this.childrenWidget.headermenu = this.hasChild(HEADERMENU);
      
      //避免左侧菜单闪烁,
      if(this.childrenWidget.headermenu.hashChild){
        this.menu.asideClose = true;
      }
  
      
      
      this.$amui.$on(eventConst.FULL_SCREEN_EVENT,this.FullScreenChange);
      
      
    }
  }
</script>

<style    lang="scss" rel="stylesheet/scss">
  @import "~@/assets/style/theme/index.scss";
  @import "~@/assets/style/animate/vue-transition.scss";

  iframe {
    border: none;
  }
  iframe {
    width: 100%;
  }
</style>
