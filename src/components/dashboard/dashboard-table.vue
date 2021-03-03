<template>
  <div :class="$style.wrapper">
    <div :class="$style.title">
      <div>Achievement Rank</div>
      <div style="font-size: 16px;color:rgb(129, 129, 129)">November 2021</div>
    </div>
    <t-table
      :class="$style.table"
      :columns="headers"
      :data="tableData"
      headerBackgroundColor=""
      :bordered="false"
      :rowHover="false"
      headerTextAlign="center"
      headerColor="#AFAFAF"
      borderColor="#4B4B4B">
      <template slot="WHS" slot-scope="scope">
        <div style="font-weight: bold">{{scope.data.WHS[0]}}</div>
        <div style="color:#AEAEAE;font-size: 10px">{{scope.data.WHS[1]}}</div>
      </template>
      <template slot="achievement" slot-scope="scope">
        <div style="display:flex;justify-content:space-between">
          <div style="color: #AFAFAF;font-size: 15px">未達成件數: {{scope.data.unachieveAmount}}</div>
          <div>{{scope.data.achievement + '%'}}</div>
        </div>
        <div>
          <percentage :percentage="scope.data.achievement" :color="percentageColor[scope.data.index%4]"></percentage>
        </div>
      </template>
    </t-table>
  </div>
</template>

<script>
import percentage from '@/components/utils/percentage'
import tTable from '@/components/utils/table/table'
export default {
  components: {
    tTable,
    percentage,
  },
  data() {
    return {
      percentageColor: ['#D69721', '#4D94BB', '#C45857', '#0E9A36'],
      headers: [
        {prop: 'WHS', label: '倉庫', style: {width: '150px'}},
        {prop: 'AREA', label: '區域', style: {width: '150px'}},
        {prop: 'achievement', label: '達成率', style: {width: '300px'}},
        {prop: 'amount', label: '員工人數 (人)'},
        {prop: 'overTime_avg', label: '平均超時 (min)'},
      ],
      tableData: [
        {
          index: 0,
          WHS: ['電子倉I', '員工A'],
          AREA: 'A棟',
          achievement: 98,
          unachieveAmount: 4,
          amount: 147,
          overTime_avg: 148,
        },
        {
          index: 1,
          WHS: ['電子倉II', '員工B'],
          AREA: 'B棟',
          achievement: 97,
          unachieveAmount: 6,
          amount: 131,
          overTime_avg: 201,
        },
        {
          index: 2,
          WHS: ['成品倉I', '員工C'],
          AREA: 'A棟',
          achievement: 96,
          unachieveAmount: 5,
          amount: 121,
          overTime_avg: 125,
        },
        {
          index: 3,
          WHS: ['成品倉II', '員工D'],
          AREA: 'B棟',
          achievement: 92,
          unachieveAmount: 10,
          amount: 145,
          overTime_avg: 142,
        },
        {
          index: 4,
          WHS: ['半成品倉', '員工E'],
          AREA: 'A棟',
          achievement: 91,
          unachieveAmount: 11,
          amount: 135,
          overTime_avg: 128,
        },
        {
          index: 5,
          WHS: ['收貨倉', '員工F'],
          AREA: 'A棟',
          achievement: 85,
          unachieveAmount: 2,
          amount: 11,
          overTime_avg: 120,
        }
      ]
    }
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.wrapper {
  @include block(100%, $radius: 10px);
  color: #fff;
  text-align: center;
  background-color: rgb(37, 39, 49);
  box-shadow: 0px 0px 1px 1px rgb(37, 39, 49);
  .title {
    font-family: $aphabet;
    font-size: 20px;
    padding: 20px;
    text-align: left;
  }
  .table {
    @include block(95%);
    margin: auto;
    padding: 10px 0px;
  }
}

</style>