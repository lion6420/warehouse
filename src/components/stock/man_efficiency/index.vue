<template>
  <div :class="$style.realtimeSearch_byEMP">
  <div style="width: 99%">
    <div :class="$style.title">
      <div>L10電子倉<span v-if="EMP_DICT[selectedID]"> - </span>{{EMP_DICT[selectedID]}}</div>
      <div style="font-size:20px;margin-top:10px;">日期: {{currentTime}}</div>
    </div>
    <hr style="margin-top:5px"/>
    <div :class="$style.filters">
      <div :class="$style.filters_name">
      </div>
      <div :class="$style.filters_type">
      </div>
      <div :class="$style.filters_area">
      </div>
    </div>
    <div :class="$style.chartArea">
      <complete-chart
        :site="site" :BU="BU" :WHS_TYPE="WHS_TYPE" :WHS_AREA="WHS_AREA" :EMP_ID="selectedID"
        @releaseEMP_disable="releaseEMP_disable">
      </complete-chart>
      <achieve-chart
        :site="site" :BU="BU" :WHS_TYPE="WHS_TYPE" :WHS_AREA="WHS_AREA" :EMP_ID="selectedID"
        @releaseEMP_disable="releaseEMP_disable">
      </achieve-chart>
    </div>
    <div :class="$style.tableArea">
      <div :class=$style.tableTitle>
        <div :class="$style.tableTitle_text">未完成列表</div>
      </div>
      <order-table-prepare tableType="uncompleted" :data="tableData_uncompleted" :loading="uncompleted_loading"></order-table-prepare>
      <div :class=$style.tableTitle>
        <div :class="$style.tableTitle_text">已完成列表</div>
      </div>
      <order-table-prepare tableType="completed" :data="tableData_completed" :loading="completed_loading"></order-table-prepare>
    </div>
  </div>
  </div>
</template>

<script>
import completeChart from './complete-chart'
import achieveChart from './achieve-chart'
import orderTablePrepare from './order-table'
export default {
  components: {
    completeChart,
    achieveChart,
    orderTablePrepare,
  },
  data() {
    return {
      currentTime: '',
      site: '',
      BU: '',
      WHS_TYPE: '',
      WHS_AREA: '',
      selectedType: 'prepare',
      typeList: ['prepare', 'stock'],
      areaList: ['D10'],

      ORDER_TYPE_uncompleted: 'all',
      ORDER_TYPE_completed: 'all',

      //table
      tableData_completed: [],
      tableData_uncompleted: [],
      completed_loading: false,
      uncompleted_loading: false,

      //EMP selector
      selectedID: undefined,
      EMP_LIST: [],
      EMP_DICT: {},
      EMP_NAME: '',
      completed_lock: false,
      achieved_lock: false,

      //modal
      modal_PN: null,
      modal_orderNumber: null,
      modal_EMP_NAME: null,
      recordOverTimeAmount: 0, //紀錄超時的數量
      recordOnTimeAmount: 0, //紀錄準時的數量
    }
  },
  created() {
    this.currentTime = new Date().getFullYear().toString() + '-' + (new Date().getMonth()+1).toString() + '-' + (new Date().getDate()).toString()

    //if selected EMP
    this.selectedID = this.$route.params.ID ? this.$route.params.ID:undefined
  },
  methods: {
    releaseEMP_disable(type) {
      if (type === 'completed') {
        this.completed_lock = false
      }
      else {
        this.achieved_lock = false
      }
    },
    findFirstOverTimeRow() {
      for (let i=0; i<this.tableData_track.length; i++) {
        if(this.recordOverTimeAmount === 0 && this.tableData_track[i]['ON_TIME'] === '超時') {
          this.tableData_track[i]['if_first_delay'] = true
          this.recordOverTimeAmount+=1
        }
        else this.tableData_track[i]['if_first_delay'] = false

        if (this.recordOnTimeAmount === 0 && this.tableData_track[i]['ON_TIME'] === '準時') {
          this.tableData_track[i]['if_first_ontime'] = true
          this.recordOnTimeAmount+=1
        }
        else this.tableData_track[i]['if_first_ontime'] = false
      }
    },
  },
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.realtimeSearch_byEMP {
  @include block(95%);
  margin: 5px auto;
  .title {
    @include block(99%);
    font-size: 30px;
    font-family: Microsoft Jhenghei;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    color: var(--text-color);
  }
  .filters {
    @include block(100%);
    display: flex;
    justify-content: flex-end;
    .filters_name {
      margin-right:10px;
    }
    .filters_type {
      margin-right:10px;
    }
    .filters_area {
      margin-right:10px;
    }
  }
  .chartArea {
    @include block(100%);
    display: flex;
    margin-top: 20px;
    .complete-chart {
      width: 50%;
    }
    .achieve-chart {
      width: 50%;
    }
  }
  .tableArea {
    @include block(100%);
    .tableTitle {
      @include block(100%);
      display: flex;
      justify-content: space-between;
      margin: 20px 0px 10px 0px;
      .tableTitle_text {
        font-size: 25px;
        font-weight: bold;
        font-family: Microsoft JhengHei;
        color: var(--text-color);
      }
    }
  }
}
@media screen and (max-width: 850px) {
  .realtimeSearch_byEMP {
    @include block(95%);
    margin:auto;
    .filters {
      justify-content: center;
    }
    .chartArea {
      @include block(100%);
      display: block;
      margin-top: 20px;
      .complete-chart {
        width: 100%;
      }
      .achieve-chart {
        width: 100%;
      }
    }
  }
}
</style>