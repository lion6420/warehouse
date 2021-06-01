<template>
  <div :class="$style.hr_statistics">
    <div :class="$style.statistics_row">
      <div :class="$style.statistics_col">
        <statistics-card label="電子倉I" :amount="103" :rate="38"></statistics-card>
      </div>
      <div :class="$style.statistics_col">
        <statistics-card label="電子倉II" :amount="93" :rate="32"></statistics-card>
      </div>
      <div :class="$style.statistics_col">
        <statistics-card label="成品倉I" :amount="54" :rate="30"></statistics-card>
      </div>
      <div :class="$style.statistics_col">
        <statistics-card label="成品倉II" :amount="103" :rate="38"></statistics-card>
      </div>
    </div>

    <div :class="$style.statistics_row">
      <div :class="$style.statistics_col">
        <statistics-card label="半成品倉I" :amount="103" :rate="38"></statistics-card>
      </div>
      <div :class="$style.statistics_col">
        <statistics-card label="半成品倉II" :amount="93" :rate="32"></statistics-card>
      </div>
      <div :class="$style.statistics_col">
        <statistics-card label="收貨倉I" :amount="54" :rate="30"></statistics-card>
      </div>
      <div :class="$style.statistics_col">
        <statistics-card label="收貨倉II" :amount="54" :rate="30"></statistics-card>
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
  @include block(98%);
  margin: 20px auto;
  .statistics_row {
    @include block(100%);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 10px 0px;
    .statistics_col {
      @include block(24%);
    }
  }
}

@media screen and (max-width: 1200px) {
  .hr_statistics {
    @include block(98%);
    margin: 20px auto;
    .statistics_row {
      @include block(100%);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .statistics_col {
        @include block(49%);
        margin-bottom: 10px;
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .hr_statistics {
    @include block(98%);
    margin: 20px auto 50px auto;
    .statistics_row {
      @include block(100%);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .statistics_col {
        @include block(98%);
        margin-bottom: 10px;
      }
    }
  }
}
</style>