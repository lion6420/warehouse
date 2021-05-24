<template>
  <div :class="$style.wrapper">
    <div :class="$style.card_top">
      <div :class="$style.title">
        <div :class="$style.title_label">{{label}}</div>
        <div :class="$style.amount">{{amount}}<span style="font-size:15px">人</span></div>
      </div>
      <div :class="$style.pie_chart">
        <rate-chart :rate="rate"></rate-chart>
      </div>
    </div>
    <hr style="width: 100%;border:1px #454545 solid"/>
    <div :class="$style.card_bottom">
      <div :class="$style.chart_switch">
        <a-radio-group v-model="chart_type" @change="onChange">
          <a-radio value="chain" :class="$style.switch_text">
            人力趨勢
          </a-radio>
          <a-radio value="hr" :class="$style.switch_text">
            當前人力
          </a-radio>
          <a-radio value="work" :class="$style.switch_text">
            工作分布
          </a-radio>
        </a-radio-group>
      </div>
      <div :class="$style.chart_area">
        <chain-chart v-if="chart_type === 'chain'"></chain-chart>
        <bar-chart v-if="chart_type === 'hr'" :data="[3, 20, 5, 33]" :label="['管理職', '倉管員', '帳務', '其他工作']"></bar-chart>
        <pie-chart v-if="chart_type === 'work'" :data="work_data"></pie-chart>
      </div>
    </div>
  </div>
</template>

<script>
import rateChart from './hr-rate-chart'
import chainChart from './hr-chain-chart'
import barChart from './hr-bar-chart'
import pieChart from './hr-pie-chart'
export default {
  components: {
    rateChart,
    chainChart,
    barChart,
    pieChart,
  },
  props: {
    label: {
      type: String,
      require: true,
      default() {
        return ''
      }
    },
    amount: {
      type: Number,
      require: true,
      default() {
        return 0
      }
    },
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
      chart_type: 'chain',
      slide: 0,

      work_data: [
        {value: 100, name: '入庫'},
        {value: 120, name: '盤點'},
        {value: 160, name: '出庫'},
        {value: 20, name: '其他'},
      ]
    }
  },
  methods: {
    onChange() {
      switch (this.chart_type) {
        case 'chain':
          this.chart_type = 'chain'
          break
        case 'hr':
          this.chart_type = 'hr'
          break
        case 'work':
          this.chart_type = 'work'
          break
      }
    }
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.wrapper {
  @include block(100%, $radius:5px);
  background-color: var(--bg-color-snd);
  .card_top {
    @include block(100%, 90px);
    display: flex;
    .title {
      @include block(50%, 120px);
      .title_label {
        color: var(--text-color);
        font-family: $zh;
        font-size:25px;
        text-align: center;
        padding: 5px 0px;
      }
      .amount {
        color: var(--text-color-hover);
        font-size: 35px;
        font-family: $aphabet;
        text-align: center;
      }
    }
    .pie_chart {
      @include block(50%, 120px);
      margin-top: 5px;
    }
  }
  .card_bottom {
    @include block(100%);
    .chart_switch {
      @include block(100%, 35px);
      margin-top:-5px;
      margin-left: 20px;
      .switch_text {
        color: var(--text-color);
      }
    }
    .chart_area {
      @include block(100%, 220px);
      display: flex;
    }
  }
}
</style>