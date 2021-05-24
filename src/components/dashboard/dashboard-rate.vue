<template>
  <div :class="$style.wrapper">
    <div :class="$style.rate_block">
      <div :class="$style.label">收貨</div>
      <div :class="$style.data">1245 Amount (90%)</div>
      <percentage :class="$style.percentage" :percentage="90"></percentage>
    </div>
    <div :class="$style.rate_block">
      <div :class="$style.label">發料</div>
      <div :class="$style.data">15453 Amount (87%)</div>
      <percentage :class="$style.percentage" :percentage="87" color="#D69721"></percentage>
    </div>
    <div :class="$style.rate_block">
      <div :class="$style.label">盤點</div>
      <div :class="$style.data">14512 Amount (76%)</div>
      <percentage :class="$style.percentage" :percentage="76" color="#4D94BB"></percentage>
    </div>
    <div :class="$style.rate_block">
      <div :class="$style.label">出勤</div>
      <div :class="$style.data">52 People (100%)</div>
      <percentage :class="$style.percentage" :percentage="100" color="#C45857"></percentage>
    </div>
  </div>
</template>

<script>
import percentage from '@/components/utils/percentage'
export default {
  components: {
    percentage,
  },
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.wrapper {
  @include block(100%);
  display: flex;
  justify-content: space-around;
  background-color: rgb(43, 46, 58);
  .rate_block {
    @include block(20%, 75px);
    margin-top:25px;
    .label {
      font-family: $zh;
      color: rgb(177, 177, 177);
      text-align: center;
    }
    .data {
      font-family: $aphabet;
      color: #fff;
      text-align: center;
    }
    .percentage {
      margin: auto;
      margin-top:10px;
    }
  }
}

@media screen and (max-width: 992px) {
  .wrapper {
    flex-wrap: wrap;
    .rate_block {
      @include block(40%, 75px);
      margin-top:25px;
      .label {
        font-family: $zh;
        color: rgb(177, 177, 177);
        text-align: center;
      }
      .data {
        font-family: $aphabet;
        color: #fff;
        text-align: center;
      }
      .percentage {
        margin: auto;
        margin-top:10px;
      }
    }
  }
}
</style>