<template>
  <div id="app" :class="$style.app">
    <div :class="$style.header">
      <headbar></headbar>
    </div>
    <div :class="$style.body">
      <div :class="$style.sidebar" v-if="show_sidebar">
        <sidebar :menu_type="menu_type"></sidebar>
      </div>
      <div :class="$style.content" :style="{'margin-left': show_sidebar ? '200px':'0px'}">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import headbar from '@/components/views/header'
import sidebar from '@/components/views/sidebar'
export default {
  name: 'App',
  components: {
    headbar,
    sidebar,
  },
  data() {
    return {
      show_sidebar: true,
      menu_type: '',
    }
  },
  created() {
    this.showSidebarCheck()
  },
  methods: {
    showSidebarCheck() {
      let path = window.location.pathname
      if (path.split('/')[1] == 'login') this.show_sidebar = false
      else this.show_sidebar = true
    },
    getMenuType() {
      let path = window.location.pathname
      const regex_achieve = new RegExp('/achievement')
      const regex_material = new RegExp('/material')
      if (regex_achieve.test(path)) {
        this.menu_type = 'achievement'
      }
      else if (regex_material.test(path)) {
        this.menu_type = 'material'
      }
    }
  },
  watch: {
    "$route.path": function() {
      this.showSidebarCheck()
      this.getMenuType()
    }
  }
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
    overflow: hidden;
    flex-wrap: wrap;
    .sidebar {
      @include block(200px, 100%);
      box-shadow: 1px 1px 5px 1px rgb(39, 39, 39);
      position: fixed;
      bottom: 0px;
    }
    .content {
      @include block(100%);
      margin-top:60px;
    }
  }
}
body {
  background-color: var(--bg-color);
  margin: 0px;
}
</style>