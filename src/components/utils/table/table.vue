<template>
<div>
  <div class="tableContainer" :id="'tableContainer_' + _uid.toString()" :class="$style.tableContainer" 
    :style="tableWrapperStyle()"
  >
  <table :id="'table_' + _uid">
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
            },if_sticky(header)]">
          <slot name="header" :header="header">{{header.label}}</slot>
        </th>
      </tr>
    </thead>
    <!--normal non-grouped table-->
    <template v-if="!tbodyGroup">
      <tbody>
        <template v-for="(each_data,r_index) in data">
          <tr :key="r_index"
            :id="'tableRow_' + _uid.toString()"
            :class="$style.tableRow"
            :style="{cursor: clickEvent === null ? 'default':'pointer'}"
            @click="toggleRow(null, r_index)">
            <td v-for="(header,h_index) in propList" :key="h_index"
              :rowspan="spanMethod(null, null, r_index, h_index, header, each_data).rowspan"
              :colspan="spanMethod(null, null, r_index, h_index, header, each_data).colspan"
              :style="[{
                'border-left': showBorder(h_index),
                'border-top': '1px ' + borderColor + ' solid',
                'display': spanMethod(null, null, r_index, h_index, header, each_data).rowspan === 0?'none':'default',
                'background-color': getBackgroundColor(r_index, header.prop, each_data)},
                header.style,
                tableCellStyle(),
                if_sticky(header)]">
              <slot :name="header.prop" :data="each_data">{{each_data[header.prop]}}</slot>
            </td>
          </tr>
          <tr :key="'rowToggled_' + r_index.toString()" v-if="rowToggled">
            <td :colspan="columns.length" style="padding:0px;cursor: default;">
              <div class="rowDetail" :class="$style.rowDetail">
                <slot name="rowToggle" :index="r_index"></slot>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </template>

    <template v-else>
      <tbody v-for="(group,g_index) in tbodyGroup.groupNumber" :key="g_index" :id="'tbody_' + _uid.toString()">
        <tr
          v-for="(each_data,r_index) in makeTableDataGroup(g_index, tbodyGroup.groupSize)"
          :key="r_index"
          :id="'tableRow_' + _uid.toString() + '_' + (groupIndexTranslation(g_index)).toString()"
          :class="$style.tableRow"
          @click="toggleRow(g_index, groupIndexTranslation(g_index))">
          <td v-for="(header,h_index) in propList" :key="h_index"
            :rowspan="spanMethod(g_index, tbodyGroup.groupSize[g_index], r_index, h_index, header, each_data).rowspan"
            :colspan="spanMethod(g_index, tbodyGroup.groupSize[g_index], r_index, h_index, header, each_data).colspan"
            :style="[{
              'border-left': showBorder(h_index),
              'border-top': '1px ' + borderColor + ' solid',
              'display': spanMethod(g_index, tbodyGroup.groupSize[g_index], r_index, h_index, header, each_data).rowspan === 0?'none':'default',
              'background-color': getBackgroundColor(r_index, header.prop, each_data)},
              header.style,
              tableCellStyle(),
              if_sticky(header)]">
            <slot :name="header.prop" :data="each_data">{{each_data[header.prop]}}</slot>
          </td>
        </tr>
        <tr v-if="rowToggled">
          <td :colspan="columns.length" style="padding:0px;cursor: default;">
            <div class="rowDetail" :class="$style.rowDetail">
              <slot name="rowToggle" :index="g_index"></slot>
            </div>
          </td>
        </tr>
      </tbody>
    </template>
    
    <tfoot :class="$style.table_footer">
      <slot name="footer"></slot>
    </tfoot>
  </table>
  <div v-if="data.length === 0 && loading === false" :class="$style.emptyText">
    <slot name="empty_text">查無數據</slot>
  </div>
  <div v-if="loading" :class="$style.loading">
    <slot name="loading">
      <t-spin tip="加載中"></t-spin>
    </slot>
  </div>
  </div>
</div>
</template>

