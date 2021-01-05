<template>
  <div id="app" :class="$style.app">
    <div :class="$style.sidebar"></div>
    <div :class="$style.body">
      <div :class="$style.header"></div>
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
  @include block(100%, $background-color: #000); //width: 100%, height: auto;
  margin: 0px;
  .sidebar {
    @include block(160px, 100%, $background-color: #000);
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
      margin-left: 160px;
      margin-top: -10px;
    }
    .content {
      @include border();
      margin-left: 160px;
      background-color: #000;
    }
  }
}
</style>
