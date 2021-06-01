<template>
  <div :class="$style.header">
    <div :class="$style.header_left" style="padding:0px">
      <img style="position:relative;top:15px" src="@/assets/logo.png" width="30px" height="30px"/>
    </div>
    <div :class="$style.header_left" style="margin-left: -10px;margin-right: 20px;color:#fff">
      <span style="font-size:22px;position:relative;top:-2px; font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">Warehouse</span>
    </div>
    <div :class="$style.router_link">
      <router-link :class="$style.router_link_text" to="/achievement/dashboard" :style="active === 'achievement'?{color: '#fff', 'font-weight': 'bold'}:{}">達成狀態</router-link>
    </div>
    <div :class="$style.router_link">
      <router-link :class="$style.router_link_text" to="/hr/statistics" :style="active === 'hr'?{color: '#fff', 'font-weight': 'bold'}:{}">人力管理</router-link>
    </div>
    <div :class="$style.router_link">
      <router-link :class="$style.router_link_text" to="/material/list" :style="active === 'material'?{color: '#fff', 'font-weight': 'bold'}:{}">物料訊息</router-link>
    </div>

    <div v-if="isLoggedIn" :class="$style.header_right">
      <mobile-sidebar :class="$style.mobile_sidebar"></mobile-sidebar>
    </div>
    <div v-if="isLoggedIn" :class="$style.header_right">
      <div :class="$style.signout" @click="logout">
        <span :class="$style.signout_label">Sign out</span>
        <span :class="$style.signout_icon" class="fas fa-sign-out-alt"></span>
      </div>
    </div>
  </div>
</template>

<script>
import mobileSidebar from './mobile-sidebar'
export default {
  components: {
    mobileSidebar
  },
  data() {
    return {
      active: '',
    }
  },
  created() {
    this.activeCheck()
  },
  methods: {
    activeCheck() {
      const path = window.location.pathname
      const regex_dashboard = new RegExp('/achievement')
      const regex_human_resources = new RegExp('/hr')
      const regex_material = new RegExp('/material')
      const regex_stock_efficiency = new RegExp('/stock_efficiency')
      if (regex_dashboard.test(path)) {
        this.active = 'achievement'
      }
      else if (regex_human_resources.test(path)) {
        this.active = 'hr'
      }
      else if (regex_material.test(path)) {
        this.active = 'material'
      }
      else if (regex_stock_efficiency.test(path)) {
        this.active = 'stock_efficiency'
      }
      else {
        this.active = ''
      }
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  },
  watch: {
    "$route.path": function() {
      this.activeCheck()
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.header {
  @include block(100%, 60px);
  font-family: Microsoft JhengHei;
  background-color: var(--bg-color-snd);
  position: fixed;
  top:0px;
  z-index: 1;
  box-shadow: 0 2px 5px -2px #000000;
  .header_left {
    float: left;
    padding: 18px;
    margin-left:15px;
    font-size: 18px;
  }
  .header_right {
    float: right;
    color: var(--text-color);
  }
  .header_right:hover {
    color: var(--text-color-hover);
  }

  // link
  .router_link {
    float: left;
    padding: 18px;
    margin-left:15px;
    font-size: 18px;
  }
  .router_link_text {
    text-decoration: none;
    color: var(--text-color);
  }
  .router_link_text:hover {
    text-decoration: none;
    color: var(--text-color-hover);
  }

  // right
  .expand_bar {
    font-size:25px;
    padding:15px;
    margin-right:10px;
    cursor: pointer;
  }
  .signout {
    cursor: pointer;
    .signout_label {
      font-weight: bold;
      position:relative;
      top:-2px;
    }
    .signout_icon {
      font-size:25px;
      padding:15px;
      margin-right:10px;
    }
  }
  .mobile_sidebar {
    display: none;
  }
}

@media screen and (max-width: 800px) {
  .header {
    .router_link {
      display: none;
    }
    .signout_label {
      display: none;
    }
    .mobile_sidebar {
      display: block;
    }
  }
}
</style>