<template>
  <Tooltip
    effect="dark"
    :content="active ? '退出全屏' : '全屏'"
    placement="bottom">
    <Button class="d2-mr btn-text can-hover" type="text"  style="font-size: inherit;"
               @click="toggle">
      
      <slot v-if="active" name="active">
        <am-icon name="iconsuoxiao" style="font-size:35px;" ></am-icon>
      </slot>
      
      <slot v-else>
        <am-icon name="iconfangda" style="font-size:34px;" ></am-icon>
      </slot>
      
    </Button>
  </Tooltip>
</template>

<script>
  import eventConst from '@/config/EventConst.js'
  import screenfull from 'screenfull'
  export default {
    name:'d2-header-fullscreen',
    props: {
      icon: {
        type: String,
        required: false,
        default: ''
      },
      iconActive:{
        type:String,
        required: false,
        default: ''
      },
      size:{
        type:[String,Number],
        required: false,
        default: '32'
        
      }
    },
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
          this.$amui.$emit(eventConst.FULL_SCREEN_EVENT,this.active);
        } else {
          screenfull.request();
          this.active = true;
          this.$amui.$emit(eventConst.FULL_SCREEN_EVENT,this.active);
        }
        
      }
    },
    mounted(){
      var that = this;
      if (screenfull.enabled) {
        screenfull.on('change', () => {
          if (!screenfull.isFullscreen) {
            that.active = false;
            
          }
        })
      }
    }
  }
</script>
