<template>
  <div :class="$style.hr_statistics">
    <div :class="$style.statistics_row">
      <div :class="$style.statistics_col">
        <statistics-card label="電子倉" :amount="103" :rate="38"></statistics-card>
      </div>
      <div :class="$style.statistics_col">
        <statistics-card label="成品倉" :amount="93" :rate="32"></statistics-card>
      </div>
      <div :class="$style.statistics_col">
        <statistics-card label="半成品倉" :amount="54" :rate="30"></statistics-card>
      </div>
    </div>

    <div :class="$style.statistics_row">
      <div :class="$style.statistics_col">
        <statistics-card label="電子倉" :amount="103" :rate="38"></statistics-card>
      </div>
      <div :class="$style.statistics_col">
        <statistics-card label="成品倉" :amount="93" :rate="32"></statistics-card>
      </div>
      <div :class="$style.statistics_col">
        <statistics-card label="半成品倉" :amount="54" :rate="30"></statistics-card>
      </div>
    </div>
  </div>
</template>

<script>
import statisticsCard from './statistics-card'
export default {
  components: {
    statisticsCard,
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.hr_statistics {
  @include block(98%, 800px);
  margin: 20px auto;
  .statistics_row {
    @include block(100%);
    display: flex;
    justify-content: space-around;
    margin: 10px 0px;
    .statistics_col {
      @include block(33%);
    }
  }
}
</style>