<template>
  <div :class="$style.header">
    <div :class="$style.header_left" style="padding:0px">
      <img style="position:relative;top:15px" src="@/assets/logo.png" width="30px" height="30px"/>
    </div>
    <div :class="$style.header_left" style="margin-left: -10px;margin-right: 20px;color:#fff">
      <span style="font-size:20px;position:relative;top:-2px">Warehouse</span>
    </div>
    <div :class="$style.header_left">
      <router-link :class="$style.router_link" to="/achievement/dashboard" :style="active === 'dashboard'?{color: '#fff'}:{}">達成總覽</router-link>
    </div>
    <div :class="$style.header_left">
      <router-link :class="$style.router_link" to="/dashboard">人力管理</router-link>
    </div>
    <div :class="$style.header_left">
      <router-link :class="$style.router_link" to="/material/list">物料訊息</router-link>
    </div>

    <div v-if="isLoggedIn" :class="$style.header_right">
      <div style="cursor:pointer" @click="logout">
        <span style="font-weight: bold;position:relative;top:-2px">Sign out</span>
        <span class="fas fa-sign-out-alt" style="font-size:25px;padding:15px;margin-right:10px"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      const regex_dashboard = new RegExp('/dashboard')
      if (regex_dashboard.test(path)) {
        this.active = 'dashboard'
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
  .router_link {
    text-decoration: none;
    color: var(--text-color);
  }
  .router_link:hover {
    text-decoration: none;
    color: var(--text-color-hover);
  }
}
</style>