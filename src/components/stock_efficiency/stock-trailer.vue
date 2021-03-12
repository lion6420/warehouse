<template>
  <div :class="$style.wrapper">
    <span>{{label}}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      require: false,
      default() {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.wrapper {
  @include block(100%, 21px);
  @include border();
  color:#fff;
  text-align:center;
}
</style>