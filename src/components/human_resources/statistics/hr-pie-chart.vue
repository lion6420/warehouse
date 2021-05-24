<template>
  <div :class="$style.wrapper" :id="'bar_chart_' + _uid.toString()"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    data: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      chartConstructor: null,
    }
  },
  mounted() {
    this.plot()
  },
  methods: {
    getOption() {
      let option = {
          tooltip: {
              trigger: 'item'
          },
          series: [
              {
                  type: 'pie',
                  label: {
                    position: 'inside',
                  },
                  radius: '85%',
                  data: [],
              }
          ]
      }

      option.series[0].data = this.data
      return option
    },

    plot() {
      let DOM = document.getElementById('bar_chart_' + this._uid.toString())
      this.chartConstructor = echarts.init(DOM)
      let option = this.getOption()
      this.chartConstructor.setOption(option)
      
      window.addEventListener('resize', this.resizeHandler)
    },

    resizeHandler() {
      this.chartConstructor.resize()
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.wrapper {
  @include block(100%, 220px);
}

</style>