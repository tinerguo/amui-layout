<template>
  <div
    class="d2-layout-header-aside-group"
    :style="styleLayoutMainGroup"
    :class="{grayMode: grayActive}">
    <!-- 半透明遮罩 -->
    <div class="d2-layout-header-aside-mask"></div>
  
    <!-- 主体内容 -->
    <div class="d2-layout-header-aside-content" flex="dir:top" style="border:1px solid red;" >
      
      <!-- 顶栏 -->
      <div
        style="border:1px solid blue;"
        class="d2-theme-header"
        :style="{
          opacity: this.searchActive ? 0.5 : 1
        }"
        flex-box="0"
        flex>
  
        <div class="logo-group" :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}" flex-box="0">
          <img v-if="asideCollapse" :src="`${baseUrl}images/theme/${themeActiveSetting.name}/logo/icon-only.png`">
          <img v-else :src="`${baseUrl}images/theme/${themeActiveSetting.name}/logo/all.png`">
        </div>
  
  
        <div class="toggle-aside-btn"  flex-box="0">
          按钮
        </div>
  
  
  
        <!-- 顶栏右侧 -->
        <div class="d2-header-right" flex-box="0">
          <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
          顶栏右侧
        </div>
        
      </div>
  
  
      <!-- 下面 主体 -->
      <div class="d2-theme-container" flex-box="1" flex>
        
        <!-- 主体 侧边栏 菜单 -->
        <div
          style="border:1px solid blue;"
          flex-box="0"
          ref="aside"
          class="d2-theme-container-aside"
          :style="{
            width: asideCollapse ? asideWidthCollapse : asideWidth,
            opacity: this.searchActive ? 0.5 : 1
          }">
          菜单
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
                tab
              </div>
              <!-- 页面 -->
              <div class="d2-theme-container-main-body" flex-box="1">
                <transition :name="transitionActive ? 'fade-transverse' : ''">
                  <keep-alive :include="keepAlive">
                    页面
                    <router-view/>
                  </keep-alive>
                </transition>
              </div>
            </div>
          </transition>
  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  
  // flex 布局库
  import 'flex.css'
  
	export default {
		name: 'vueComponent',
		components: {},
		data () {
			return {
			  //主题激活设置
        themeActiveSetting:{
          backgroundImage:'linear-gradient(120deg,#bc00e3,#4efffb);',
          name:'d2'
        },
        baseUrl:'http://localhost:8080/static/',
        gray:{
          active:false
        },
        searchActive:'',
        transition:{
          active:true
        },
        page:{
          keepAlive: []
        },
        // [侧边栏宽度] 正常状态
        asideWidth: '200px',
        // [侧边栏宽度] 折叠状态
        asideWidthCollapse: '65px'
      }
		},
    computed:{
      styleLayoutMainGroup(){
        return this.themeActiveSetting.backgroundImage ? {
          backgroundImage: `url('${this.baseUrl}${this.themeActiveSetting.backgroundImage}')`
        } : {}
      },
      grayActive(){
        return this.gray.active
      },
      transitionActive(){
        return this.transition.active;
      },
      keepAlive(){
        
      },
      asideCollapse(){
        return false;
      }
    },
		methods: {}
	}
</script>

<style  lang="scss">
  @import "~@/assets/style/theme/index.scss";
</style>
