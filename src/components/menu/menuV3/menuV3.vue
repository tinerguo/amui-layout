<template>
	<div :style="getLogoHeight" class="d2-layout-header-aside-menu-side" :class="isCollapsed?'asideCollapsed':''">
		<el-menu
			:collapse="isCollapsed"
			:unique-opened="true"
			:default-active="currentTabID"
			@select="handleMenuSelect"
			ref="menu">
			<template v-for="(menu,menuIndex) in getMenuData">
				<transition name="fade-collapse">
					<d2-layout-header-aside-menu-item :istopmenu="true"
					                                  v-if="menu.children.length == 0" :menu="menu"
					                                  :key="menuIndex"/>
					<d2-layout-header-aside-menu-sub :istopmenu="true" v-else :menu="menu"
					                                 :key="menuIndex"/>
				</transition>
			</template>
		</el-menu>
		
		<div v-if="getMenuData.length == 0 && !isCollapsed" class="d2-layout-header-aside-menu-empty"
		     flex="dir:top main:center cross:center">
			<d2-icon name="inbox"/>
			<span>无数据</span>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import {Menu, Submenu, MenuItem, MenuItemGroup, Tooltip} from 'element-ui';
	import eventConst from '@/config/EventConst.js'
	import BScroll from 'better-scroll'
	
	import d2LayoutMainMenuItem from './menu-item.vue'
	import d2LayoutMainMenuSub from './menu-sub.vue'
	
	import {getMenu,findTreeItem} from './getOneMenu'
	
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
		props: {
			logoHeight:{
				type:Array,
				default:[0,70]
			},
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
				currentTabID:'',
				currentTab: {
					index: 0,
					id: "1-2",
					closable: true
				},
				isCollapsed: false,
				BS: null
			}
		},
		computed: {
			getLogoHeight(){
				if(this.isCollapsed){
					return {
						top:this.logoHeight[1]+'px'
					}
				}else{
					return {
						top:this.logoHeight[0]+'px'
					}
				}
			},
			getMenuData(){
				if (this.menuData.length > 0) {
					this.$nextTick(()=> {
						//获取第一个存在url的菜单
						var obj = getMenu(this.menuData);
						var tag = {
							name: obj.title,
							url: obj.url,
							id: obj.id,
							closable: obj.closable,
							_obj:obj
						}
						//设置菜单默认显示
						/*this.currentTab.id =JSON.stringify({
							name:tag.name,
							url:tag.url,
							id:tag.id
						});*/
						this.currentTabID = tag.id;
						var temp_obj = findTreeItem(this.menuData,tag.id);
						//组件默认打开这个菜单
						this.$amui.$emit(eventConst.MENU_CLICK_EVENT, temp_obj);
						this.$amui.$emit(eventConst.TAB_ADD_EVENT, tag);
//						this.$amui.$emit(eventConst.PAGE_CHANGE_EVENT, tag);
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
			handleMenuSelect: function (menuID) {
				var temp_obj = findTreeItem(this.menuData,menuID);
				
				var tag = {
					name: temp_obj.title,
					url: temp_obj.url,
					id: temp_obj.id,
					closable: temp_obj.closable,
					_obj:temp_obj
				};
				
				this.$amui.$emit(eventConst.MENU_CLICK_EVENT, temp_obj);
				this.$amui.$emit(eventConst.TAB_ADD_EVENT, tag);
//				this.$amui.$emit(eventConst.PAGE_CHANGE_EVENT, tag);
			},
			updateOpened: function (page) {
				let that = this;
				this.$nextTick(function(){
					that.currentTabID =page.id;
				});
				
			},
			asideCollapse(iscollapse){
				this.isCollapsed = iscollapse;
				this.$nextTick(function () {
					this.scrollDestroy();
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
			}
			
		},
		beforeDestroy () {
			this.scrollDestroy()
		},
		mounted(){
			window.menu = this;
			this.scrollInit()
			this.$amui.$on(eventConst.MENBU_CHANGE_EVENT, this.updateOpened);
			this.$amui.$on(eventConst.ASIDE_COLLAPSE_EVENT, this.asideCollapse);
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
