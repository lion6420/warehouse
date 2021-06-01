<template>
  <div :class="$style.wrapper">
    <t-table
      :columns="headers"
      :data="tableData_show"
      :loading="loading"
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
    <a-pagination
      v-model="currentPage"
      :total="tableData.length"
      :page-size="pageSize"
      @change="changePage"
      style="margin-top:20px;margin-bottom:10px;text-align: center;"
    />
    <div style="height:10px"></div>
  </div>
</template>

<script>
import tTable from '@/components/utils/table/table'
import api from '@/api/material/index'
export default {
  components: {
    tTable,
  },
  props: {
    PN: {
      type: String,
      require: true,
    },
    applicant: {
      type: String,
      require: true
    },
    search_signal: {
      type: Boolean,
      require: true
    }
  },
  created() {
    this.getData()
  },
  data() {
    return {
      headers: [
        {label: '單號', prop: 'SN', style: {'text-align': 'center'}},
        {label: '料號', prop: 'PN', style: {'text-align': 'center', 'min-width': '100px'}},
        {label: '申請數量', prop: 'amount', style: {'text-align': 'center', 'min-width': '80px'}},
        {label: '申請人', prop: 'applicant', style: {'text-align': 'center', 'min-width': '80px'}},
        {label: '倉庫位置', prop: 'position', style: {'text-align': 'center', 'min-width': '80px'}},
        {label: '申請時間', prop: 'applied_time', style: {'text-align': 'center', 'min-width': '120px'}},
        {label: '簽核狀態', prop: 'status', style: {'text-align': 'center', 'min-width': '80px'}},
      ],
      loading: false,
      tableData: [],
      tableData_show: [],

      currentPage: 1,
      pageSize: 10,
    }
  },
  methods: {
    async getData() {
      var self = this
      this.loading = true
      this.tableData = []
      this.tableData_show = []
      await api.get_material_applied_history(this.PN, this.applicant)
      .then(
        function resolved(value) {
          self.tableData = value
          self.changePage(1)
        }
      )
      .catch(function error(error) {
        console.log(error)
        self.tableData = []
        self.changePage(1)
      })
      this.loading = false
    },
    changePage(page) {
      let start, end
      start = (page-1)*this.pageSize
      end = start + this.pageSize
      this.tableData_show = this.tableData.slice(start, end)
    }
  },
  watch: {
    search_signal() {
      if (this.search_signal) {
        this.getData()
        this.$emit('handle_search_signal')
      }
    }
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.wrapper {
  @include block(100%);
  box-shadow: 0px 0px 10px 1px rgb(26, 24, 24);
  background-color: var(--bg-color-snd);
  font-family: var(--font-family);
  color: #fff;
  max-height: 500px;
}

</style>