<template>
  
  <Tooltip
          effect="dark"
          content="系统切换"
          placement="left">
    <Dropdown>
      <Button class="d2-mr btn-text can-hover" type="text">
        <!--<Icon style="font-size: 16px" type="md-swap" />-->
        <Icon style="font-size: 18px" type="md-open" />
      </Button>
      <DropdownMenu slot="list">
        <DropdownItem v-for="(item,index) in sysList" :key="item.appid">
          <a  :href="''+item.appurl" style="display: inline-block;width:100%;height:100%;text-align: center;color:#333;">{{item.appname}}</a>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </Tooltip>
</template>

<script>
  import http from '@/utils/http'
  export default {
    name:'d2-header-sys-switch',
    data(){
      return {
        sysList:[]
      }
    },
    methods: {
      async getSysList(){
  
        var res = await http({
          url:window.configs.AUUM_ROOT+'v1/APPs',
          method: 'get',
          params:{
            pagesize:0,
            pageindex:0
          }
        });
        this.sysList = res.result;
        
      }
    },
    mounted(){
     this.getSysList();
    }
  }
</script>
