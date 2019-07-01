<template>
  <Tooltip
    effect="dark"
    :content="active ? '退出全屏' : '全屏'"
    placement="bottom">
    <Button class="d2-mr btn-text can-hover" type="text"
               @click="toggle">
      <d2-icon v-if="active" name="compress"/>
      <d2-icon v-else name="arrows-alt" style="font-size: 16px"/>
    </Button>
  </Tooltip>
</template>

<script>
  import screenfull from 'screenfull'
  export default {
    name:'d2-header-fullscreen',
    data(){
      return {
        active:false
      }
    },
    methods: {
      toggle(){
  
        if (screenfull.isFullscreen) {
          screenfull.exit()
          this.active = false;
        } else {
          screenfull.request()
          this.active = true;
        }
        
      }
    },
    mounted(){
      var that = this;
      if (screenfull.enabled) {
        screenfull.on('change', () => {
          console.log('1')
          if (!screenfull.isFullscreen) {
            that.active = false;
          }
        })
      }
    }
  }
</script>
