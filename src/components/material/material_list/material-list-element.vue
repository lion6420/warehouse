<template>
  <div :class="$style.wrapper">
    <div :class="$style.title">
      <span style="position:relative;top:5px;left:10px">Material </span>
      <span style="position:relative;top:5px;left:10px;color:#fff">{{catagory}}</span>
    </div>
    <div :class="$style.list">
      <t-table
      :class="$style.table"
      :columns="headers"
      :data="tableData"
      headerBackgroundColor=""
      :bordered="false"
      :rowHover="false"
      :borderAround="false"
      headerTextAlign="center"
      headerColor="#AFAFAF"
      borderColor="#4B4B4B">
        <template slot="operation">
          <div :class="$style.list_operation">
            <div :class="$style.operation_plus"><span class="fas fa-plus"></span></div>
            <div :class="$style.operation_detail"><span class="fas fa-info-circle"></span></div>
          </div>
        </template>
        <template slot="stock" slot-scope="scope">
          <span :style="{color:scope.data['stock']>scope.data['demand'] ? '#fff':'red'}">{{scope.data['stock']}}</span>
        </template>
      </t-table>
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
      headers: [
        {prop: 'PN', label: '料號', style: {'text-align': 'center'}},
        {prop: 'WO', label: '工單號', style: {'text-align': 'center'}},
        {prop: 'time', label: '上線時間', style: {'text-align': 'center'}},
        {prop: 'demand', label: '需求', style: {'text-align': 'center'}},
        {prop: 'stock', label: '庫存', style: {'text-align': 'center'}},
        {prop: 'operation', label: '', style: {'text-align': 'center'}},
      ],
      tableData: [
        {
          PN: '700-203-21',
          WO: '80027382',
          time: '2021-01-22 10:10:00',
          demand: 1000,
          stock: 5000,
        },
        {
          PN: '700-222-31',
          WO: '80027382',
          time: '2021-01-22 10:10:00',
          demand: 100,
          stock: 500,
        },
        {
          PN: '700-302-22',
          WO: '80027382',
          time: '2021-01-22 10:10:00',
          demand: 10,
          stock: 5000,
        },
        {
          PN: '700-540-11',
          WO: '80027382',
          time: '2021-01-22 10:10:00',
          demand: 400,
          stock: 5000,
        },
        {
          PN: '800-205-61',
          WO: '80027382',
          time: '2021-01-22 10:10:00',
          demand: 1000,
          stock: 50,
        },
        {
          PN: '800-233-71',
          WO: '80027382',
          time: '2021-01-22 10:10:00',
          demand: 1000,
          stock: 5000,
        },
        {
          PN: '800-223-31',
          WO: '80027382',
          time: '2021-01-22 10:10:00',
          demand: 10,
          stock: 50,
        },
        {
          PN: '700-253-51',
          WO: '80027382',
          time: '2021-01-22 10:10:00',
          demand: 400,
          stock: 500,
        },
        {
          PN: '700-203-21',
          WO: '80027382',
          time: '2021-01-22 10:10:00',
          demand: 325,
          stock: 500,
        }
      ],
    }
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.wrapper {
  @include block(100%, 500px);
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
      .operation_detail {
        cursor: pointer;
      }
    }
  }
}

</style>