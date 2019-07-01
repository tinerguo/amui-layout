<template>
  <div class="d2-layout-header-aside-menu-side" :class="isCollapsed?'asideCollapsed':''">
    <Menu id="sider_menu" ref="myMenu" :active-name="currentTab.name" width="auto"
        :open-names="menuState.openNames" accordion :class="menuitemClasses"
        style="background: rgba(0,0,0,0);">
  
  
    <template  v-for="submenu in getMenuData" title="" name="">
  
      <MenuItem v-if="submenu.children.length == 0" @click.native="handleMenuClick(submenu)"  :name="submenu.title"  :key="submenu.id">
        <Icon :type="submenu.icon"></Icon>
        <transition name="fade-collapse">
          <span v-show="!isCollapsed" :title="submenu.title">{{submenu.title}}</span>
        </transition>
      </MenuItem>
  
      <Submenu v-else :name="submenu.title" :key="submenu.id">
        <template slot="title">
          <Icon :type="submenu.icon"></Icon>
          <transition name="fade-collapse">
            <span v-show="!isCollapsed" :title="submenu.title">{{submenu.title}}</span>
          </transition>
        </template>
        <template v-for="item in submenu.children">
          <menu-item :name="item.title" @click.native="handleMenuClick(item)"
                     :style="{paddingLeft:(!isCollapsed?43:25)+'px'}">
            <Icon :type="item.icon"></Icon>
            <transition name="fade-collapse">
              <span v-show="!isCollapsed" :title="item.title">{{item.title}}</span>
            </transition>
          </menu-item>
        </template>
      </Submenu>
      
    </template>
    
  </Menu>
  </div>
</template>

<script>
  import eventConst from '@/config/EventConst.js'
  import BScroll from 'better-scroll'
	export default {
		name: 'vueComponent',
		components: {},
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
          name: "",
          closable: true
        },
        isCollapsed: false
      }
		},
    computed:{
      getMenuData(){
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
      handleMenuClick: function (item) {
        var tag = {
          ...item,
          closable: true,
          meta:{
            title:item.title
          },
          name:item.title,
          params:{},
          query:{}
        };
        this.$amui.$emit(eventConst.TAB_ADD_EVENT,tag);
        this.$amui.$emit(eventConst.PAGE_CHANGE_EVENT,tag);
      },
      expendMenu(item){
  
        this.menuState.openNames.push(item.name);
        if(item.parent){
          this.expendMenu(item.parent);
        }
      },
      updateOpened:function(page){
        this.currentTab.name = page.name;
        this.$nextTick(function () {
          this.$refs["myMenu"].updateOpened();
        });
  
        this.menuState.openNames  = [];
        this.menuState.openNames.push(page.name)
        if(page.parent){
          this.expendMenu(page.parent);
        }
      },
      asideCollapse(iscollapse){
        this.isCollapsed = iscollapse;
      },
      scrollInit () {
          this.BS = new BScroll(this.$el, {
            mouseWheel: true,
            // 如果你愿意可以打开显示滚动条
            scrollbar: {
              fade: true,
              interactive: false
            }
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
      }
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
  .ivu-menu-vertical.ivu-menu-light:after{
    background: none;
  }
  .asideCollapsed{
    .ivu-menu-vertical{
      .ivu-menu-submenu.ivu-menu-opened> .ivu-menu-submenu-title{
        border-bottom:1px solid #1d8aec;
      }
      .ivu-menu-submenu-title-icon{
        right: 0;
      }
    }
  }
</style>
