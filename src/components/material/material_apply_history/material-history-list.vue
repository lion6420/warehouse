<template>
  <div :class="$style.wrapper">
    <t-table
      :columns="headers"
      :data="tableData"
      headerBackgroundColor=""
      :bordered="false"
      :rowHover="false"
      :borderAround="false"
      headerTextAlign="center"
      headerColor="#AFAFAF"
      borderColor="#4B4B4B">
      <template slot="status" slot-scope="scope">
        <span v-if="scope.data['status'] === '完成'" style="color:#31E936">{{scope.data['status']}}</span>
        <span v-else-if="scope.data['status'] === '駁回'" style="color:red">{{scope.data['status']}}</span>
        <span v-else style="color:#2CBAF5">{{scope.data['status']}}</span>
      </template>
    </t-table>
  </div>
</template>

<script>
import tTable from '@/components/utils/table/table'
export default {
  components: {
    tTable,
  },
  data() {
    return {
      headers: [
        {label: '單號', prop: 'SN', style: {'text-align': 'center'}},
        {label: '料號', prop: 'PN', style: {'text-align': 'center'}},
        {label: '申請數量', prop: 'amount', style: {'text-align': 'center'}},
        {label: '申請人', prop: 'applicant', style: {'text-align': 'center'}},
        {label: '倉庫位置', prop: 'position', style: {'text-align': 'center'}},
        {label: '申請時間', prop: 'applied_time', style: {'text-align': 'center'}},
        {label: '簽核狀態', prop: 'status', style: {'text-align': 'center'}},
      ],
      tableData: [
        {
          SN: 'S20210109003',
          PN: '800-100-230',
          amount: 1050,
          applicant: '員工A',
          position: '倉庫A',
          applied_time: '2021-01-09',
          status: '駁回',
        },
        {
          SN: 'S20210119001',
          PN: '800-100-230',
          amount: 105,
          applicant: '員工B',
          position: '倉庫B',
          applied_time: '2021-01-19',
          status: '完成',
        },
        {
          SN: 'S20210120003',
          PN: '800-100-230',
          amount: 50,
          applicant: '員工C',
          position: '倉庫A',
          applied_time: '2021-01-20',
          status: '完成',
        },
        {
          SN: 'S20210120004',
          PN: '800-100-230',
          amount: 50,
          applicant: '員工C',
          position: '倉庫A',
          applied_time: '2021-01-20',
          status: '完成',
        },
        {
          SN: 'S20210120005',
          PN: '800-100-230',
          amount: 50,
          applicant: '員工C',
          position: '倉庫A',
          applied_time: '2021-01-20',
          status: '完成',
        },
        {
          SN: 'S20210120006',
          PN: '800-100-230',
          amount: 50,
          applicant: '員工C',
          position: '倉庫A',
          applied_time: '2021-01-20',
          status: '完成',
        },
        {
          SN: 'S20210120007',
          PN: '800-100-230',
          amount: 50,
          applicant: '員工C',
          position: '倉庫A',
          applied_time: '2021-01-20',
          status: '完成',
        },
        {
          SN: 'S20210120008',
          PN: '800-100-230',
          amount: 50,
          applicant: '員工C',
          position: '倉庫A',
          applied_time: '2021-01-20',
          status: '完成',
        },
        {
          SN: 'S20210120009',
          PN: '800-100-230',
          amount: 50,
          applicant: '員工C',
          position: '倉庫A',
          applied_time: '2021-01-20',
          status: '完成',
        },
        {
          SN: 'S20210109005',
          PN: '800-100-230',
          amount: 100,
          applicant: '員工D',
          position: '倉庫C',
          applied_time: '2021-02-09',
          status: '進行中',
        },
      ]
    }
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.wrapper {
  @include block(100%, 500px);
  box-shadow: 0px 0px 10px 1px rgb(26, 24, 24);
  background-color: var(--bg-color-snd);
  font-family: var(--font-family);
  color: #fff;
}

</style>