<template>
  <el-submenu :index="menu.id">
    <template slot="title">
          <i :style="getColor" class="icon" v-if="menu.icon" :class="`${menu.icon}`"></i>
          <d2-icon-svg :style="getColor" class="icon" v-else-if="menu.iconSvg" :name="menu.iconSvg"/>
      <!-- <i v-else class="fa fa-folder-o"></i> -->
      <span slot="title">{{menu.title}}</span>
    </template>
    <template v-for="(child, childIndex) in menu.children">
      <d2-layout-header-aside-menu-item :istopmenu="false" v-if="child.children.length == 0"  :menu="child" :key="childIndex"/>
      <d2-layout-header-aside-menu-sub :istopmenu="false" v-else :menu="child" :key="childIndex"/>
    </template>
  </el-submenu>
</template>

<script>
  import { uniqueId } from 'lodash'
  // 组件
  import d2LayoutMainMenuItem from './menu-item'

  export default {
    name: 'd2-layout-header-aside-menu-sub',
    components: {
      'd2-layout-header-aside-menu-item': d2LayoutMainMenuItem
    },
    props: {
      menu: {
        type: Object,
        required: false,
        default: () => {}
      },
      istopmenu:{
        type:Boolean,
        default:false
      }
    },
    watch:{
      menu:function(data){
//        console.log(data);
      }
    },
    computed:{
        getColor:function(){
            if(this.menu.bgcolor){
                return {
                    backgroundColor:this.menu.bgcolor,
                    "color":"#fff"
                }
            }
            return null;
        }
    },
    data () {
      return {
        uniqueId: uniqueId('d2-menu-empty-')
      }
    },
    methods:{
      getID(){
        return JSON.stringify({
          name:this.menu.name,
          url:this.menu.url,
          id:this.menu.id,
          closable:this.menu.closable
        });
      }
    }
  }
</script>
