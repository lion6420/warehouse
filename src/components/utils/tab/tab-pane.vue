<template>
  <div :class="$style.tabPane" v-if="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    tabKey: {
      type: String,
      require: true,
    },
    label: {
      type: String,
      require: true,
    }
  },
  computed: {
    isActive() {
      return this.tabKey === this.$parent.value
    }
  }
}
</script>

<style lang="scss" module>
@import '../common/general.scss';
.tabPane {
  @include block(100%);
}

</style>