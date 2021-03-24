<template>
  <div id="app" :class="$style.app">
    <div :class="$style.header">
      <headbar></headbar>
    </div>
    <div :class="$style.body">
      <div :class="$style.sidebar" v-if="isLoggedIn">
        <sidebar :menu_type="menu_type"></sidebar>
      </div>
      <div :class="$style.content" :style="{'margin-left': isLoggedIn ? '200px':'0px'}">
        <router-view></router-view>
      </div>
      <order-cart v-if="isLoggedIn"></order-cart>
    </div>
  </div>
</template>

<script>
import headbar from '@/components/views/header'
import sidebar from '@/components/views/sidebar'
import orderCart from '@/components/material/order_cart/order-cart-index'

export default {
  name: 'App',
  components: {
    headbar,
    sidebar,
    orderCart,
  },
  data() {
    return {
      menu_type: '',
    }
  },
  created() {
    this.getMenuType()
  },
  methods: {
    getMenuType() {
      let path = window.location.pathname
      const regex_achieve = new RegExp('/achievement')
      const regex_human_resources = new RegExp('/human_resources')
      const regex_material = new RegExp('/material')
      if (regex_achieve.test(path)) {
        this.menu_type = 'achievement'
      }
      else if (regex_human_resources.test(path)) {
        this.menu_type = 'human_resources'
      }
      else if (regex_material.test(path)) {
        this.menu_type = 'material'
      }
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  },
  watch: {
    "$route.path": function() {
      this.getMenuType()
    }
  },
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.app {
  @include block(100%); //width: 100%, height: auto;
  .header {
    height: 60px;
    position: fixed;
    z-index: 4;
  }
  .body {
    @include block(100%);
    display: flex;
    flex-wrap: wrap;
    .sidebar {
      @include block(200px, 100%);
      box-shadow: 1px 1px 5px 1px rgb(39, 39, 39);
      position: fixed;
      bottom: 0px;
    }
    .content {
      @include block(100%);
      overflow: hidden;
      margin-top:60px;
    }
  }
}
body {
  background-color: var(--bg-color) !important;
  margin: 0px;
}
</style>