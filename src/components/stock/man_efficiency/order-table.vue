<template>
  <div :class="$style.wrapper" :id="'orderTable_' + _uid.toString()">
    <div :class="$style.orderTable">
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
        <template slot="completeRate" slot-scope="scope">
          {{scope.data['completeRate'] + '%'}}
        </template>
        <template slot="expectLineDownTime" slot-scope="scope">
          <span v-if="tableType === 'uncompleted' && new Date(scope.data['expectLineDownTime']) < new Date()" style="color:red">{{scope.data['expectLineDownTime']}}</span>
          <span v-else>{{scope.data['expectLineDownTime']}}</span>
        </template>
        <template slot="ON_TIME" slot-scope="scope">
          <span v-if="scope.data['ON_TIME'] === '準時'" style="color:green;font-weight:bold">{{scope.data['ON_TIME']}}</span>
          <span v-else-if="scope.data['ON_TIME'] === '超時'" style="color:red;font-weight:bold">{{scope.data['ON_TIME']}}</span>
          <span v-else>{{scope.data['ON_TIME']}}</span>
        </template>
        <template slot="operation" slot-scope="scope">
          <a-button @click="showDetail(scope.data)" style="color:#2676DC">Track
            <span class="fas fa-external-link-alt" style="position:relative;left:5px"></span>
          </a-button>
        </template>
        <template slot="empty_text">
          <span style="color:#8C8C8C">查無資料</span>
        </template>
      </t-table>
      <!-- <a-pagination v-model="currentPage" :total="data.length" @change="pagination" style="margin-top: 10px"></a-pagination> -->
    </div>
  </div>
</template>

<script>
import tTable from '@/components/utils/table/table'
export default {
  components: {
    tTable,
  },
  props: {
    data: {
      type: Array,
      require: true,
    },
    loading: {
      type: Boolean,
      require: true,
    },
    tableType: {
      type: String,
      require: true,
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      headers: [
        {prop: 'PN', label: '料號', style: {'min-width': '100px'}},
        {prop: 'orderNumber', label: '工單號', style: {'min-width': '100px'}},
        {prop: 'completeRate', label: '料號完成率', style: {'min-width': '100px'}},
        {prop: 'lackAmount', label: '缺料數量', style: {'min-width': '100px'}},
        {prop: 'EMP_NAME', label: '姓名', style: {'min-width': '100px'}},
        {prop: 'EMP_ID', label: '工號', style: {'min-width': '100px'}},
        {prop: 'expectLineDownTime', label: '預估停線時間', style: {'min-width': '100px'}},
        {prop: 'reason', label: '缺料原因', style: {'min-width': '100px'}},
        {prop: 'note', label: '作業員維護訊息', style: {'min-width': '120px'}},
        {prop: 'ON_TIME', label: '是否準時', style: {'min-width': '100px'}},
      ],
      tableData: [{
        PN: 'A123456',
        orderNumber: 'B234567',
        completeRate: 98,
        lackAmount: 100,
        EMP_NAME: '員工A',
        EMP_ID: 'Q456673',
        expectLineDownTime: '2021-03-21',
        reason: '',
        note: '',
        ON_TIME: '準時'
      }],
    }
  },
  created() {
    this.pagination(1)
  },
  methods: {
    pagination(page) {
      this.currentPage = page
      var start = (page-1) * this.pageSize
      var end = start + this.pageSize
      this.tableData_show = this.data.slice(start, end)
    },
  },
  watch: {
    data() {
      this.pagination(1)
    },
    loading() {
      if (this.loading) {
        this.tableData_show = []
      }
    }
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.wrapper {
  @include block(100%);
  color: var(--text-color-light);
  .orderTable {
    @include block(100%);
    text-align: center;
  }
}
</style>