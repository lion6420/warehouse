<template>
  <div id="app" :class="$style.app">
    <div :class="$style.sidebar"></div>
    <div :class="$style.body">
      <div :class="$style.header"></div>
      <div :class="$style.breadcrumb"></div>
      <div :class="$style.content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss" module>
@import '@/styles/general/general.module.scss';
.app {
  @include block(100%); //width: 100%, height: auto;
  .sidebar {
    @include block(250px, 100%);
    @include border();
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 1;
  }
  .body {
    @include block(100%);
    .header {
      height: 60px;
      @include border();
      margin-left: 250px;
    }
    .breadcrumb {
      height: 60px;
      @include border();
      margin-left: 250px;
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