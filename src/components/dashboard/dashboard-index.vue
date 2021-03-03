<template>
  <div :class="$style.dashboard">
    <div :class="$style.index_card">
      <dashboard-index-card :class="$style.card" :amount="97.56" color="purple" label="電子倉" :trend="[11, 2, 3]"></dashboard-index-card>
      <dashboard-index-card :class="$style.card" :amount="98.03" color="azure" label="成品倉" :trend="[11, 2, 3]"></dashboard-index-card>
      <dashboard-index-card :class="$style.card" :amount="90.01" color="yellow" label="半成品倉" :trend="[11, 2, 3]"></dashboard-index-card>
      <dashboard-index-card :class="$style.card" :amount="91.22" color="red" label="收貨倉" :trend="[11, 2, 3]"></dashboard-index-card>
    </div>

    <div :class="$style.trend">
      <dashboard-trend></dashboard-trend>
    </div>

    <div :class="$style.table">
      <dashboard-table></dashboard-table>
    </div>
  </div>
</template>

<script>
import dashboardIndexCard from './dashbaord-index-card'
import dashboardTrend from './dashboard-trend'
import dashboardTable from './dashboard-table'
export default {
  components: {
    dashboardIndexCard,
    dashboardTrend,
    dashboardTable
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.dashboard {
  @include block(96%);
  margin:auto;
  margin-bottom: 40px;
  margin-top:20px;
  .index_card {
    @include block(100%);
    display: flex;
    justify-content: space-between;
    .card {
      @include block(24%);
    }
  }
  .trend {
    @include block(100%);
    margin-top:20px;
  }
  .table {
    @include block(100%);
    margin-top:20px;
  }
}

</style>