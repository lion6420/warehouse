<template>
  <div :class="$style.card" :style="{width: width, height: height, 'background-image': getColor()}">
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      require: false,
      default() {
        return '200px'
      }
    },
    height: {
      type: String,
      require: false,
      default() {
        return '100px'
      }
    },
    color: {
      type: String,
      require: false,
    }
  },
  methods: {
    getColor() {
      var color
      switch (this.color) {
        case 'purple':
          color = 'linear-gradient(to right, #4630B4, #382597)'
          break
        case 'azure':
          color = 'linear-gradient(to right, #429AD5, #3B91CA)'
          break
        case 'yellow':
          color = 'linear-gradient(to right, #DAA33B, #D69721)'
          break
        case 'red':
          color = 'linear-gradient(to right, #D35A58, #C45857)'
          break
        default:
          color = 'linear-gradient(to right, #7B7B7B , #333333)'
          break
      }
      return color
    }
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general/general.module.scss';
.card {
  @include block(200px, 100px, $radius: 5px);
}

</style>