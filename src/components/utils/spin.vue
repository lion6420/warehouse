<template>
  <div :class="$style.wrapper">
    <div
      :class="$style.loader"
      :style="{width: spin_width, height: spin_height, 'font-size': tip_size}"
      :id="'spin_' + _uid.toString()">
    </div>
    <div :class="$style.tip" :style="{'font-size': tip_size}">{{tip}}</div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      require: false,
      default() {
        return 'normal'
      }
    },
    tip: {
      type: String,
      require: false,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      spin_width: '40px',
      spin_height: '40px',
      tip_size: '16px',
    }
  },
  created() {
    this.spin_size()
  },
  methods: {
    spin_size() {
      switch (this.size) {
        case 'small':
          this.spin_width = '10px'
          this.spin_height = '10px'
          this.tip_size = '16px'
          break
        case 'large':
          this.spin_width = '40px'
          this.spin_height = '40px'
          this.tip_size = '44px'
          break
        default:
          this.spin_width = '20px'
          this.spin_height = '20px'
          this.tip_size = '24px'
          break
      }
    },
  }
}
</script>

<style lang="scss" module>
@import './common/general.scss';
.wrapper {
  @include block(100%);
  text-align: center;
  display: flex;
  justify-content: center;
  .tip {
    font-family: $aphabet;
    margin: auto 0px auto 0px;
  }
  .loader {
    border: 3px solid #fff;
    border-radius: 50%;
    border-top: 3px solid #3498db;
    animation: spin 1s linear infinite;
    margin-right:10px;
    margin: auto 10px auto 0px;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
}
</style>