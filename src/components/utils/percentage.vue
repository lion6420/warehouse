<template>
  <div :class="$style.percentage" :style="{width: width}">
    <div :class="$style.rate" :style="{width: rate_width.toString() + 'px', height: height, 'background-color': color}"></div>
    <div :class="$style.back" :style="{height: height, 'margin-top': '-' + height}" :id="'back_' + _uid.toString()"></div>
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
      type:String,
      require: false,
      default() {
        return '5px'
      }
    },
    color: {
      type: String,
      require: false,
      default() {
        return '#0E9A36'
      }
    },
    percentage: {
      type: Number,
      require: true,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      rate_width: 0,
    }
  },
  mounted() {
    var self = this
    this.$nextTick(function afterMounted() {
      self.calWidth()
    })
  },
  methods: {
    calWidth() {
      let total_width =  document.getElementById('back_' + this._uid.toString()).offsetWidth
      this.rate_width = total_width * (this.percentage/100)
    }
  }
}
</script>

<style lang="scss" module>
@import './common/general.scss';
.percentage {
  .rate {
    position: relative;
    z-index: 1px;
    border-radius: 10px;
  }
  .back {
    @include block(100%);
    background-color: rgb(151, 151, 151);
    border-radius: 10px;
  }
}
</style>