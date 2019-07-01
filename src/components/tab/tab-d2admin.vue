<template>
  <div class="d2-multiple-page-control-group" flex>
    <div class="d2-multiple-page-control-content" flex-box="1">
      <div class="d2-multiple-page-control-content-inner tab-control">
        <Tabs
          class="d2-multiple-page-control"
          :value="tagName"
          type="card"
          closable
          :animated="true"
          :before-remove="closeBefore"
          @on-click="handleClick">
          <TabPane
            v-for="(page, index) in getOpened"
            :key="index"
            :closable="page.closable"
            :label="page.name || '未命名'"
            :name="page.name"/>
        </Tabs>
      </div>
    </div>
  
    <div
      class="d2-multiple-page-control-btn"
      flex-box="0">
      <!--<Button style="margin-left: 20px">
        <d2-icon name="times-circle"/>
      </Button>-->
      <Dropdown @on-click="handleControlItemClick">
        <Button >
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="left">
            <d2-icon name="arrow-left" class="d2-mr-10"/>
            关闭左侧
          </DropdownItem>
          <DropdownItem name="right">
            <d2-icon name="arrow-right" class="d2-mr-10"/>
            关闭右侧
          </DropdownItem>
          <DropdownItem  name="other">
            <d2-icon name="times" class="d2-mr-10"/>
            关闭其它
          </DropdownItem>
          <DropdownItem name="all">
            <d2-icon name="times-circle" class="d2-mr-10"/>
            全部关闭
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
  import D2Contextmenu from './contextmenu/index.vue'
  import D2ContextmenuList from './contextmenu/components/contentmenuList'
  import { remove, get } from 'lodash'
  import eventConst from '@/config/EventConst.js'
  import {TAB} from '@/config/widgetNameConst.js'
  import {Message} from 'iview';
  const isKeepAlive = data => get(data, 'meta.cache', false)
  
  
	export default {
		name: TAB,
		components: {
      D2Contextmenu:D2Contextmenu,
      D2ContextmenuList:D2ContextmenuList
    },
    computed:{
      current(){},
      getOpened(){
        return this.opendFix.concat(this.opened);
      },
    },
		data () {
			return {
        contextmenuFlag: false,
        contentmenuX: 0,
        contentmenuY: 0,
        contextmenuListIndex: [
          { icon: 'times-circle', title: '关闭全部', value: 'all' }
        ],
        contextmenuList: [
          { icon: 'arrow-left', title: '关闭左侧', value: 'left' },
          { icon: 'arrow-right', title: '关闭右侧', value: 'right' },
          { icon: 'times', title: '关闭其它', value: 'other' },
          { icon: 'times-circle', title: '关闭全部', value: 'all' }
        ],
        tagName: 'index',
        opened:[],
        opendFix:[]
      }
		},
		methods: {
      /**
       * @class opened
       * @description 新增一个 tag (打开一个页面)
       * @param {Object} state vuex state
       * @param {Object} param new tag info
       */
      add (newTag) {
        // 设置新的 tag 在新打开一个以前没打开过的页面时使用
        newTag.params =  newTag.params
        newTag.query = newTag.query
  
        if(this.opened.map(x => x.name).indexOf(newTag.name) === -1) {
          // 添加进当前显示的页面数组
          if(newTag.closable == false){
            this.opendFix.push(newTag);
          }else{
            this.opened.push(newTag);
          }
        }
        //设置当前的页面
        this.tagName = newTag.name;
      },
      /**
       * @description 接收点击 tab 标签的事件
       */
      handleClick (tab) {
        // 找到点击的页面在 tag 列表里是哪个
        var page = this.opened.find(page => page.name === tab)
        if(!page){
          page = this.opendFix.find(page => page.name === tab)
        }
        const { name, params, query } = page
        if (page) {
          //设置当前的页面
          this.tagName = page.name;
          this.$amui.$emit(eventConst.MENBU_CHANGE_EVENT,page);
          this.$amui.$emit(eventConst.PAGE_CHANGE_EVENT,page);
          
          return;
          this.$router.push({ name, params, query })
        }
        
      },
      close({ tagName, vm }){
        // 下个新的页面
        let newPage = {};
        
        const isCurrent = this.tagName === tagName;
        
        // 如果关闭的页面就是当前显示的页面
        if (isCurrent) {
          
          // 去找一个新的页面
          let len = this.opened.length
          for (let i = 0; i < len; i++) {
            if (this.opened[i].name === tagName) {
              if (i < len - 1) {
                newPage = this.opened[i + 1]
              } else {
                newPage = this.opened[i - 1]
              }
              break
            }
          }
        }
        
        // 找到这个页面在已经打开的数据里是第几个
        const index = this.opened.findIndex(page => page.name === tagName)
        if (index >= 0) {
          this.opened.splice(index, 1);
          
          // 如果这个页面是缓存的页面 将其在缓存设置中删除
//          commit('keepAliveRemove', tagName)
        }
        
        if (isCurrent) {
          if(!newPage){
            newPage = {
              name:undefined,
              url:''
            };
          }
          //设置当前的页面
          this.tagName = newPage.name;
          this.$amui.$emit(eventConst.MENBU_CHANGE_EVENT,newPage);
          this.$amui.$emit(eventConst.PAGE_CHANGE_EVENT,newPage);
          
    
        }
        
      },
      /**
       * @description 接收点击关闭控制上选项的事件
       */
      handleControlItemClick (command) {
        var tagName = this.tagName;
        
        const params = {
          pageSelect: tagName,
          vm: this
        }
        switch (command) {
          case 'left':
            this.closeLeft(params)
            break
          case 'right':
            this.closeRight(params)
            break
          case 'other':
            this.closeOther(params)
            break
          case 'all':
            this.closeAll(params)
            break
          default:
            this.Message.error('无效的操作')
            break
        }
      },
      
      closeLeft(params){
        var currentIndex = this.getTabIndex(params.pageSelect);
        if(currentIndex-1<0){
          return;
        }
        this.opened.splice(0,currentIndex);
        //.forEach(({ name }) => commit('keepAliveRemove', name))
      },
      closeRight(params){
        var currentIndex = this.getTabIndex(params.pageSelect);
        if(currentIndex+1>this.opened.length){
          return;
        }
        this.opened.splice(currentIndex+1);
      },
      closeOther(params){
        var currentIndex = this.getTabIndex(params.pageSelect);
        if (currentIndex === 0) {
          this.opened.splice(1)
        } else {
          this.opened.splice(currentIndex + 1);
          this.opened.splice(0,currentIndex);
        }
      },
      closeAll(params){
        //设置当前的页面
        const tagName = this.tagName;
        const index = this.opendFix.findIndex(page => page.name === tagName);
        
        
        let newPage = {};
        //如何当前页面是可以关闭的tab页面
        if(this.opendFix.length > 0) {//如果存在不可关闭的页面
          this.opened = [];
          if(index <= -1 ) {//当前页面不可关闭tab上没有
            newPage = this.opendFix[this.opendFix.length-1];
            this.$amui.$emit(eventConst.PAGE_CHANGE_EVENT,);
            this.tagName = newPage.name;
          }else{
            newPage = this.opendFix[index];
            this.$amui.$emit(eventConst.PAGE_CHANGE_EVENT,this.opendFix[index]);
            this.tagName = newPage.name;
          }
          this.$amui.$emit(eventConst.MENBU_CHANGE_EVENT,newPage);
        }else{
          const params = {
            pageSelect: tagName,
            vm: this
          }
          this.closeOther(params);
        }
       
      },
      /**
       * @description 点击 tab 上的删除按钮触发这里 首页的删除按钮已经隐藏 因此这里不用判断是 index
       */
      closeBefore(index){
        if((this.opened.length + this.opendFix.length) == 1){
          Message.info("最后一个页面了");
          return new Promise(function () {});
        }
        var that = this;
        return new Promise(function () {
          
          that.close({
            tagName:that.opened[index].name,
            vm: that
          });
          
        });
      },
			/**
       * 获取tab下标
       * @param name
       * @returns {number}
       */
      getTabIndex: function (name) {
        for (var i = 0; i < this.opened.length; i++) {
          if (this.opened[i].name == name) {
            return i;
          }
        }
        return -1;
      },
      closeAllC(params){
        const tagName = this.tagName;
        const index = this.opendFix.findIndex(page => page.name === tagName);
        this.opened = [];
        this.opendFix = [];
        var newPage = {
          name:undefined,
          url:''
        };
        //设置当前的页面
        this.tagName = newPage.name;
        this.$amui.$emit(eventConst.MENBU_CHANGE_EVENT,newPage);
        this.$amui.$emit(eventConst.PAGE_CHANGE_EVENT,newPage);
      },
    },
    mounted(){
      //todo:监听iframe设置的菜单
      this.$amui.$on(eventConst.TAB_ADD_EVENT,this.add);
      this.$amui.$on(eventConst.TAB_CLOSEALL_EVENT,this.closeAllC);
    }
	}
</script>
<style lang="scss" >
  .tab-control{
    .ivu-tabs-bar{
      margin-bottom: 0;
    }
  }
  .d2-layout-header-aside-group
  .d2-layout-header-aside-content
  .d2-theme-container .d2-theme-container-main
  .d2-theme-container-main-header
  .d2-multiple-page-control-group
  .d2-multiple-page-control-btn{
    bottom: 0;
    .ivu-btn{
      border-radius: 0;
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
    }
  }
</style>
