<template>
  <div
          style="font-size: 16px">
    <Tooltip
      effect="dark"
      content="主题"
      placement="bottom">
      <Button style="font-size: inherit;"
        class="d2-ml-0 d2-mr btn-text can-hover"
        type="text"
        @click="dialogVisible = true">
        <am-icon :name="icon"/>
      </Button>
    </Tooltip>
  
    <Modal
      :closable="true"
      :scrollable="true"
      :mask-closable="false"
      v-model="dialogVisible"
      width="700"
      title="主题">
      <d2-theme-list :list="themes"></d2-theme-list>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>

<script>
  import themeList from './theme-list/index.vue'
  export default {
    props:{
      icon:{
        type:String,
        default:'iconzhuanshi'
      },
      themes: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    components: {
      'd2-theme-list': themeList
    },
    data () {
      return {
        dialogVisible: false
      }
    }
  }
</script>
