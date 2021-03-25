<template>
  <div :class="$style.wrapper">
    <div :class="$style.hr_list">
      <div :class="$style.contentTitle">
        <div style="width: 10%"></div>
        <div style="width: 80%;font-size: 30px">人力資料維護</div>
        <a-button type="primary" style="margin-top:20px;margin-right: 10px" :download="'人力資料表.xlsx'" :href="getDownloadURL()">
          <span>資料下載</span>
          <span class="fas fa-download" style="position:relative; left:5px"></span>
        </a-button>
        <a-button :disabled="transferDisabled" type="primary" style="margin-top:20px;" @click="transferCheck = true">
          <span>資料拋轉</span>
          <span class="fas fa-cloud-upload-alt" style="position:relative; left:5px"></span>
        </a-button>
      </div>

      <t-table
        :columns="headers"
        :data="tableData"
        :editable="true"
        :class="$style.table"
        :loading="loading"
        maxHeight="600px"
        headerBackgroundColor=""
        :bordered="false"
        :rowHover="false"
        headerTextAlign="center"
        headerColor="rgb(184, 184, 184)"
        borderColor="#4B4B4B">
        <template slot="header" slot-scope="scope">
          <span
            v-if="propList.includes(scope.header.prop)"
            :style="{color: getFilterColStyle(scope.header.prop)}">
            {{scope.header.label}}
            <!--filter popout-->
            <a-popconfirm 
              placement="bottom"
              ok-text="確定"
              cancel-text="清除"
              @confirm="onTableFilter"
              @cancel="onTableFilterReset(scope.header.prop)"
              :destroyTooltipOnHide="true"
              style="background-color: transparent; border:none">
              <template slot="title">
                <multi-select v-if="scope.header.prop === 'EMP_NO'" v-model="selectedEMP_NO" :options="tableFilter['EMP_NO']" width="150px"></multi-select>
                <multi-select v-if="scope.header.prop === 'EMP_NAME'" v-model="selectedEMP_NAME" :options="tableFilter['EMP_NAME']" width="150px"></multi-select>
                <multi-select v-if="scope.header.prop === 'BU'" v-model="selectedBU" :options="tableFilter['BU']" width="150px"></multi-select>
                <multi-select v-if="scope.header.prop === 'WHS_TYPE'" v-model="selectedWHS_TYPE" :options="tableFilter['WHS_TYPE']" width="150px"></multi-select>
                <multi-select v-if="scope.header.prop === 'AREA'" v-model="selectedAREA" :options="tableFilter['AREA']" width="150px"></multi-select>
                <multi-select v-if="scope.header.prop === 'CLASS'" v-model="selectedCLASS" :options="tableFilter['CLASS']" width="150px"></multi-select>
                <multi-select v-if="scope.header.prop === 'JOB_RANK'" v-model="selectedJOB_RANK" :options="tableFilter['JOB_RANK']" width="150px"></multi-select>
                <multi-select v-if="scope.header.prop === 'JOB_NAME'" v-model="selectedJOB_NAME" :options="tableFilter['JOB_NAME']" width="150px"></multi-select>
              </template>
              <span :class="$style.table_searchButton"><span class="fas fa-search"></span></span>
            </a-popconfirm>
            <!--filter popout-->
          </span>
        </template>
        <template slot="POST_TYPE" slot-scope="scope">
          <single-select v-if="scope.data.editable" :options="optionsPOST_TYPE" width="80px" v-model="form.POST_TYPE"></single-select>
          <span v-else>{{scope.data['POST_TYPE']}}</span>
        </template>
        <template slot="BU" slot-scope="scope">
          <single-select v-if="scope.data.editable" :options="optionsBU" width="100px" v-model="form.BU"></single-select>
          <span v-else>{{scope.data['BU']}}</span>
        </template>
        <template slot="WHS_TYPE" slot-scope="scope">
          <single-select v-if="scope.data.editable" :options="optionsWHS_TYPE" width="120px" v-model="form.WHS_TYPE">
            <template slot="empty" v-if="form.BU === ''">
              <span>請先選擇事業處</span>
            </template>
          </single-select>
          <span v-else>
            <span v-if="scope.data['WHS_TYPE'] === ''" style="color:#E1B100">請維護</span>
            <span v-else>{{scope.data['WHS_TYPE']}}</span>
          </span>
        </template>
        <template slot="AREA" slot-scope="scope">
          <single-select v-if="scope.data.editable" :options="optionsAREA" width="160px" v-model="form.AREA">
            <template slot="empty" v-if="form.WHS_TYPE === ''">
              <span>請選擇倉庫類型</span>
            </template>
          </single-select>
          <span v-else>
            <span v-if="scope.data['AREA'] === ''" style="color:#E1B100">請維護</span>
            <span v-else>{{scope.data['AREA']}}</span>
          </span>
        </template>
        <template slot="CLASS" slot-scope="scope">
          <single-select v-if="scope.data.editable" :options="optionsCLASS" width="100px" v-model="form.CLASS"></single-select>
          <span v-else>
            <span v-if="scope.data['CLASS'] === ''" style="color:#E1B100">請維護</span>
            <span v-else>{{scope.data['CLASS']}}</span>
          </span>
        </template>
        <template slot="JOB_RANK" slot-scope="scope">
          <single-select v-if="scope.data.editable" :options="optionsJOB_RANK" width="180px" v-model="form.JOB_RANK">
            <template slot="empty" v-if="form.JOB_RANK === ''">
              <span>請選擇倉庫位置</span>
            </template>
          </single-select>
          <span v-else>
            <span v-if="scope.data['JOB_RANK'] === ''" style="color:#E1B100">請維護</span>
            <span v-else>{{scope.data['JOB_RANK']}}</span>
          </span>
        </template>
        <template slot="JOB_NAME" slot-scope="scope">
          <single-select v-if="scope.data.editable" :options="optionsJOB_NAME" width="160px" v-model="form.JOB_NAME">
            <template slot="empty" v-if="form.JOB_RANK === ''">
              <span>請先選擇崗位一階</span>
            </template>
          </single-select>
          <span v-else>
            <span v-if="scope.data['JOB_NAME'] === ''" style="color:#E1B100">請維護</span>
            <span v-else>{{scope.data['JOB_NAME']}}</span>
          </span>
        </template>
        <template slot="operation" slot-scope="scope">
          <a-button v-if="scope.data.editable" shape="circle" type="primary" @click="editConfirm(scope)"><span class="fas fa-check"></span></a-button>
          <a-button v-if="scope.data.editable" shape="circle" type="danger" @click="editCancel(scope)" style="margin-left:10px"><span class="fas fa-times"></span></a-button>
          <a-button v-else shape="circle" type="primary" @click="editTable(scope)" :disabled="editState"><span class="fas fa-edit"></span></a-button>
        </template>
        <template slot="empty_text">
          <span style="color:#8C8C8C">查無資料</span>
        </template>
      </t-table>
    </div>
    <a-pagination v-model="currentPage" :total="tableData_show.length" @change="changePage" style="margin-top:10px;margin-bottom:10px;text-align: center;" />
  </div>
