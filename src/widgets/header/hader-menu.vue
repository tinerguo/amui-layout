<template>
  <Menu ref="myMenu" mode="horizontal"  :active-name="currentName"
        style="background: rgba(0,0,0,0);border:none;margin-right:60px;">
      <template  v-for="submenu in getMenuData" title="" name="">
  
        <MenuItem v-if="submenu.children.length == 0" @click.native="handleMenuClick(submenu)"  :name="submenu.title"  :key="submenu.id">
          <i style="font-size: 22px;width: 22px;" v-if="submenu.icon" :class="`${submenu.icon}`"></i>
          <d2-icon-svg v-else-if="submenu.iconSvg" :name="submenu.iconSvg"/>
          <i v-else class="fa fa-file-o"></i>
          
          <span v-if="submenu.target" :title="submenu.title"><a :href='submenu.url' target='_blank'>{{submenu.title}}</a></span>
          <span v-else :title="submenu.title">{{submenu.title}}</span>
        </MenuItem>
        
        <Submenu v-else :name="submenu.title" :key="submenu.id">
          <template slot="title">
            <i style="font-size: 22px;width: 22px;" v-if="submenu.icon" :class="`${submenu.icon}`"></i>
            <d2-icon-svg v-else-if="submenu.iconSvg" :name="submenu.iconSvg"/>
            <i v-else class="fa fa-file-o"></i>
            <span :title="submenu.title">{{submenu.title}}</span>
          </template>
          <template v-for="item in submenu.children">
            <menu-item :name="item.title"  @click.native="handleMenuClick(item)">
              <Icon :type="item.icon"></Icon>
              <span :title="item.title">{{item.title}}</span>
            </menu-item>
          </template>
        </Submenu>
        
     </template>
    
  </Menu>
</template>

<script>
  
  import eventConst from '@/config/EventConst.js'
	export default {
		name: 'header-menu',
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
        isCollapsed:false,
        currentName:''
      }
    },
    watch:{
     
    },
    computed:{
      getMenuData(){
        if(this.menuData.length <= 0)return [];
        
        setTimeout(function(){
          this.currentName = this.menuData[0].name;
          this.$nextTick(function () {
            this.$refs["myMenu"].updateOpened();
          });
        }.bind(this),400)
        
        var item = this.menuData[0];
        this.$emit('click',item);
  
        setTimeout(function(){
          if(item.url && item.url!=''){
            this.$amui.$emit(eventConst.ASIDE_CLOSE_EVENT,true);
            this.$amui.$emit(eventConst.TAB_ADD_EVENT,{
              name:item.name,
              url:item.url,
              id:item.id,
              closable:false
            });
            this.$amui.$emit(eventConst.PAGE_CHANGE_EVENT,item);
          }else{
            this.$amui.$emit(eventConst.ASIDE_CLOSE_EVENT,false);
          }
        }.bind(this),500)
        
        
        return this.menuData;
      },
      menuitemClasses() {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ];
      }
    },
		components: {},
		methods: {
		  handleMenuClick(item){
		   
        item["pageType"] = "headerPage";
        if(item.target){
          return;
        }
        this.$amui.$emit(eventConst.TAB_CLOSEALL_EVENT);
        this.$emit('click',item);
        if(item.url && item.url!=''){
          this.$amui.$emit(eventConst.ASIDE_CLOSE_EVENT,true);
          this.$amui.$emit(eventConst.TAB_ADD_EVENT,item);
          this.$amui.$emit(eventConst.PAGE_CHANGE_EVENT,item);
        }else{
          this.$amui.$emit(eventConst.ASIDE_CLOSE_EVENT,false);
        }
      }
    },
    mounted(){
       
    }
	}
</script>

<style lang="scss" scoped>
  
  .ivu-menu-horizontal.ivu-menu-light:after{
    background: none;
  }
  .ivu-menu-horizontal .ivu-menu-item, .ivu-menu-horizontal .ivu-menu-submenu{
    padding:0 12px;
  }
</style>
