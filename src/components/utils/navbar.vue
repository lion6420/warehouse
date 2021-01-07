<template>
  <div :class="$style.navbar">
    <div :class="$style.toggle">
      <span class="fas fa-bars"></span>
    </div>
    <div v-for="(item,i_index) in menus" :key="i_index">
      <router-link :class="$style.item" :to="item.link" :style="item.style">{{item.label}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menus: {
      type: Array,
      require: true,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general/general.module.scss';
.navbar {
  @include block(100%);
  .toggle {
    color: rgb(180, 180, 180);
    float: left;
    position: relative;
    top: 12px;
    left: 20px;
    font-size: 20px;
    cursor: pointer;
  }
  .item {
    color: rgb(180, 180, 180);
    text-decoration: none;
    font-family: $aphabet;
    float: left;
    margin-left: 60px;
  }
  .toggle:hover, .item:hover {
    color: rgb(221, 221, 221);
  }
}

</style>