<template>
  <div :class="$style.wrapper">
    <div :class="$style.header">
      <div :class="$style.title">
        <div>Achievement Trend</div>
        <div style="font-size: 16px;color:rgb(129, 129, 129)">November 2021</div>
      </div>
      <div :class="$style.operator">
        <div :class="$style.operator_day" :style="active === 'day' ? activeStyle:{}" @click="active = 'day'">Day</div>
        <div :class="$style.operator_month" :style="active === 'month' ? activeStyle:{}" @click="active = 'month'">Month</div>
        <div :class="$style.operator_year" :style="active === 'year' ? activeStyle:{}" @click="active = 'year'">Year</div>
      </div>
    </div>
    <div :class="$style.chart" :id="'trend_' + _uid.toString()"></div>
    <hr style="border-color:#5f5f5f;margin:0px"/>
    <div :class="$style.dashboard_rate">
      <dashboard-rate></dashboard-rate>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import dashboardRate from './dashboard-rate'
export default {
  components: {
    dashboardRate,
  },
  data() {
    return {
      active: 'day',
      activeStyle: {
        'background-color': 'rgb(89, 93, 117)',
        'color':'#fff',
      },
    }
  },
  mounted() {
    this.plotTrendChart()
  },
  methods: {
    plotTrendChart() {
      const option = this.getTrendChartOption()
      var DOM = document.getElementById('trend_' + this._uid.toString())
      let trendChart = echarts.init(DOM)
      trendChart.setOption(option)

      this.resizeHandler = function() {
        trendChart.resize()
      }
      window.addEventListener('resize', this.resizeHandler)
    },
    getTrendChartOption() {
      let option = {
        grid: {
          left: 60,
          right: 50,
          borderColor: 'rgb(129, 129, 129)'
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7'],
            axisLabel: {
              color: 'rgb(129, 129, 129)',
              fontSize: 16,
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
              color: 'rgb(129, 129, 129)'
            },
            splitLine :{    //网格线
              lineStyle:{
                  color: 'rgb(89, 93, 117)'    //设置网格线类型 dotted：虚线   solid:实线
              },
            },
            show:true //隐藏或显示
        },
        series: [{
            name: 'November',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
        }]
      }
      return option
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
  @include block(100%, $radius: 10px);
  background-color: rgb(37, 39, 49);
  box-shadow: 0px 0px 1px 1px rgb(37, 39, 49);
  color: #fff;
  .header {
    display: flex;
    justify-content: space-between;
    .title {
      font-family: $aphabet;
      font-size: 20px;
      padding: 20px;
    }
    .operator {
      @include block(200px);
      display: flex;
      color: rgb(129, 129, 129);
      border: 1px rgb(129, 129, 129);
      margin-top: 20px;
      .operator_day {
        @include block(50px, 30px);
        @include border();
        text-align: center;
        padding:3px 3px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        cursor: pointer;
      }
      .operator_month {
        @include block(50px, 30px);
        @include border();
        text-align: center;
        padding:3px 3px;
        cursor: pointer;
      }
      .operator_year {
        @include block(50px, 30px);
        @include border();
        text-align: center;
        padding:3px 3px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        cursor: pointer;
      }
      .operator_day:hover, .operator_month:hover, .operator_year:hover {
        background-color: rgb(89, 93, 117);
        color:#fff;
      }
    }
  }
  .chart {
    @include block(100%, 400px);
  }
  .dashboard_rate {
    @include block(100%);
  }
}
</style>