<template>
  <Tooltip
    effect="dark"
    :content="tip"
    placement="bottom">
    <Button class="d2-mr btn-text can-hover" type="text"  style="font-size: inherit;"
               @click="click">
      <slot>
        <am-icon  :name="icon" :style="{'font-size':size+'px'}"/>
      </slot>
      
    </Button>
  </Tooltip>
</template>

<script>
  export default {
    name:'am-header-btn',
    props: {
      size:{
        type: [String,Number],
        required: false,
        default: '16'
      },
      tip: {
        type: String,
        required: false,
        default: ''
      },
      icon: {
        type: String,
        required: false,
        default: ''
      }
    },
    data(){
      return {
      }
    },
    methods: {
      click(){
        this.$emit('click');
      }
    },
    mounted(){
      
    }
  }
</script>
