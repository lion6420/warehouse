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
      </div>

      <t-table
        :columns="headers"
        :data="tableData_show"
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
            <a-popover trigger="click" placement="bottom">
              <template slot="content">
                <div style="font-weight:bold">{{scope.header.label + '篩選:'}}</div>
                <div style="display:flex;margin-top:10px">
                  <multi-select v-if="scope.header.prop === 'EMP_NO'" v-model="selectedEMP_NO" :options="tableFilter['EMP_NO']" width="100px"></multi-select>
                  <multi-select v-if="scope.header.prop === 'EMP_NAME'" v-model="selectedEMP_NAME" :options="tableFilter['EMP_NAME']" width="150px"></multi-select>
                  <multi-select v-if="scope.header.prop === 'WHS_TYPE'" v-model="selectedWHS_TYPE" :options="tableFilter['WHS_TYPE']" width="150px"></multi-select>
                  <multi-select v-if="scope.header.prop === 'AREA'" v-model="selectedAREA" :options="tableFilter['AREA']" width="150px"></multi-select>
                  <multi-select v-if="scope.header.prop === 'CLASS'" v-model="selectedCLASS" :options="tableFilter['CLASS']" width="150px"></multi-select>
                  <multi-select v-if="scope.header.prop === 'JOB_NAME'" v-model="selectedJOB_NAME" :options="tableFilter['JOB_NAME']" width="150px"></multi-select>
                  <div :class="$style.filter_btn" style="margin-left:5px"> <!--go filter-->
                    <b-button size="sm" @click="onTableFilter" style="background-color: #1B8FD7">
                      <span class="fas fa-filter" style="font-size: 12px"></span>
                    </b-button>
                  </div>
                  <div :class="$style.filter_btn" style="margin-left :5px;margin-right:10px;"> <!--reset filter-->
                    <b-button size="sm" @click="onTableFilterReset(scope.header.prop)" style="background-color: #17C028">
                      <span class="fas fa-redo-alt" style="font-size: 12px"></span>
                    </b-button>
                  </div>
                </div>
              </template>
              <span class="fas fa-search" :class="$style.table_searchButton" style="position:relative;left:3px"></span>
            </a-popover>
            <!--filter popout-->
          </span>
        </template>

        <template slot="WHS_TYPE" slot-scope="scope">
          <single-select v-if="scope.data.editable" :options="optionsWHS_TYPE" width="120px" v-model="form.WHS_TYPE" :filter_disabled="true" style="margin:auto"></single-select>
          <span v-else>{{scope.data['WHS_TYPE']}}</span>
        </template>
        <template slot="AREA" slot-scope="scope">
          <single-select v-if="scope.data.editable" :options="optionsAREA" width="160px" v-model="form.AREA" :filter_disabled="true" style="margin:auto"></single-select>
          <span v-else>{{scope.data['AREA']}}</span>
        </template>
        <template slot="CLASS" slot-scope="scope">
          <single-select v-if="scope.data.editable" :options="optionsCLASS" width="100px" v-model="form.CLASS" :filter_disabled="true" style="margin:auto"></single-select>
          <span v-else>{{scope.data['CLASS']}}</span>
        </template>
        <template slot="JOB_NAME" slot-scope="scope">
          <single-select v-if="scope.data.editable" :options="optionsJOB_NAME" width="160px" v-model="form.JOB_NAME" :filter_disabled="true" style="margin:auto"></single-select>
          <span v-else>{{scope.data['JOB_NAME']}}</span>
        </template>
        <template slot="operation" slot-scope="scope">
          <a-button v-if="scope.data.editable" shape="circle" type="primary" @click="confirmCheck(scope)"><span class="fas fa-check"></span></a-button>
          <a-button v-if="scope.data.editable" shape="circle" type="danger" @click="editCancel(scope)" style="margin-left:10px"><span class="fas fa-times"></span></a-button>
          <a-button v-else shape="circle" type="primary" @click="editTable(scope)" :disabled="editState"><span class="fas fa-edit"></span></a-button>
        </template>
        <template slot="empty_text">
          <span style="color:#8C8C8C">查無資料</span>
        </template>
      </t-table>
    </div>
    <a-pagination v-model="currentPage" :total="tableData_filter.length" :page-size="pageSize" @change="changePage" style="margin-top:10px;margin-bottom:10px;text-align: center;" />
  </div>
