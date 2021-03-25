<template>
<div>
  <div class="tableContainer" :id="'tableContainer_' + _uid.toString()" :class="$style.tableContainer" 
    :style="tableWrapperStyle()"
  >
  <table>
    <thead :id="'tableHeadWrapper_' + _uid.toString()" v-if="header">
      <tr v-for="(lv,lv_index) in headerLevel" :key="lv_index">
        <th
          :colspan="spanMethod_header ? spanMethod_header(lv_index, h_index).colspan:getHeaderColSpan(header)"
          :rowspan="spanMethod_header ? spanMethod_header(lv_index, h_index).rowspan:(header.children ? 1:(headerLevel-lv+1))" :id="'tableHead' + lv" :class="$style.tableHead" 
          v-for="(header,h_index) in columnsToRender(lv)" :key="h_index"
          :style="[
            tableHeaderStyle(lv, header),
            {
              display: spanMethod_header?spanMethod_header(lv_index, h_index).rowspan === 0?'none':'default':'',
            }]">
          <slot name="header" :header="header">{{header.label}}</slot>
        </th>
      </tr>
    </thead>
    <tbody v-for="(group,g_index) in tbodyGroup?tbodyGroup.groupNumber:data.length" :key="g_index">
      <tr v-for="(each_data,r_index) in makeTableDataGroup(g_index, tbodyGroup?tbodyGroup.groupSize:new Array(data.length).fill(1))" :key="r_index" 
        :id="'tableRow_' + _uid.toString() + '_' + (tbodyGroup?groupIndexTranslation(g_index):g_index).toString()"
        :class="$style.tableRow"
        @click="toggleRow(g_index, tbodyGroup?groupIndexTranslation(g_index):g_index)">
        <td v-for="(header,h_index) in propList" :key="h_index"
          :rowspan="spanMethod(g_index, tbodyGroup?tbodyGroup.groupSize[groupIndexTranslation(g_index)]:1, tbodyGroup?r_index:g_index, h_index, header, each_data).rowspan"
          :colspan="spanMethod(g_index, tbodyGroup?tbodyGroup.groupSize[groupIndexTranslation(g_index)]:1, tbodyGroup?r_index:g_index, h_index, header, each_data).colspan"
          :style="[{
            'border-left': showBorder(h_index),
            'border-top': '1px ' + borderColor + ' solid',
            'display': spanMethod(g_index, tbodyGroup?tbodyGroup.groupSize[groupIndexTranslation(g_index)]:1, tbodyGroup?r_index:g_index, h_index, header, each_data).rowspan === 0?'none':'default',
            'background-color': backgroundColor?backgroundColor:bodyStriped(r_index)},
            header.style,
            if_sticky(header)]">
          <slot :name="header.prop" :data="each_data">{{each_data[header.prop]}}</slot>
        </td>
      </tr>
      <tr>
        <td v-if="rowToggled" :colspan="columns.length" style="padding:0px;cursor: default;">
          <div class="rowDetail" :class="$style.rowDetail">
            <slot name="rowToggle" :index="g_index"></slot>
          </div>
        </td>
      </tr>
    </tbody>
    <tfoot :class="$style.footer">
      <slot name="footer"></slot>
    </tfoot>
  </table>
  <div v-if="data.length === 0 && loading === false" :class="$style.emptyText">
    <slot name="empty_text">查無數據</slot>
  </div>
  <div v-if="loading" :class="$style.loading">
    <slot name="loading">
      <a-spin tip="加載中......" size="large"></a-spin>
    </slot>
  </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    data: {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    bordered: {
      type: Boolean,
      require: false,
      default() {
        return true
      }
    },
    striped: {
      type: Boolean,
      require: false,
      default() {
        return false
      }
    },
    rowHover: {
      type: Boolean,
      require: false,
      default() {
        return true
      }
    },
    borderAround: {
      type: Boolean,
      require: false,
      default() {
        return true
      }
    },
    borderColor: {
      type: String,
      require: false,
      default() {
        return '#d3d3d3'
      }
    },
    header: {
      type: Boolean,
      require: false,
      default() {
        return true
      }
    },
    headerFontSize: {
      type: String,
      require: false,
    },
    height: {
      type: String,
      require: false,
      default() {
        return ''
      }
    },
    maxHeight: {
      type: String,
      require: false,
      default() {
        return ''
      }
    },
    rowToggled: {
      type: Boolean,
      require: false,
      default() {
        return false
      }
    },
    headerBackgroundColor: {
      type: String,
      require: false,
      default() {
        return '#ECECEC'
      }
    },
    headerColor: {
      type: String,
      require: false,
      default() {
        return '#3F3F3F'
      }
    },
    headerTextAlign: {
      type: String,
      require: false,
      default() {
        return 'default'
      }
    },
    headerPadding: {
      type: String,
      require: false,
      default() {
        return '8px'
      }
    },
    spanMethod: {
      type: Function,
      require: false,
      default() {
        return function() {
          return {rowspan: 1, colspan: 1}
        }
      }
    },
    spanMethod_header: {
      type: Function,
      require: false,
    },
    tbodyGroup: {
      type: Object,
      require: false,
    },
    clickEvent: {
      type: Function,
      require: false,
      default() {
        return null
      }
    },
    backgroundColor: {
      type: String,
      require: false,
    },
    loading: {
      type:Boolean,
      require: false,
      default() {
        return false
      }
    }
  },
  
  data() {
    return {
      //multi-level header prop
      propList: [],

      headerLevel: 1,
      lastToggled: null,
      headerHeight: 30,
    }
  },
  created() {
    //multi-headerLevel
    this.headerLevel = this.getHeaderlevel() //計算表頭有多少level
    this.getPropList() //處理多級表頭props問題
  },
  methods: {
    //table style
    tableWrapperStyle() {
      var style = {overflowX:'auto'}
      if (this.borderAround) {
        style['border'] = '1px  ' + this.borderColor + ' solid'
      }
      if (this.height !== '') {
        style['height'] = this.height
        style['overflowY'] = 'scroll'
      }
      if (this.maxHeight !== '') {
        style['maxHeight'] = this.maxHeight
        style['overflowY'] = 'scroll'
      }
      return style
    },
    showBorder(h_index) {
      if (h_index === 0) return 'none' //最左邊不顯示border
      else if (this.bordered === false) return 'none'
      else return '1px  ' + this.borderColor + ' solid'
    },
    tableHeaderStyle(header_level, header) {
      var style = {
        'background-color': this.headerBackgroundColor,
        'font-size': this.headerFontSize,
        color: this.headerColor,
        height: this.headerHeight,
        'z-index': 1,
        'border-left': this.showBorder(),
        'border-top': header_level!==1 ? this.showBorder(): '',
        'text-align': this.headerTextAlign,
        padding: this.headerPadding,
      }
      if (this.height !== '' || this.maxHeight !== '') {
        style['position'] = 'sticky'
        style['top'] = ((header_level-1)*this.headerHeight).toString() + 'px'
      }
      if (header.fixed === 'left') {
        style['z-index'] = 2
        style['left'] = '0px'
        style['box-shadow'] = '0 0 2px rgba(0,0,0,0.75)'
        style['clip-path'] = 'inset(0px -15px 0px 0px)'
      }
      else if (header.fixed === 'right') {
        style['z-index'] = 2
        style['right'] = '0px'
        style['box-shadow'] = '0 0 2px rgba(0,0,0,0.75)'
        style['clip-path'] = 'inset(0px -15px 0px 0px)'
      }
      return style
    },
    if_sticky(header) {
      if (header.fixed === 'left') {
        return {
          position: 'sticky',
          left: '0px',
          backgroundColor: this.backgroundColor ? this.backgroundColor : '#fff',
          'box-shadow': '0 0 1px rgba(0,0,0,0.75)',
          'clip-path': 'inset(0px -15px 0px 0px)'
        }
      }
      else if (header.fixed === 'right') {
        return {
          position: 'sticky',
          right: '0px',
          backgroundColor: this.backgroundColor ? this.backgroundColor : '#fff',
          'box-shadow': '0 0 1px rgba(0,0,0,0.75)',
          'clip-path': 'inset(0px -15px 0px 0px)'
        }
      }
    },

    //table toggle
    toggleRow(group_index, row_index) {
      if (typeof(this.clickEvent) === 'function') this.clickEvent(row_index)
      if (this.rowToggled === false) return
      if (document.getElementsByClassName('rowDetail')[group_index].style.display === 'block') {
        document.getElementsByClassName('rowDetail')[group_index].style.display = 'none'
      }
      else {
        if (this.lastToggled !== null) {
          document.getElementsByClassName('rowDetail')[this.lastToggled].style.display = 'none'
        }
        document.getElementsByClassName('rowDetail')[group_index].style.display = 'block'
        this.lastToggled = group_index
      }
    },

    //多級表頭
    getHeaderlevel() {
      var level = 1
      function dfs(header, currentLv) {
        if (!header.children) {
          level = currentLv>level ? currentLv:level
          return
        }
        for (var i=0; i<header.children.length; i++) {
          dfs(header.children[i], ++currentLv)
        }
      }
      for (var i=0; i<this.columns.length; i++) {
        dfs(this.columns[i], 1)
      }
      return level
    },
    getHeaderRowSpan(header) {
      var depth = 1
      function dfs(header, currentDepth) {
        if (!header.children) depth = currentDepth>depth ? currentDepth:depth
        currentDepth
        for (var i=0; i<header.children.length; i++) {
          dfs(header.children[i], currentDepth)
        }
      }
      dfs(header, 1)
      return depth
    },
    getHeaderColSpan(header) {
      if (!header.children) return 1
      var colSpanList = new Array(header.children.length).fill(0)
      function dfs(header, index) {
        if (!header.children) {
          colSpanList[index] = 1
          return
        }
        if (header.children && !header.children.children) {
          colSpanList[index] = header.children.length + colSpanList[index]
          return
        }
        for (var i=0; i<header.children.length; i++) {
          dfs(header.children[i], index)
        }
      }
      for (var i=0; i<header.children.length; i++) {
        dfs(header.children[i], i)
      }
      var colSpan = 0
      for (var j=0; j<colSpanList.length; j++) {
        colSpan+=colSpanList[j]
      }
      return colSpan
    },
    columnsToRender(lv) {
      if (lv ===1) return this.columns
      var headers = []
      function makeHeaders(header, currentLv) {
        currentLv+=1
        if (currentLv === lv) {
          headers.push(header)
          return
        }
        if (!header.children) return
        for (var i=0; i<header.children.length; i++) {
          makeHeaders(header.children[i], currentLv)
        }
      }
      for (var i=0; i<this.columns.length; i++) {
        makeHeaders(this.columns[i], 0)
      }
      return headers
    },
    getPropList() {
      var self = this
      this.propList = []
      function dfs(header) {
        if (header.prop) {
          self.propList.push(header)
          return
        }
        if (!header.children) return
        for (var i=0; i<header.children.length; i++) {
          dfs(header.children[i])
        }
      }
      for (var i=0; i<this.columns.length; i++) dfs(this.columns[i])
      return
    },

    //body group
    makeTableDataGroup(groupNumber, groupSize) {
      let bypass_number = groupSize[0]
      var start = 0
      var end = bypass_number
      for (var i=0; i<groupNumber; i++) {
        bypass_number = groupSize[end]
        start = end
        end += bypass_number
      }
      return this.data.slice(start, end)
    },
    groupIndexTranslation(g_index) {
      var real_index = 0
      let bypass_number = this.tbodyGroup.groupSize[real_index]
      for (var i=0; i<g_index; i++) {
        real_index += bypass_number
        bypass_number = this.tbodyGroup.groupSize[real_index]
      }
      return real_index
    },

    //custom style
    bodyStriped(r_index) {
      if (this.striped) {
        if (r_index%2 === 0) return '#F9F9F9'
        else return '#fff'
      }
      else return ''
    }
  },
  watch: {
    //when table rerender, untoggle the detail row.
    data() {
      if (this.lastToggled !== null) {
        document.getElementsByClassName('rowDetail')[this.lastToggled].style.display = 'none'
        this.lastToggled = null
      }
    },
    columns() {
      this.getPropList()
    }
  }
}
</script>

<style lang="scss" module>
@import '../common/general.scss';
@import './table.scss';

.tableContainer {
  @include block(100%);
  table {
    font-family: arial, sans-serif;
    @include block(100%);
    border-collapse: separate; /* Don't collapse */
    border-spacing: 0;
    tr {
      td {
        padding: 8px;
      }
      th {
        font-weight: bold;
        text-align: left;
      }
    }
    .tableRow:hover {
      background-color: var(--table-hover-color);
    }
    .rowDetail {
      display: none;
      transition: max-height 0.25s;
      background-color: #f5f5f5;
    }
    .footer {
      background-color: #e4e4e4;
    }
  }
  .emptyText {
    font-size: 20px;
    text-align: center;
    font-family: Microsoft JhengHei;
    font-weight: bold;
    padding:20px;
  }
  .loading {
    margin:20px 0px;
    text-align: center;
  }
}
</style>