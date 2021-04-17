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
      <chain-chart></chain-chart>
    </div>
  </div>
</template>

<script>
import rateChart from './hr-rate-chart'
import chainChart from './hr-chain-chart'
export default {
  components: {
    rateChart,
    chainChart,
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
    @include block(100%, 220px);
  }
}
</style>