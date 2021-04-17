<template>
  <div :class="$style.wrapper" :id="'hr_rate_chart_' + _uid.toString()"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    rate: {
      type: Number,
      require: true,
      default() {
        return 0
      }
    }
  },
  data() {
    return {

    }
  },
  mounted() {
    this.plot()
  },
  methods: {
    getOption() {
      let option = {
        title: {
          text: '',
          top:'center',
          left: 'center',
          textStyle: {
            fontSize: 20,
            color: '#AAAAAA'
          }
        },
        series: [
            {
                type: 'pie',
                radius: ['75%', '90%'],
                color: ['#389af4', '#595959'],
                hoverAnimation:false,
                silent:true,
                label: {
                  show:false
                },
                labelLine: {
                  show:false
                },
                data: [],
            },
        ]
      }
      option.title.text = this.rate.toString() + '%'
      option.series[0].data = [{value: this.rate, name: ''}, {value: (100-this.rate), name: ''}]
      return option
    },
    plot() {
      let chartConstructor = echarts.init(document.getElementById('hr_rate_chart_' + this._uid.toString()))
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
  @include block(100%, 90px);
}
</style>