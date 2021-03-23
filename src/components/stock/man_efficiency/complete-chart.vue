<template>
  <div :class="$style.wrapper">
    <div id="completeChart" :class="$style.completeChart"></div>
    <div :class="$style.description">
      <div :class="$style.description_upperRow">
        <div :class="$style.complete">
          <div :class="$style.amount" v-if="!loading_completed" style="color: green">{{completed}}</div>
          <a-spin :class="$style.spin" v-if="loading_completed">
            <a-icon slot="indicator" type="loading" style="font-size: 24px;" spin />
          </a-spin>
          <div :class="$style.label">完成</div>
        </div>
        <div :class="$style.uncomplete_first">
          <div :class="$style.amount" v-if="!loading_uncompleted_first" style="color: orange">{{uncompleted_first}}</div>
          <a-spin :class="$style.spin" v-if="loading_uncompleted_first">
            <a-icon slot="indicator" type="loading" style="font-size: 24px;" spin />
          </a-spin>
          <div :class="$style.label">未完成<br/>(無可用庫存)</div>
        </div>
      </div>
      <div :class="$style.description_lowerRow">
        <div :class="$style.uncomplete_second">
          <div :class="$style.amount" v-if="!loading_uncompleted_second" style="color: red">{{uncompleted_second}}</div>
          <a-spin :class="$style.spin" v-if="loading_uncompleted_second">
            <a-icon slot="indicator" type="loading" style="font-size: 24px;" spin />
          </a-spin>
          <div :class="$style.label">未完成<br/>(倉庫未備料)</div>
        </div>
        <div :class="$style.uncomplete_unjudged">
          <div :class="$style.amount" v-if="!loading_uncompleted_unjudged" style="color: #8C8C8C">{{uncompleted_unjudged}}</div>
          <a-spin :class="$style.spin" v-if="loading_uncompleted_unjudged">
            <a-icon slot="indicator" type="loading" style="font-size: 24px;" spin />
          </a-spin>
          <div :class="$style.label">未完成<br/>(未判定)</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    site: {
      type: String,
      require: true,
    },
    BU: {
      type: String,
      require: true,
    },
    WHS_TYPE: {
      type: String,
      require: true,
    },
    WHS_AREA: {
      type: String,
      require: true,
    },
    EMP_ID: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      optionPie: {
        title: {
          text: '',
          left: 'center',
          top: 'center',
          textStyle: {
            rich: {
              label: {
                  color: '#8A8A8A',
                  fontSize: 20,
              },
              rate: {
                  color: '#000',
                  fontSize: 55,
                  fontFamily: 'Arial',
                  fontWeight: 'bold'
              },
            }
          }
        },
        legend: {
          show: true,
          orient: 'vertical',
          left: 10,
          data: ['完成', '未完成'],
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            radius: ['65%', '85%'],
            startAngle: 0,
            label: {
              show: false,
            },
            color: [],
            data: []
          }
        ]
      },
      chartColor: [
        new echarts.graphic.LinearGradient(1, .7, .6, .1, [
          {
            offset: 0,
            color: '#09B094' //完成 green
          },{
            offset: 1,
            color: '#015648'
          }]),
        new echarts.graphic.LinearGradient(1, .5, 0, .7, [
          {
            offset: 0,
            color: '#FA9B2A' //未完成 orange
          },{
            offset: 1,
            color: '#FBBE77'
          }]),
      ],
      defaultColor: [
        new echarts.graphic.LinearGradient(1, .7, .6, .1, [
          {
            offset: 0,
            color: '#D3D3D3' //未判定 black
          },{
            offset: 1,
            color: '#D2D2D2'
          }]),
      ],
      completed: 0,
      uncompleted_first: 0,
      uncompleted_second: 0,
      uncompleted_unjudged: 0,
      readyCount: 0,

      loading_completed: false,
      loading_uncompleted_first: false,
      loading_uncompleted_second: false,
      loading_uncompleted_unjudged: false,
    }
  },
  methods: {
    plot() {
      var chartConstructor = echarts.init(document.getElementById('completeChart'))
      var rate = (this.completed*100 / (this.completed + this.uncompleted_first + this.uncompleted_second)).toFixed(1)
      if ((this.completed + this.uncompleted_first + this.uncompleted_second) === 0) {
        rate = 0
      }
      this.optionPie.title.text = '{rate|' + rate + '%}\n{label|完成率}'
      this.optionPie.series[0].data = [
        {value: this.completed, name: '完成'},
        {value: this.uncompleted_first + this.uncompleted_second, name: '未完成'}
      ]
      //color
      if (rate === 0) this.optionPie.series[0].color = this.defaultColor
      else this.optionPie.series[0].color = this.chartColor

      chartConstructor.setOption(this.optionPie)
      this.resizeHandler = function () {
        chartConstructor.resize()
      }
      window.addEventListener('resize', this.resizeHandler)
    }
  },
  watch: {
    EMP_ID() {
      this.readyCount = 0
      this.getData()
    },
    readyCount() {
      if (this.readyCount === 6) {
        this.plot()
        this.$emit('releaseEMP_disable', 'completed')
      }
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
  @include block(100%);
  display: flex;
  .completeChart {
    @include block(60%, 300px);
  }
  .description {
    @include block(40%, 160px);
    display: flex;
    flex-direction: column;
    margin-top:50px;
    .description_upperRow {
      display: flex;
      .complete {
        @include block(80%, 100px);
        margin: auto;
      }
      .uncomplete_first {
        @include block(80%, 100px);
        margin: auto;
      }
    }
    .description_lowerRow {
      display: flex;
      .uncomplete_second {
        @include block(80%, 100px);
        margin: auto;
      }
      .uncomplete_unjudged {
        @include block(80%, 100px);
        margin: auto;
      }
    }
    .amount {
      font-size: 35px;
      font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
    }
    .spin {
      font-size: 35px;
      margin-top:-8px;
      margin-bottom:9px;
    }
    .label {
      font-size: 18px;
      font-family: Microsoft JhengHei;
      font-weight: bold;
      color: var(--text-color-light);
      margin-top: -10px;
    }
  }
}
@media screen and (max-width: 850px) {
  .wrapper {
    .completeChart {
      @include block(60%, 300px);
    }
    .description {
      .amount {
        font-size: 30px;
        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
      }
      .spin {
        font-size: 30px;
        margin-top:-8px;
        margin-bottom:9px;
      }
      .label {
        font-size: 14px;
        font-family: Microsoft JhengHei;
        font-weight: bold;
        color: rgb(138, 138, 138);
        margin-top: -10px;
      }
    }
  }
}
</style>