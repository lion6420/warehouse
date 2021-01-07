<template>
  <div id="app" :class="$style.app">
    <div :class="$style.sidebar"></div>
    <div :class="$style.body">
      <div :class="$style.header">
        <navbar :menus="header_menu"></navbar>
      </div>
      <div :class="$style.breadcrumb_area">
        <breadcrumb style="margin-left:30px" :menus="breadcrumb_menu"></breadcrumb>
      </div>
      <div :class="$style.content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from './components/utils/navbar'
import breadcrumb from './components/utils/breadcrumb'
export default {
  name: 'App',
  components: {
    navbar,
    breadcrumb,
  },
  data() {
    return {
      header_menu:[
        {
          label: 'Dashboard',
          link: '/dashboard',
          style: {
            position: 'relative',
            top: '16px',
            'font-size': '14px',
          }
        },
        {
          label: 'User',
          link: '/dashboard',
          style: {
            position: 'relative',
            top: '16px',
            'font-size': '14px',
          }
        },
        {
          label: 'Setting',
          link: '/dashboard',
          style: {
            position: 'relative',
            top: '16px',
            'font-size': '14px',
          }
        },
      ],
      breadcrumb_menu: [
        {
          label: 'Home',
          link: '/'
        },
        {
          label: 'Dashboad',
          link: '/dashboard',
        },
      ]
    }
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general/general.module.scss';
.app {
  @include block(100%); //width: 100%, height: auto;
  .sidebar {
    @include block(250px, 100%);
    background-color: rgb(52, 52, 65);
    border-right: 1px solid $border-color-grey;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 1;
  }
  .body {
    @include block(100%);
    .header {
      height: 50px;
      margin-left: 250px;
      border-bottom: 1px solid $border-color-grey;
      background-color: rgb(52, 52, 65);
    }
    .breadcrumb_area {
      height: 40px;
      margin-left: 250px;
      background-color: rgb(52, 52, 65);
    }
    .content {
      @include border();
      margin-left: 250px;
    }
  }
}
</style>

<style>
  body {
    background-color: rgb(25, 25, 41);
    margin: 0px;
  }
</style>