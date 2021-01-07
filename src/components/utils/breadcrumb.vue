<template>
  <div :class="$style.breadcrumb">
    <div :class="$style.item" v-for="(item,i_index) in menus" :key="i_index">
      <span>{{item.label}}</span>
      <span v-if="i_index !== (menus.length-1)" style="position: relative;left:10px;font-weight: bold">/</span>
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
.breadcrumb {
  .item {
    float: left;
    color: rgb(180, 180, 180);
    margin: 10px;
  }
}
</style>