<script>
import tSpin from '../spin'
export default {
  components: {
    tSpin,
  },
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
    hoverStyle: {
      type: String,
      require: false,
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
      default: null
    },
    backgroundColor: {
      type: [Function, String],
      require: false,
    },
    size: {
      type: String,
      require: false,
      default() {
        return 'normal'
      }
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

      headerHeight_normal: 40,
      headerHeight_small: 20,
    }
  },
  created() {
    //multi-headerLevel
    this.headerLevel = this.getHeaderlevel() //計算表頭有多少level
    this.getPropList() //處理多級表頭props問題
  },
  mounted() {
    this.checkHoverEffect() //是否載入hover效果
  },
  methods: {
    //table style
    tableWrapperStyle() {
      let style = {}
      if (this.borderAround) {
        style['border'] = '1px  ' + this.borderColor + ' solid'
      }
      if (this.height !== '') {
        style['height'] = this.height
      }
      if (this.maxHeight !== '') {
        style['maxHeight'] = this.maxHeight
      }
      return style
    },
    showBorder(h_index) {
      if (h_index === 0) return 'none' //最左邊不顯示border
      else if (this.bordered === false) return 'none'
      else return '1px  ' + this.borderColor + ' solid'
    },
    tableHeaderStyle(header_level, header) {
      let style = {
        'background-color': this.headerBackgroundColor,
        'font-size': this.headerFontSize,
        color: this.headerColor,
        'z-index': 1,
        'border-left': this.showBorder(),
        'border-top': header_level != 1 ? this.showBorder(): '',
        'text-align': this.headerTextAlign,
      }

      //size diff
      style = this.tableSizeEffect_header(style, header_level)

      
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
    tableCellStyle() {
      let style = {}
      style = this.tableSizeEffect_cell(style)
      return style
    },
    tableSizeEffect_header(style, header_level) {
      switch (this.size) {
        case 'normal':
          style['height'] = this.headerHeight_normal + 'px'
          if (this.height !== '' || this.maxHeight !== '') {
            style['position'] = 'sticky'
            style['top'] = ((header_level-1)*this.headerHeight_normal).toString() + 'px'
          }
          break
        case 'small':
          style['height'] = this.headerHeight_small + 'px'
          if (this.height !== '' || this.maxHeight !== '') {
            style['position'] = 'sticky'
            style['top'] = ((header_level-1)*this.headerHeight_small).toString() + 'px'
          }
          break
        default:
          style['height'] = this.headerHeight_normal + 'px'
          if (this.height !== '' || this.maxHeight !== '') {
            style['position'] = 'sticky'
            style['top'] = ((header_level-1)*this.headerHeight_normal).toString() + 'px'
          }
          break
      }
      return style
    },
    tableSizeEffect_cell(style) {
      switch (this.size) {
        case 'normal':
          style['padding'] = '8px'
          break
        case 'small':
          style['padding'] = '0px'
          break
        default:
          style['padding'] = '8px'
          break
      }
      return style
    },
    getBackgroundColor(r_index, prop, data) {
      // custom background color was set
      if (this.backgroundColor) {
        if (typeof(this.backgroundColor) === 'string') return this.backgroundColor
        else {
          return this.backgroundColor(prop, data)
        }
      }
      else return this.bodyStriped(r_index)
    },
    checkHoverEffect() {
      let DOM = document.getElementById('tableContainer_' + this._uid.toString())
      let DOM_table = document.getElementById('table_' + this._uid)
      if (this.rowHover) {
        DOM.setAttribute('hover-effect', 'on')
        if (this.hoverStyle === 'dark') DOM_table.setAttribute('hover-style', 'dark')
        else DOM_table.setAttribute('hover-style', 'light')
      }
      else {
        DOM.setAttribute('hover-effect', 'off')
      }
    },
    if_sticky(header) {
      if (header.fixed === 'left') {
        return {
          position: 'sticky',
          'z-index': 2,
          left: '0px',
          backgroundColor: this.backgroundColor ? this.backgroundColor : 'inherit',
          'box-shadow': '0px 0px 10px 1px #454545',
          'clip-path': 'inset(0px -15px 0px 0px)'
        }
      }
      else if (header.fixed === 'right') {
        return {
          position: 'sticky',
          'z-index': 2,
          right: '0px',
          backgroundColor: this.backgroundColor ? this.backgroundColor : 'inherit',
          'box-shadow': '0px 0px 10px 1px #454545',
          'clip-path': 'inset(0px 0px 0px -15px)'
        }
      }
    },

    //table toggle
    toggleRow(group_index, row_index) {
      if (typeof(this.clickEvent) === 'function') this.clickEvent(row_index)
      if (this.rowToggled === false) return

      let toggle_index = group_index ? group_index:row_index

      if (document.getElementsByClassName('rowDetail')[toggle_index].style.display === 'block') {
        document.getElementsByClassName('rowDetail')[toggle_index].style.display = 'none'
      }
      else {
        if (this.lastToggled !== null) {
          document.getElementsByClassName('rowDetail')[this.lastToggled].style.display = 'none'
        }
        document.getElementsByClassName('rowDetail')[toggle_index].style.display = 'block'
        this.lastToggled = toggle_index
      }
    },

    //多級表頭
    getHeaderlevel() {
      let level = 1
      function dfs(header, currentLv) {
        if (!header.children) {
          level = currentLv>level ? currentLv:level
          return
        }
        for (let i=0; i<header.children.length; i++) {
          dfs(header.children[i], ++currentLv)
          currentLv--
        }
      }
      for (let i=0; i<this.columns.length; i++) {
        dfs(this.columns[i], 1)
      }
      return level
    },
    getHeaderRowSpan(header) {
      let depth = 1
      function dfs(header, currentDepth) {
        if (!header.children) depth = currentDepth>depth ? currentDepth:depth
        currentDepth
        for (let i=0; i<header.children.length; i++) {
          dfs(header.children[i], currentDepth)
        }
      }
      dfs(header, 1)
      return depth
    },
    getHeaderColSpan(header) {
      if (!header.children) return 1
      let colSpanList = new Array(header.children.length).fill(0)
      function dfs(header, index) {
        if (!header.children) {
          colSpanList[index] = 1
          return
        }
        if (header.children && !header.children.children) {
          colSpanList[index] = header.children.length + colSpanList[index]
          return
        }
        for (let i=0; i<header.children.length; i++) {
          dfs(header.children[i], index)
        }
      }
      for (let i=0; i<header.children.length; i++) {
        dfs(header.children[i], i)
      }
      let colSpan = 0
      for (let j=0; j<colSpanList.length; j++) {
        colSpan+=colSpanList[j]
      }
      return colSpan
    },
    columnsToRender(lv) {
      if (lv ===1) return this.columns
      let headers = []
      function makeHeaders(header, currentLv) {
        currentLv+=1
        if (currentLv === lv) {
          headers.push(header)
          return
        }
        if (!header.children) return
        for (let i=0; i<header.children.length; i++) {
          makeHeaders(header.children[i], currentLv)
        }
      }
      for (let i=0; i<this.columns.length; i++) {
        makeHeaders(this.columns[i], 0)
      }
      return headers
    },
    getPropList() {
      let self = this
      this.propList = []
      function dfs(header) {
        if (header.prop) {
          self.propList.push(header)
          return
        }
        if (!header.children) return
        for (let i=0; i<header.children.length; i++) {
          dfs(header.children[i])
        }
      }
      for (let i=0; i<this.columns.length; i++) dfs(this.columns[i])
      return
    },

    //body group
    makeTableDataGroup(groupNumber, groupSize) {
      if (!groupSize) return this.data

      let bypass_number = 0
      let start = 0
      let end = 0
      for (let i=0; i<=groupNumber; i++) {
        bypass_number = groupSize[i]
        start = end
        end += bypass_number
      }
      return this.data.slice(start, end)
    },
    groupIndexTranslation(g_index) {
      let real_index = 0
      let bypass_number = this.tbodyGroup.groupSize[0]
      for (let i=0; i<g_index; i++) {
        real_index += bypass_number
        bypass_number = this.tbodyGroup.groupSize[i+1]
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
    },

    // other utils
    isNumber(value) {
      let figure = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
      if (value in figure) return true
      else return false
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
  overflow-x: hidden;
  table {
    font-family: arial, sans-serif;
    @include block(100%);
    border-collapse: separate; /* Don't collapse */
    border-spacing: 0;
    tr {
      padding: 0px;
      td {
        padding: 0px;
      }
      th {
        font-weight: bold;
        text-align: left;
        padding: 0px;
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
    .table_footer {
      @include block(100%);
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

.tableContainer:hover {
  overflow-x: auto;
  overflow-y: auto;
}
</style>