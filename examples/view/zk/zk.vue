<template>
	<layout-d2admin-h :setting="setting" ref="layout">
		<div slot="toggle-aside-btn">
			<am-icon name="iconshousuo" style="font-size:26px;" ></am-icon>
		</div>
		<!-- todo:添加头部设置(必选) -->
		<template slot="header">
			
			<header-btn @click="refresh" icon="iconguanji" tip="刷新" size="36">
			</header-btn>
			
			<!-- 退出登录操作 -->
			<header-btn @click="loginout" icon="iconguanji" tip="退出登录" size="36">
			</header-btn>
			
			<header-btn icon="iconguanyuruanjian" tip="关于" size="37">
			</header-btn>
			
			<d2-header-theme :themes="themes" icon="iconzhuanshi" style="font-size:32px;font-weight: 100;">
			</d2-header-theme>
			
			<d2-header-fullscreen icon="arrows-alt" icon-active="compress" size="34">
			</d2-header-fullscreen>
			
			
			<user-menu-single-sys @dropdownClick="dropdownClick" :user-name="getUserName" login-page="./login.html" :auum-root="auumRoot">
				<div slot="dropdownMenu">
					<DropdownItem name="loginout">
						<Icon type="md-person" style="margin-right:5px;"/>
						退出登录
					</DropdownItem>
				</div>
			</user-menu-single-sys>
			
		</template>
		<!-- todo:左侧菜单(必选) -->
		<template slot="menusider">
			<am-menuv3 :menu-data="setting.menu.aside" :logo-height="[140,70]">
			</am-menuv3>
		</template>
		<!-- todo:添加tab组件(可选)-->
		<template slot="tab">
			<!--<am-breadcrumb></am-breadcrumb>-->
			<d2-tabs ref="tabs"></d2-tabs>
		</template>
	</layout-d2admin-h>
</template>

<script>
	const axios = require('axios');
	import {setting} from './config/setting';
	import {toTreeData, GetQueryString} from 'ex/utils/dom'
	import getData from './config/config'
	
	export default {
		name: 'd2AdminLayout',
		components: {},
		data () {
			return {
				setting: setting,
				themes: window.theme.list,
				APPID:GetQueryString("appID") || 1,
				auumRoot:window.configs.AUUM_ROOT
			}
		},
		computed: {
			getUserName(){
//				if(!this.userUtils){
//					return null;
//				}
//				return this.userUtils.getUserName();
				return 'tiner';
			}
		},
		methods: {
			refresh(){
				debugger;
				this.$refs['layout'].refreshPage();
			},
			loginout(){
				
			},
			dropdownClick(name){
				alert("click:"+name);
			},
			async loadSiderMenuData(){
				var data1 = await getData["getMenuData.json"]({
					method: 'get'
				});
				
				var arr1 = toTreeData(Object.assign([], data1.result), {
					id: 'mid',
					parendId: 'pmid',
					name: 'modulename',
					rootId: null,
					childrenParamName: 'children',
					expand: false,
					// selected:true,
					checked: true
				},false);
				this.setting.menu.aside = Object.assign([],arr1);
				
			}
		},
		mounted(){
			this.loadSiderMenuData();
		}
	}
</script>

<style lang="scss" scoped>
</style>
