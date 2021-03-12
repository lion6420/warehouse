<template>
  <div :class="$style.wrapper"></div>
</template>

<script>
export default {

}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.wrapper {
  @include block(100%, 50px);
  @include border();
}
</style>