</template>

<script>
import tTable from '@/components/utils/table/table'
import {JSONtoXLSX} from '@/utils/excel/excel'
import multiSelect from '@/components/utils/multi-select'
import singleSelect from '@/components/utils/single-select'
import api from '@/api/human_resources/index'

export default {
  components: {
    tTable,
    multiSelect,
    singleSelect
  },
  data() {
    return {
      //loading
      loading: false,

      //pagination
      currentPage: 1,
      pageSize: 8,

      //transfer check
      transferCheck: false,
      transferDisabled: false,

      //edit table
      editState: false,
      form: {
        EMP_NO: '',
        EMP_NAME: '',
        DEPARTMENT: '',
        SOURCE: '',
        WHS_TYPE: '',
        AREA: '',
        CLASS: '',
        JOB_NAME: '',
      },

      tableFilter: {
        EMP_NO: [],
        EMP_NAME: [],
        WHS_TYPE: [],
        AREA: [],
        CLASS: [],
        JOB_NAME: [],
      },

      optionsEMP_NO: [],
      optionsEMP_NAME: [],
      optionsWHS_TYPE: ['電子倉I', '電子倉II', '成品倉I', '成品倉II'],
      optionsAREA: ['A棟'],
      optionsCLASS: [
        '白班',
        '晚班',
      ],
      optionsJOB_NAME: ['崗位A','崗位B','崗位C','崗位D','崗位E'],

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

      tableData_filter: [],
      tableData_show: [],
      tableData: [],

      //table filter
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
      selectedWHS_TYPE: {},
      selectedAREA: {},
      selectedCLASS: {},
      selectedJOB_NAME: {},
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      var self = this
      this.loading = true
      await api.get_current_hr()
      .then(
        function fulfilled(value) {
          self.tableData = value.data
          self.getFilterOptions()
          self.onTableFilter()
        },
        function rejected(error) {
          self.tableData = []
          self.getFilterOptions()
          self.onTableFilter()
          console.log(error)
        }
      )
      .catch(function error(error) {
        self.tableData = []
        self.getFilterOptions()
        self.onTableFilter()
        console.log(error)
      })
      this.loading = false
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
    confirmCheck(scope) {
      // Confirm message
      var self = this
      this.$confirm({
        title: '修改確認',
        content: '確認後修改結果將會寫入資料庫',
        onOk() {
          self.editConfirm(scope)
          self.editState = false
        },
        onCancel() {
        },
      })
    },
    editConfirm(scope) {
      const data = {
        EMP_NO: scope.data.EMP_NO,
        EMP_NAME: scope.data.EMP_NAME,
        SOURCE: scope.data.SOURCE,
        DEPARTMENT: scope.data.DEPARTMENT,
        WHS_TYPE: this.form.WHS_TYPE,
        AREA: this.form.AREA,
        CLASS: this.form.CLASS,
        JOB_NAME: this.form.JOB_NAME,
        TIME: scope.data.TIME
      }
      const key = scope.data.EMP_NO
      let newData = [...this.tableData]
      let target
      for (let i=0; i<newData.length; i++) {
        if (newData[i].EMP_NO === key) {
          target = newData[i]
          newData[i] = data
        }
      }
      if (target) {
        target.editable = false
        this.tableData = newData
      }
      this.onTableFilter()
    },

    editCancel(scope) {
      this.resetForm()
      const key = scope.data.EMP_NO
      let newData = [...this.tableData]
      let target
      for (let i=0; i<newData.length; i++) {
        if (newData[i].EMP_NO === key) target = newData[i]
      }
      if (target) {
        target.editable = false
        this.tableData = newData
      }
      this.editState = false
    },

    //filter and pagination
    getFilterOptions() {
      let keepEMP_NO = {}
      let keepEMP_NAME = {}
      let keepWHS_TYPE = {}
      let keepAREA = {}
      let keepJOB_NAME = {}
      for (let i=0; i<this.tableData.length; i++) {
        if (!keepEMP_NO[this.tableData[i]['EMP_NO']]) {
          this.tableFilter['EMP_NO'].push(this.tableData[i]['EMP_NO'])
          keepEMP_NO[this.tableData[i]['EMP_NO']] = true
        }
        if (!keepEMP_NAME[this.tableData[i]['EMP_NAME']]) {
          this.tableFilter['EMP_NAME'].push(this.tableData[i]['EMP_NAME'])
          keepEMP_NAME[this.tableData[i]['EMP_NAME']] = true
        }
        if (!keepWHS_TYPE[this.tableData[i]['WHS_TYPE']]) {
          this.tableFilter['WHS_TYPE'].push(this.tableData[i]['WHS_TYPE'])
          keepWHS_TYPE[this.tableData[i]['WHS_TYPE']] = true
        }
        if (!keepAREA[this.tableData[i]['AREA']]) {
          this.tableFilter['AREA'].push(this.tableData[i]['AREA'])
          keepAREA[this.tableData[i]['AREA']] = true
        }
        if (!keepJOB_NAME[this.tableData[i]['JOB_NAME']]) {
          this.tableFilter['JOB_NAME'].push(this.tableData[i]['JOB_NAME'])
          keepJOB_NAME[this.tableData[i]['JOB_NAME']] = true
        }
      }
    },
    onTableFilter() {
      this.tableData_filter = this.tableData
        .filter(data => !Object.keys(this.selectedEMP_NO).length || this.selectedEMP_NO[data.EMP_NO])
        .filter(data => !Object.keys(this.selectedEMP_NAME).length || this.selectedEMP_NAME[data.EMP_NAME])
        .filter(data => !Object.keys(this.selectedWHS_TYPE).length || this.selectedWHS_TYPE[data.WHS_TYPE])
        .filter(data => !Object.keys(this.selectedAREA).length || this.selectedAREA[data.AREA])
        .filter(data => !Object.keys(this.selectedCLASS).length || this.selectedCLASS[data.CLASS])
        .filter(data => !Object.keys(this.selectedJOB_NAME).length || this.selectedJOB_NAME[data.JOB_NAME])
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
      this.tableData_show = this.tableData_filter.slice(start, end)
    },

    //table download
    getDownloadURL() {
      let header = {
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
      let tableData_to_download = [...this.tableData]
      return JSONtoXLSX(tableData_to_download, '人力資料表', header)
    },
    //style
    getFilterColStyle(prop) {
      switch(prop) {
        case 'EMP_NO':
          if (Object.keys(this.selectedEMP_NO).length > 0) return '#0CA8F6'
          break
        case 'EMP_NAME':
          if (Object.keys(this.selectedEMP_NAME).length > 0) return '#0CA8F6'
          break
        case 'WHS_TYPE':
          if (Object.keys(this.selectedWHS_TYPE).length > 0) return '#0CA8F6'
          break
        case 'AREA':
          if (Object.keys(this.selectedAREA).length > 0) return '#0CA8F6'
          break
        case 'CLASS':
          if (Object.keys(this.selectedCLASS).length > 0) return '#0CA8F6'
          break
        case 'JOB_NAME':
          if (Object.keys(this.selectedJOB_NAME).length > 0) return '#0CA8F6'
          break
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
    color: #0CA8F6;
  }
}
</style>