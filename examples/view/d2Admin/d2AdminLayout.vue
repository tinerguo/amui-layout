<template>

  
  <layout-d2admin :setting="setting"  ref="layout">
  
    <!-- todo:添加头部设置(必选) -->
    <template slot="header">
      <header-menu @click="headerMenuClick"  :name.sync="setting.menu.currentHeader" :menu-data="setting.menu.header"></header-menu>
      <d2-header-fullscreen></d2-header-fullscreen>
      <d2-header-theme :themes="themes"></d2-header-theme>
    </template>
    <!-- todo:左侧菜单(必选) -->
    <template slot="menusider">
      <am-menuV3  :menu-data="setting.menu.aside">
      </am-menuV3>
    </template>
    <!-- todo:添加tab组件(可选) -->
    <template slot="tab">
      <d2-tabs ref="tabs"></d2-tabs>
    </template>
  </layout-d2admin>
</template>

<script>
  const axios = require('axios')
  import {toTreeData} from '../../utils/dom'
  import getData from 'ex/config/config'
  import  Vue from 'vue'
	export default {
		name: 'd2AdminLayout',
		components: {},
		data () {
			return {
        setting:window.setting,
        themes:window.theme.list
      }
		},
    computed:{
    },
		methods: {
      async loadHeadMenu(){
  
  
        var data1 = await getData["header-menu.json"]({
          method:'get'
        });
  
  
        var arr1 = toTreeData(Object.assign([],data1.result), {
          id: 'mid',
          parendId: 'pmid',
          name: 'modulename',
          rootId: null,
          childrenParamName: 'children',
          expand: false,
          // selected:true,
          checked: true
        });
        this.setting.menu.header = arr1;
        
        
  
        //如果包含子菜单
        /*if(arr1.length > 0){
          this.loadSiderMenuData(arr1[0].id);
        }*/
        
      },
      async loadSiderMenuData(id){
        
        var data2 = await getData["tableMenuData"+id+".json"]({
          method:'get'
        });
  
        var arr2 = toTreeData(Object.assign([],data2.result), {
          id: 'mid',
          parendId: 'pmid',
          name: 'modulename',
          rootId: id,
          childrenParamName: 'children',
          expand: false,
          checked: true
        });
        this.setting.menu.aside = arr2;
      },
      headerMenuClick(item){
        this.loadSiderMenuData(item.id);
      }
    },
    mounted(){
      this.loadHeadMenu();
    }
	}
</script>

<style lang="scss" scoped>
  
</style>