</template>

<script>
import tTable from '@/components/utils/table/table'
import {JSONtoXLSX} from '@/utils/excel/excel'
import multiSelect from '@/components/utils/multi-select'
import singleSelect from '@/components/utils/single-select'

export default {
  components: {
    tTable,
    multiSelect,
    singleSelect
  },
  data() {
    return {
      //api parameters
      site: '',
      BU_name: '',

      //loading
      loading: false,
      loading_BU: false,

      //pagination
      currentPage: 1,
      pageSize: 6,

      //transfer check
      transferCheck: false,
      transferDisabled: false,

      //edit table
      editState: false,
      form: {
        EMP_NO: '',
        EMP_NAME: '',
        POST_TYPE: '',
        DEPARTMENT: '',
        SOURCE: '',
        SITE: '',
        BU: '',
        WHS_TYPE: '',
        AREA: '',
        CLASS: '',
        JOB_RANK: '',
        JOB_NAME: '',
      },
      whs_job_map:{},
      optionsPOST_TYPE: ['倉庫'],
      optionsBU: [],
      optionsSOURCE: [
        '本組織',
      ],
      optionsWHS_TYPE: [],
      optionsAREA: [],
      optionsCLASS: [
        '白班',
        '晚班',
      ],
      optionsJOB_RANK: [],
      optionsJOB_NAME: [],

      //table header，table data
      headers: [
        {prop: 'EMP_NO', label: '工號', style: {'font-size': '13px', 'min-width': '88px'}},
        {prop: 'EMP_NAME', label: '姓名', style: {'font-size': '13px', 'min-width': '88px'}},
        {prop: 'SOURCE', label: '人力來源', style: {'font-size': '13px', 'min-width': '88px'}},
        {prop: 'DEPARTMENT', label: '部門名稱', style: {'font-size': '13px', 'min-width': '88px'}},
        {prop: 'WHS_TYPE', label: '倉庫類型', style: {'font-size': '13px', 'min-width': '108px'}},
        {prop: 'AREA', label: '倉庫位置', style: {'font-size': '13px', 'min-width': '108px'}},
        {prop: 'CLASS', label: '班別', style: {'font-size': '13px', 'min-width': '88px'}},
        {prop: 'JOB_NAME', label: '崗位', style: {'font-size': '13px', 'min-width': '88px'}},
        {prop: 'TIME', label: '歸類日期', style: {'font-size': '13px', 'min-width': '88px'}},
        {prop: 'operation', label: '操作', style: {'font-size': '13px', 'min-width': '108px'}},
      ],
      rawData: [],
      tableData_show: [],
      tableData: [
      {
        EMP_NO: 'A123451',
        EMP_NAME: '員工A',
        SOURCE: '正職',
        DEPARTMENT: '部門A',
        WHS_TYPE: '成品倉',
        AREA: 'A棟',
        CLASS: '日班',
        JOB_NAME: '崗位B',
        TIME: '2021-03-21',
      },
      {
        EMP_NO: 'A123452',
        EMP_NAME: '員工A',
        SOURCE: '正職',
        DEPARTMENT: '部門A',
        WHS_TYPE: '成品倉',
        AREA: 'A棟',
        CLASS: '日班',
        JOB_NAME: '崗位B',
        TIME: '2021-03-21',
      },
      {
        EMP_NO: 'A123453',
        EMP_NAME: '員工A',
        SOURCE: '正職',
        DEPARTMENT: '部門A',
        WHS_TYPE: '成品倉',
        AREA: 'A棟',
        CLASS: '日班',
        JOB_NAME: '崗位B',
        TIME: '2021-03-21',
      },],

      //table filter
      tableFilter: {},
      propList: [
        'EMP_NO',
        'EMP_NAME',
        'WHS_TYPE',
        'AREA',
        'CLASS',
        'JOB_NAME',
      ],
      selectedEMP_NO: {},
      selectedEMP_NAME: {},
      selectedBU: {},
      selectedWHS_TYPE: {},
      selectedAREA: {},
      selectedCLASS: {},
      selectedJOB_RANK: {},
      selectedJOB_NAME: {},
    }
  },
  created() {
    this.Initialization()
  },
  methods: {
    Initialization() {
      const reqParamsList = window.location.pathname.split('/').slice(1)
      this.site = reqParamsList[0]
      this.BU_name = reqParamsList[1]
    },
    //reset form
    resetForm() {
      this.form.EMP_NO = ''
      this.form.EMP_NAME = ''
      this.form.DEPARTMENT = ''
      this.form.SOURCE = ''
      this.form.WHS_TYPE = ''
      this.form.AREA = ''
      this.form.CLASS = ''
      this.form.JOB_NAME = ''
    },
    //table cell manipulate
    editTable(scope) {
      this.resetForm()
      this.editState = true
      const key = scope.data.EMP_NO
      const newData = [...this.tableData]
      var target
      for (var i=0; i<newData.length; i++) {
        if (newData[i].EMP_NO === key) target = newData[i]
      }
      if (target) {
        target.editable = true
        this.tableData = newData
      }
      this.form.EMP_NO = target['EMP_NO']
      this.form.EMP_NAME = target['EMP_NAME']
      this.form.DEPARTMENT = target['DEPARTMENT']
      this.form.SOURCE = target['SOURCE']
      this.form.WHS_TYPE = target['WHS_TYPE']
      this.form.AREA = target['AREA']
      this.form.CLASS = target['CLASS']
      this.form.JOB_NAME = target['JOB_NAME']
    },
    async editConfirm(scope) {
      const data = {
        RID: scope.data.RID,
        WHS_TYPE: this.form.WHS_TYPE,
        AREA: this.form.AREA,
        CLASS: this.form.CLASS,
        JOB_NAME: this.form.JOB_NAME,
        TIME: scope.data.TIME
      }
      return data
    },
    //資料拋轉
    editCancel(scope) {
      this.resetForm()
      this.editState = false
      const key = scope.data.EMP_NO
      const newData = [...this.tableData]
      var target
      for (var i=0; i<newData.length; i++) {
        if (newData[i].EMP_NO === key) target = newData[i]
      }
      if (target) {
        target.editable = false
        this.tableData = newData
      }
    },

    //filter and pagination
    onTableFilter() {
      if (Object.keys(this.selectedEMP_NO).length === 0 &&
          Object.keys(this.selectedEMP_NAME).length === 0 &&
          Object.keys(this.selectedWHS_TYPE).length === 0 &&
          Object.keys(this.selectedAREA).length === 0 &&
          Object.keys(this.selectedCLASS).length === 0 &&
          Object.keys(this.selectedJOB_NAME).length === 0) {
        this.tableData_show = this.rawData
      }
      else {
        this.tableData_show = []
        for (let i=0; i<this.rawData.length; i++) {
          if (this.selectedEMP_NO[this.rawData[i]['EMP_NO']]) {
            this.tableData_show.push(this.rawData[i])
          }
          else if (this.selectedEMP_NAME[this.rawData[i]['EMP_NAME']]) {
            this.tableData_show.push(this.rawData[i])
          }
          else if (this.selectedWHS_TYPE[this.rawData[i]['WHS_TYPE']]) {
            this.tableData_show.push(this.rawData[i])
          }
          else if (this.selectedAREA[this.rawData[i]['AREA']]) {
            this.tableData_show.push(this.rawData[i])
          }
          else if (this.selectedCLASS[this.rawData[i]['CLASS']]) {
            this.tableData_show.push(this.rawData[i])
          }
          else if (this.selectedJOB_NAME[this.rawData[i]['JOB_NAME']]) {
            this.tableData_show.push(this.rawData[i])
          }
        }
      }
      this.changePage(1)
    },
    onTableFilterReset(prop) {
      switch(prop) {
        case 'EMP_NO':
          this.selectedEMP_NO = {}
          break
        case 'EMP_NAME':
          this.selectedEMP_NAME = {}
          break
        case 'WHS_TYPE':
          this.selectedWHS_TYPE = {}
          break
        case 'AREA':
          this.selectedAREA = {}
          break
        case 'CLASS':
          this.selectedCLASS = {}
          break
        case 'JOB_NAME':
          this.selectedJOB_NAME = {}
          break
      }
      this.onTableFilter()
    },
    changePage(page) {
      this.currentPage = page
      const start = (page-1)*this.pageSize
      const end = start + this.pageSize
      this.tableData = this.tableData_show.slice(start, end)
    },

    //table download
    getDownloadURL() {
      var header = {
        RID: '序號',
        EMP_NO:'工號',
        EMP_NAME: '姓名',
        DEPARTMENT: '部門名稱',
        SOURCE: '人力來源',
        WHS_TYPE: '倉庫類型',
        AREA: '倉庫位置',
        CLASS: '班別',
        JOB_NAME: '崗位',
        TIME: '更新時間',
      }
      var tableData_to_download = [...this.rawData]
      return JSONtoXLSX(tableData_to_download, '人力資料表', header)
    },
    //style
    getFilterColStyle(prop) {
      switch(prop) {
        case 'EMP_NO':
          if (Object.keys(this.selectedEMP_NO).length > 0) return '#0E4CFF'
          break
        case 'EMP_NAME':
          if (Object.keys(this.selectedEMP_NAME).length > 0) return '#0E4CFF'
          break
        case 'WHS_TYPE':
          if (Object.keys(this.selectedWHS_TYPE).length > 0) return '#0E4CFF'
          break
        case 'AREA':
          if (Object.keys(this.selectedAREA).length > 0) return '#0E4CFF'
          break
        case 'CLASS':
          if (Object.keys(this.selectedCLASS).length > 0) return '#0E4CFF'
          break
        case 'JOB_NAME':
          if (Object.keys(this.selectedJOB_NAME).length > 0) return '#0E4CFF'
          break
      }
    },
  },
  watch: {
    BU() {
      if (this.form.BU) this.optionsWHS_TYPE = Object.keys(this.whs_job_map[this.form.BU])
      else this.optionsWHS_TYPE = []
      if (this.BU === '') {
        this.form.WHS_TYPE = ''
        this.form.AREA = ''
        this.form.JOB_NAME = ''
      }
    },
    WHS_TYPE() {
      if (this.form.WHS_TYPE) this.optionsAREA = this.whs_job_map[this.form.BU][this.form.WHS_TYPE] ? 
        Object.keys(this.whs_job_map[this.form.BU][this.form.WHS_TYPE]) : []
      else this.optionsAREA = []
      if (this.WHS_TYPE === '') {
        this.form.AREA = ''
        this.form.JOB_NAME = ''
      }
    },
    AREA() {
      if (this.form.AREA) this.optionsJOB_RANK = this.whs_job_map[this.form.BU][this.form.WHS_TYPE][this.form.AREA] ? 
        Object.keys(this.whs_job_map[this.form.BU][this.form.WHS_TYPE][this.form.AREA]) : []
      else this.optionsJOB_RANK = []
      if (this.AREA === '') {
        this.form.JOB_NAME = ''
      }
    },
  },
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.wrapper {
  @include block(98%, $radius: 5px);
  margin: 20px auto 0px auto;
  background-color: var(--bg-color-snd);
  .contentTitle {
    @include block(100%);
    display: flex;
    justify-content: space-between;
    font-family: Microsoft JhengHei;
    font-weight: bold;
    margin-bottom: 5px;
    color: var(--text-color);
    text-align: center;
  }
  .hr_list {
    @include block(95%);
    margin:auto;
    text-align: center;
    .table {
      color: var(--text-color-hover);
    }
  }
  .table_searchButton {
    cursor: pointer;
    font-size:17px;
  }
  .table_searchButton:hover {
    color: rgb(29, 70, 255);
  }
}
</style>