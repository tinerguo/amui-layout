<template>
  <i class="icon iconfont " :class="`${name}`" aria-hidden="true"></i>
</template>

<script>
import './fonts/iconfont.css'
export default {
  name: 'am-icon',
  props: {
    name: {
      type: String,
      required: false
    }
  }
}
</script>
