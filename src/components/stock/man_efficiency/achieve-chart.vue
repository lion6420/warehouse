<template>
  <div :class="$style.wrapper">
    <div id="achieveChart" :class="$style.achieveChart"></div>
    <div :class="$style.description">
      <div :class="$style.description_upperRow">
        <div :class="$style.achieve">
          <div :class="$style.amount" v-if="!loading_achieved && !loading_unjudged_completed_enough && !loading_unjudged_completed_unenough" style="color: green">
            {{achieved + unjudged_completed}}
          </div>
          <a-spin :class="$style.spin" v-if="loading_achieved || loading_unjudged_completed_enough || loading_unjudged_completed_unenough">
            <a-icon slot="indicator" type="loading" style="font-size: 24px;" spin />
          </a-spin>
          <div :class="$style.label">按時達成</div>
        </div>
        <div :class="$style.first">
          <div :class="$style.amount" v-if="!loading_first" style="color: orange">{{first}}</div>
          <a-spin :class="$style.spin" v-if="loading_first">
            <a-icon slot="indicator" type="loading" style="font-size: 24px;" spin />
          </a-spin>
          <div :class="$style.label">無可用庫存</div>
        </div>
      </div>
      <div :class="$style.description_lowerRow">
        <div :class="$style.second">
          <div :class="$style.amount" v-if="!loading_second" style="color: red">{{second}}</div>
          <a-spin :class="$style.spin" v-if="loading_second">
            <a-icon slot="indicator" type="loading" style="font-size: 24px;" spin />
          </a-spin>
          <div :class="$style.label">倉庫未備料</div>
        </div>
        <div :class="$style.unjudged">
          <div :class="$style.amount" v-if="!loading_unjudged_uncompleted_unenough && !loading_unjudged_uncompleted_enough" style="color: #8C8C8C">
            {{unjudged_uncompleted}}
          </div>
          <a-spin :class="$style.spin" v-if="loading_unjudged_uncompleted_unenough || loading_unjudged_uncompleted_enough">
            <a-icon slot="indicator" type="loading" style="font-size: 24px;" spin />
          </a-spin>
          <div :class="$style.label">未判定</div>
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
          left: 0,
          data: ['按時達成', '倉庫缺料', '未備料'],
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
        
        new echarts.graphic.LinearGradient(1, .5, 0, .7, [
          {
            offset: 0,
            color: '#c2352c' //未完成 red
          },{
            offset: 1,
            color: '#6f0700'
          }]),
        new echarts.graphic.LinearGradient(1, .7, .6, .1, [
          {
            offset: 0,
            color: '#AAAAAA' //未判定 black
          },{
            offset: 1,
            color: '#AAAAAA'
          }]),
      ],
      defaultColor: [
        new echarts.graphic.LinearGradient(1, .7, .6, .1, [
          {
            offset: 0,
            color: '#AAAAAA' //未判定 black
          },{
            offset: 1,
            color: '#AAAAAA'
          }]),
      ],
      achieved: 0,
      first: 0,
      second: 0,
      unjudged_uncompleted: 0,
      unjudged_completed: 0,
      readyCount: 0,

      loading_achieved: false,
      loading_first: false,
      loading_second: false,
      loading_unjudged_completed_unenough: false,
      loading_unjudged_completed_enough: false,
      loading_unjudged_uncompleted_unenough: false,
      loading_unjudged_uncompleted_enough: false,
    }
  },
  methods: {
    plot() {
      var chartConstructor = echarts.init(document.getElementById('achieveChart'))
      var rate = ((this.achieved + this.unjudged_completed + this.first)*100 / (this.achieved + this.first + this.second + this.unjudged_completed)).toFixed(1)
      if ((this.achieved + this.first + this.second + this.unjudged_completed) === 0) {
        rate = 0
      }
      this.optionPie.title.text = '{rate|' + rate + '%}\n{label|達成率}'
      this.optionPie.series[0].data = [
        {value:this.achieved + this.unjudged_completed, name: '按時達成'},
        {value:this.second, name: '倉庫未備料'},
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
      if (this.readyCount === 7) {
        this.plot()
        this.$emit('releaseEMP_disable', 'achieved')
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
  .achieveChart {
    @include block(60%, 300px);
  }
  .description {
    @include block(40%, 250px);
    margin-top:50px;
    .description_upperRow {
      display: flex;
      .achieve {
        @include block(80%, 80px);
        margin: auto;
      }
      .first {
        @include block(80%, 80px);
        margin: auto;
      }
    }
    .description_lowerRow {
      display: flex;
      .second {
        @include block(80%, 80px);
        margin: auto;
      }
      .unjudged {
        @include block(80%, 80px);
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
    .achieveChart {
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
        color: var(--text-color-light);
        margin-top: -10px;
      }
    }
  }
}
</style>