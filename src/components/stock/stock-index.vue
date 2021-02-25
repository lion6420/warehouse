<template>
  <div :class="$style.stock">
    <stock-realtime-search v-if="type === 'realtime'"></stock-realtime-search>
  </div>
</template>

<script>
import stockRealtimeSearch from './stock-realtime-search'
export default {
  components: {
    stockRealtimeSearch,
  },
  data() {
    return {
      type: ''
    }
  },
  created() {
    const path_arr = window.location.pathname.split('/')
    if (path_arr[path_arr.length-1] === 'realtime') {
      this.type = 'realtime'
    }
    else if (path_arr[path_arr.length-1] === 'history') {
      this.type = 'history'
    }
    else {
      this.type = 'efficiency'
    }
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.stock {
  @include block(96%);
  margin:auto;
  margin-bottom: 40px;
  margin-top:20px;
}
</style>