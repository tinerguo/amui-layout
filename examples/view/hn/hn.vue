<template>
	<layout-d2admin :setting="setting" ref="layout">
		<!-- todo:添加头部设置(必选) -->
		<template slot="header">
			<!-- 权限系统组件,需要配置 window.configs.AUUM_ROOT -->
			<am-sys-switch></am-sys-switch>
			<d2-header-theme :themes="themes"></d2-header-theme>
			<d2-header-fullscreen></d2-header-fullscreen>
			<!-- 权限系统组件,需要配置 window.configs.AUUM_ROOT -->
			<user-menu></user-menu>
		</template>
		<!-- todo:左侧菜单(必选) -->
		<template slot="menusider">
			<am-menuv3 :menu-data="setting.menu.aside">
			</am-menuv3>
		</template>
		<!-- todo:添加tab组件(可选)-->
		<template slot="tab">
			<am-breadcrumb></am-breadcrumb>
			<!--<d2-tabs ref="tabs"></d2-tabs>-->
		</template>
	</layout-d2admin>
</template>

<script>
	const axios = require('axios')
	import {toTreeData, GetQueryString} from 'ex/utils/dom'
	import getData from 'ex/config/config'
	
	export default {
		name: 'd2AdminLayout',
		components: {},
		data () {
			return {
				setting: window.setting,
				themes: window.theme.list,
				APPID:GetQueryString("appID") || 1
			}
		},
		computed: {},
		methods: {
			async loadSiderMenuData(){
				var data1 = await getData["hn/getMenuData/app"+this.APPID+".json"]({
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
				});
				this.setting.menu.aside = Object.assign([],arr1);
				
			},
			changeTitle(){
				if(this.APPID == 1){
					window.setting.title = "和硕县马兰河中型灌区综合业务管理系统 — 配水调度";
				}else if(this.APPID == 2){
					window.setting.title = "和硕县马兰河中型灌区综合业务管理系统 - 计量收费";
				}else if(this.APPID == 3){
					window.setting.title = "和硕县马兰河中型灌区综合业务管理系统 - 工程检巡";
				}else if(this.APPID == 4){
					window.setting.title = "和硕县马兰河中型灌区综合业务管理系统 - 水权交易";
				}else if(this.APPID == 5){
					window.setting.title = "和硕县马兰河中型灌区综合业务管理系统 - 设备安全";
				}else if(this.APPID == 6){
					window.setting.title = "和硕县马兰河中型灌区综合业务管理系统 - 防汛应急管理";
				}else if(this.APPID == 7){
					window.setting.title = "和硕县马兰河中型灌区综合业务管理系统 - 系统管理";
				}
				
				this.setting = window.setting;
			}
		},
		mounted(){
			this.changeTitle();
			this.loadSiderMenuData();
		}
	}
</script>

<style lang="scss" scoped>
</style>
