<template>
  <el-menu-item :index="getID() || uniqueId">
    <i style="font-size: 22px;width: 22px;" v-if="menu.icon" :class="`${menu.icon}`"></i>
    <d2-icon-svg v-else-if="menu.iconSvg" :name="menu.iconSvg"/>
    <i v-else class="fa fa-file-o"></i>
    <span v-if="!isCollapsed" slot="title">{{menu.title || '未命名菜单'}}</span>
  </el-menu-item>
</template>

<script>
  import { uniqueId } from 'lodash'
  import eventConst from '@/config/EventConst.js'
  export default {
    name: 'd2-layout-header-aside-menu-item',
    props: {
      menu: {
        type: Object,
        required: false,
        default: () => {}
      }
    },
    data () {
      return {
        uniqueId: uniqueId('d2-menu-empty-'),
        isCollapsed: false
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
    },
    mounted(){
    }
  }
</script>
