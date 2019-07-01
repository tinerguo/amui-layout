<template>
  <div class="d2-layout-header-aside-menu-side" :class="isCollapsed?'asideCollapsed':''">

      <el-menu
        :collapse="isCollapsed"
        :unique-opened="true"
        :default-active="currentTab.id"
        @select="handleMenuSelect"
        ref="menu">
          <template  v-for="(menu,menuIndex) in getMenuData">
            <transition name="fade-collapse">
            <d2-layout-header-aside-menu-item v-if="menu.children.length == 0" :menu="menu" :key="menuIndex"/>
            <d2-layout-header-aside-menu-sub v-else :menu="menu" :key="menuIndex"/>
          </transition>
          </template>
      </el-menu>

    <div v-if="getMenuData.length == 0 && !isCollapsed" class="d2-layout-header-aside-menu-empty" flex="dir:top main:center cross:center">
      <d2-icon name="inbox"/>
      <span>无数据</span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Menu, Submenu, MenuItem, MenuItemGroup,Tooltip } from 'element-ui';
  import eventConst from '@/config/EventConst.js'
  import BScroll from 'better-scroll'

  import d2LayoutMainMenuItem from './menu-item.vue'
  import d2LayoutMainMenuSub from './menu-sub.vue'

  import {getMenu} from './getOneMenu'

  Vue.component(Menu.name, Menu);
  Vue.component(Submenu.name, Submenu);
  Vue.component(MenuItem.name, MenuItem);
  Vue.component(MenuItemGroup.name, MenuItemGroup);
  Vue.component(Tooltip.name, Tooltip);


	export default {
		name: 'vueComponent',
    components: {
      'd2-layout-header-aside-menu-item': d2LayoutMainMenuItem,
      'd2-layout-header-aside-menu-sub': d2LayoutMainMenuSub
    },
    props:{
      menuData: {
        type: Array,
        default () {
          return [];
        }
      }
    },

		data () {
			return {
        menuState: {
          openNames: [],
          height: 900
        },
        tab: {
          type: "line" //可选值:line,card
        },
        currentTab: {
          index: 0,
          id: "1-2",
          closable: true
        },
        isCollapsed: false,
        BS:null
      }
		},
    computed:{
      getMenuData(){
        if(this.menuData.length > 0){
          this.$nextTick(() => {
            var obj = getMenu(this.menuData);
            var tag = {
              name:obj.title,
              url:obj.url,
              id:obj.id,
              closable: obj.closable
            }
            this.$amui.$emit(eventConst.TAB_ADD_EVENT,tag);
            this.$amui.$emit(eventConst.PAGE_CHANGE_EVENT,tag);
          });
        }
        return this.menuData;
      },
      menuitemClasses() {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ];
      }
    },
		methods: {
      handleMenuSelect: function (item) {
        debugger;
        var item = JSON.parse(item);
        var tag = item;
        this.$amui.$emit(eventConst.TAB_ADD_EVENT,tag);
        this.$amui.$emit(eventConst.PAGE_CHANGE_EVENT,tag);
      },
      updateOpened:function(page){
        this.currentTab.id = JSON.stringify(page);
      },
      asideCollapse(iscollapse){
        this.isCollapsed = iscollapse;
        this.$nextTick(function(){
          this.scrollDestroy()
          setTimeout(() => {
            this.scrollInit()
          }, 500)
        });
      },
      scrollInit () {
          this.BS = new BScroll(this.$el, {
            mouseWheel: true
            // 如果你愿意可以打开显示滚动条
            /*scrollbar: {
              fade: true,
              interactive: false
            }*/
          })
      },
      scrollDestroy () {
        // https://github.com/d2-projects/d2-admin/issues/75
        try {
          this.BS.destroy()
        } catch (e) {
          delete this.BS
          this.BS = null
        }
      },

    },
    beforeDestroy () {
      this.scrollDestroy()
    },
    mounted(){
      this.scrollInit()
      this.$amui.$on(eventConst.MENBU_CHANGE_EVENT,this.updateOpened);
      this.$amui.$on(eventConst.ASIDE_COLLAPSE_EVENT,this.asideCollapse);
    }
	}
</script>

<style   lang="scss" rel="stylesheet/scss" >

</style>
