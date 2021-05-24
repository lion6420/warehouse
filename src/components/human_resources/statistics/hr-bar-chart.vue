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
    label: {
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
          grid: {
            top:40,
            bottom: 40,
          },
          xAxis: {
              type: 'category',
              axisLine: {
                lineStyle: {
                  color: 'rgb(230, 230, 230)'
                }
              },
              data: []
          },
          yAxis: {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: 'rgb(230, 230, 230)'
                }
              },
              splitLine: {
                show: false,
              }
          },
          series: [{
              data: [],
              type: 'bar',
              showBackground: true,
              barWidth: 40,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
          }]
      }

      option.xAxis.data = this.label
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