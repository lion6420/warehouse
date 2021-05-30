<template>
  <div :class="$style.wrapper">
    <div :class="$style.title">
      <span style="position:relative;top:5px;left:10px">Material </span>
      <span style="position:relative;top:5px;left:10px;color:#fff">Catagory {{catagory}}</span>
    </div>
    <div :class="$style.list">
      <t-table
      :class="$style.table"
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
        <template slot="operation" slot-scope="scope">
          <div :class="$style.list_operation">
            <!--add order-->
            <div v-if="!scope.data['ordered']" :class="$style.operation_plus" @click="add_order(scope.data)">
              <t-spin v-if="scope.data['loading']" size="small" style="margin-top:5px;"></t-spin>
              <span class="fas fa-plus" v-if="!scope.data['loading']"></span>
            </div>
            <!--remove order-->
            <div v-else :class="$style.operation_minus" @click="remove_order(scope.data['PN'])">
              <t-spin v-if="scope.data['loading']" size="small" style="margin-top:5px;"></t-spin>
              <span class="fas fa-times-circle" v-if="!scope.data['loading']"></span>
            </div>
            <!--information-->
            <div :class="$style.operation_detail"><span class="fas fa-info-circle"></span></div>
          </div>
        </template>
        <template slot="stock" slot-scope="scope">
          <span :style="{color:scope.data['stock']>scope.data['demand'] ? '#fff':'red'}">{{scope.data['stock']}}</span>
        </template>
      </t-table>
      <a-pagination
        v-model="currentPage"
        :total="tableData.length"
        :page-size="pageSize"
        size="small"
        @change="changePage"
        style="margin-top:20px;margin-bottom:10px;text-align: center;"
      />
    </div>
  </div>
</template>

<script>
import tTable from '@/components/utils/table/table'
import tSpin from '@/components/utils/spin'
import api from '@/api/material/index'
export default {
  components: {
    tTable,
    tSpin
  },
  props: {
    catagory: {
      type: String,
      require: true,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      click_loading: false,
      loading: false,
      headers: [
        {prop: 'PN', label: '料號', style: {'text-align': 'center'}},
        {prop: 'WO', label: '工單號', style: {'text-align': 'center'}},
        {prop: 'time', label: '上線時間', style: {'text-align': 'center'}},
        {prop: 'demand', label: '需求', style: {'text-align': 'center'}},
        {prop: 'stock', label: '庫存', style: {'text-align': 'center'}},
        {prop: 'operation', label: '', style: {'text-align': 'center'}},
      ],
      tableData: [],
      tableData_show: [],
      currentPage: 1,
      pageSize: 10,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      var self = this
      this.loading = true 
      await api.get_material_list(('type' + this.catagory))
      .then(
        function resolved(value) {
          self.tableData = value
          self.check_ordered()
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
    },
    check_ordered() {
      const ordered_pn = this.$store.getters.ordered_pn
      for (let i=0; i<this.tableData.length; i++) {
        if (ordered_pn[this.tableData[i]['PN']]) {
          this.tableData[i]['ordered'] = true
        }
        else {
          this.tableData[i]['ordered'] = false
        }
      }
    },
    add_order(order) {
      var self = this

      // click loading effect
      for (let i=0; i<this.tableData.length; i++) {
        if (order.PN === this.tableData[i]['PN']) {
          this.tableData[i]['loading'] = true
          setTimeout(function loading_timeout() {
            self.tableData[i]['loading'] = false
            self.changePage(1)
          }, 200)
        }
      }

      this.$store.dispatch('add_order', order)
},
    remove_order(PN) {
      var self = this

      // click loading effect
      for (let i=0; i<this.tableData.length; i++) {
        if (PN === this.tableData[i]['PN']) {
          this.tableData[i]['loading'] = true
          setTimeout(function loading_timeout() {
            self.tableData[i]['loading'] = false
            self.changePage(1)
          }, 200)
        }
      }

      this.$store.dispatch('remove_order', PN)
    },
  },
  watch: {
    orderAmount() {
      this.check_ordered()
    }
  },
  computed: {
    orderAmount() {
      return this.$store.getters.orderAmount
    }
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.wrapper {
  @include block(100%, 480px);
  border-radius: 3px;
  box-shadow: 0px 0px 10px 1px rgb(26, 24, 24);
  background-color: var(--bg-color-snd);
  font-family: var(--font-family);
  .title {
    @include block(100%, 40px);
    color: var(--text-color);
    font-size:25px;
    border-bottom: 2px var(--bg-color-trd) solid;
  }
  .list {
    color: #fff;
    .list_operation {
      display:flex;
      justify-content: space-around;
      text-align: center;
      .operation_plus {
        color: $color-green;
        cursor: pointer;
      }
      .operation_minus {
        color: $color-red;
        cursor: pointer;
      }
      .operation_detail {
        cursor: pointer;
      }
    }
  }
}

</style>