<template>
  <el-table
    :data="list"
    v-bind="table">
    
    <el-table-column
      prop="title"
      align="center"
      width="160"/>
    <el-table-column
      label="预览"
      width="120">
      <div
        slot-scope="scope"
        class="theme-preview"
        :style="{
          backgroundImage: `url(${baseUrl}${scope.row.preview})`
        }">
      </div>
    </el-table-column>
    <el-table-column
      prop="address"
      align="center">
      <template slot-scope="scope">
        <Button
          v-if="activeName === scope.row.name"
          type="success"
          icon="el-icon-check"
          round>
          已激活
        </Button>
        <Button
          v-else
          round
          @click="handleSelectTheme(scope.row)">
          使用
        </Button>
      </template>
    </el-table-column>
    
  </el-table>
</template>

<script>
  import Vue from 'vue'
  import { Table,TableColumn } from 'element-ui';

  Vue.component(Table.name, Table);
  Vue.component(TableColumn.name, TableColumn);
  
  
  import eventConst from '@/config/EventConst.js'
  export default {
    name: 'd2-theme-list',
    props:{
      list: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    data () {
      return {
        baseUrl:'',
        activeName:'am',
        table: {
          showHeader: false,
          border: true
        }
      }
    },
    methods: {
      handleSelectTheme (item) {
        this.$amui.$emit(eventConst.THEME_CHANGE_EVENT,item)
        this.activeName = item.name;
      },
      getLayoutSetting(setting){
        this.baseUrl = setting.baseUrl;
        this.activeName = setting.themeActiveSetting.name;
      }
    },
    mounted(){
  
      this.$amui.$on(eventConst.LAYOUT_INIT_EVENT,this.getLayoutSetting)
      
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/style/public.scss';
  .theme-preview {
    height: 50px;
    width: 100px;
    border-radius: 4px;
    background-size: cover;
    border: 1px solid $color-border-1;
  }
</style>
