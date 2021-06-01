<template>
  <div id="app" :class="$style.app">
    <div :class="$style.header">
      <headbar></headbar>
    </div>
    <div :class="$style.body">
      <div :class="$style.sidebar" v-if="isLoggedIn">
        <sidebar :menu_type="menu_type" v-if="menu_type !== 'achievement'"></sidebar>
      </div>
      <div :class="$style.content" :style="{'margin-left': isLoggedIn ? (menu_type === 'achievement' ? '0px':''):'0px'}">
        <router-view></router-view>
      </div>
      <order-cart v-if="isLoggedIn" :class="$style.order_cart"></order-cart>
    </div>
    <mobile-footer :class="$style.mobileFooter"></mobile-footer>
  </div>
</template>

<script>
import headbar from '@/components/views/header'
import sidebar from '@/components/views/sidebar'
import mobileFooter from '@/components/views/mobile-footer'
import orderCart from '@/components/material/order_cart/order-cart-index'

export default {
  name: 'App',
  components: {
    headbar,
    sidebar,
    orderCart,
    mobileFooter
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
      const regex_human_resources = new RegExp('/hr')
      const regex_material = new RegExp('/material')
      if (regex_achieve.test(path)) {
        this.menu_type = 'achievement'
      }
      else if (regex_human_resources.test(path)) {
        this.menu_type = 'hr'
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
      position: fixed;
      bottom: 0px;
    }
    .content {
      @include block(100%);
      overflow: hidden;
      margin-top:60px;
      margin-left: 220px;
    }
    .order_cart {
      margin-bottom: 40px;
    }
  }
  .mobileFooter {
    max-height: 0px;
  }
}

@media screen and (max-width:800px) {
  .app {
    .body {
      .sidebar {
        display:none;
      }
      .content {
        margin-left:0px;
      }
    }
    .mobileFooter {
      max-height: 45px;
      transition: max-height 0.2s linear;
    }
  }
}
body {
  background-color: var(--bg-color) !important;
  margin: 0px;
}
</style>