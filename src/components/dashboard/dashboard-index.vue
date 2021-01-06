<template>
  <div :class="$style.dashboard">
    <div :class="$style.index_card">
      <dashboard-index-card :amount="97.56" color="purple" label="電子倉I" :trend="[11, 2, 3]"></dashboard-index-card>
      <dashboard-index-card :amount="98.03" color="azure" label="電子倉II" :trend="[11, 2, 3]"></dashboard-index-card>
      <dashboard-index-card :amount="90.01" color="yellow" label="成品倉I" :trend="[11, 2, 3]"></dashboard-index-card>
      <dashboard-index-card :amount="91.22" color="red" label="成品倉II" :trend="[11, 2, 3]"></dashboard-index-card>
    </div>
    <div :class="$style.trend">
      <dashboard-trend></dashboard-trend>
    </div>
  </div>
</template>

<script>
import dashboardIndexCard from './dashbaord-index-card'
import dashboardTrend from './dashboard-trend'
export default {
  components: {
    dashboardIndexCard,
    dashboardTrend
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general/general.module.scss';
.dashboard {
  @include block(96%);
  margin:auto;
  margin-bottom: 40px;
  .index_card {
    @include block(100%);
    display: flex;
    justify-content: space-between;
    margin-top:20px;
  }
  .trend {
    @include block(100%);
    margin-top:20px;
  }
}

</style>