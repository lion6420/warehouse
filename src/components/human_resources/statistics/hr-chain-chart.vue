<template>
  <div :class="$style.wrapper" :id="'hr_chain_chart_' + _uid.toString()"></div>
</template>

<script>
import echarts from 'echarts'
export default {
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
        tooltip: {
            trigger: 'axis',
        },
        legend: {
          show:true,
          top:5,
          right:30,
          textStyle: {
            color: 'rgb(230, 230, 230)'
          },
        },
        xAxis: {
          type: 'category',
          data: [],
          boundaryGap: true,
          axisLine: {
            lineStyle: {
              color: 'rgb(230, 230, 230)'
            }
          },
          axisTick: {
            alignWithLabel: true,
            interval: 0,
          },
          axisLabel: {
            interval: 0,
          }
        },
        yAxis: {
          type: 'value',
          name: '人數',
          min: 0,
          axisLine: {
            lineStyle: {
              color: 'rgb(230, 230, 230)'
            }
          },
          splitLine: {
            show: false,
          }
        },
        series: [
          {
            name: '實際人力',
            type: 'line',
            data: [],
            label: {
              show:true,
              position: 'top',
            },
            lineStyle: {
              color: '#38B2E6'
            },
            itemStyle: {
              color: '#38B2E6'
            },
            symbol: 'circle',
            symbolSize: 8,
          },
          {
            name: '工作量',
            type: 'line',
            data: [],
            label: {
              show:true,
              position: 'top',
            },
            lineStyle: {
              color: '#F3612B'
            },
            itemStyle: {
              color: '#F3612B'
            },
            symbol: 'circle',
            symbolSize: 8,
          },
        ]
      }
      option.series[0].data = [103, 102, 101, 105, 106, 108, 101, 102]
      option.series[1].data = [73, 72, 71, 75, 76, 78, 71, 72, 78, 80]
      option.xAxis.data = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月']
      return option
    },
    plot() {
      let chartConstructor = echarts.init(document.getElementById('hr_chain_chart_' + this._uid.toString()))
      let option = this.getOption()
      chartConstructor.setOption(option)

      //window resize event
      this.resizeHandler = function() {
        chartConstructor.resize()
      }
      window.addEventListener('resize', this.resizeHandler)
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