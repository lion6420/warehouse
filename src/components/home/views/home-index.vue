<template>
  <div :class="$style.home">
    <p style="text-align: center">Welcome to homepage !</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" module>
@import '@/styles/general/general.module.scss';
.home {
  @include block(100%);
}
</style>