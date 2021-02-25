<template>
  <div :class="$style.wrapper">
    <div :class="$style.table">
      <div :class="$style.tableTitle">
        <span style="color: #4D4D4D">Support</span>
        <span style="font-weight: bold"> Requests</span>
      </div>
      <t-table
        :columns="headers"
        :data="tableData"
        :bordered="false"
        headerBackgoundColor="#fff"
        :borderAround="false"
        :striped="true"
        headerColor="#989898">
        <template slot="status" slot-scope="scope">
          <span :class="$style.tableTag" :style="getTagColor(scope.data['status'])">{{scope.data['status']}}</span>
        </template>
      </t-table>
    </div>
    <div :class="$style.table" style="margin-top: 50px;text-align: center;margin-bottom: 20px">
      <t-table
        :columns="headers_stock"
        :data="tableData_stock"
        :bordered="false"
        headerBackgoundColor="#fff"
        :borderAround="false"
        :striped="true"
        headerColor="#989898">
        <template slot="header" slot-scope="scope">
          <span v-if="scope.header.label === '倉庫'" style="font-size:30px">{{scope.header.label}}</span>
          <div v-else-if="scope.header.label === '排名'" style="font-size:25px;display:flex;justify-content:center">
            <span>{{scope.header.label}}</span>
            <span class="fas fa-trophy" style="color:#F0D827;position:relative;top:5px;left:5px"></span>
          </div>
          <div v-else-if="scope.header.label === '作業達成率'" :class="$style.fstLevelHeader">{{scope.header.label}}</div>
          <div v-else-if="scope.header.label === '倉庫效率'" :class="$style.fstLevelHeader">{{scope.header.label}}</div>
          <div v-else-if="scope.header.label === '儲位效能'" :class="$style.fstLevelHeader">{{scope.header.label}}</div>
          <div v-else-if="scope.header.label === '人員效率'" :class="$style.fstLevelHeader">{{scope.header.label}}</div>
        </template>
        <template :slot="slot" slot-scope="scope" v-for="(slot,s_index) in slots">
          <div :class="$style.cell" :key="s_index">
            <div :class="$style.rate">{{scope.data[slot].toString() + '%'}}</div>
            <div :class="$style.signal"><span class="fas fa-circle" :style="{color: getSignalColor(scope.data[slot])}"></span></div>
          </div>
        </template>
      </t-table>
    </div>
  </div>
</template>

<script>
import tTable from '@/components/utils/table'
export default {
  components: {
    tTable,
  },
  data() {
    return {
      slots: [
        'prepare',
        'instock',
        'inventory',
        'attendance',
        'security',
        'manManagement',
        'custComplaint',
        'abnormalOperation',
        'emptyRate',
        'quaterAjust',
        'jobSaturation',
        'hrEvaluation',
      ],
      headers: [
        {prop: 'name', label: 'NAME', style: {'padding': '10px 20px', 'font-family': 'Andale Mono, monospace', 'color': '#696969'}},
        {prop: 'email', label: 'EMAIL', style: {'padding': '10px 20px', 'font-family': 'Andale Mono, monospace', 'color': '#696969'}},
        {prop: 'product', label: 'PRODUCT', style: {'padding': '10px 20px', 'font-family': 'Andale Mono, monospace', 'color': '#696969'}},
        {prop: 'price', label: 'PRICE', style: {'padding': '10px 20px', 'font-family': 'Andale Mono, monospace', 'color': '#696969'}},
        {prop: 'date', label: 'DATE', style: {'padding': '10px 20px', 'font-family': 'Andale Mono, monospace', 'color': '#696969'}},
        {prop: 'city', label: 'CITY', style: {'padding': '10px 20px', 'font-family': 'Andale Mono, monospace', 'color': '#696969'}},
        {prop: 'status', label: 'STATUS', style: {'padding': '10px 20px', 'font-family': 'Andale Mono, monospace', 'color': '#696969'}},
      ],
      headers_stock: [
        {prop: 'index', label: '倉庫', style:{'padding': '5px 0px'}},
        {
          label: '作業達成率',
          children: [
            {prop: 'prepare', label: '備貨達成率'},
            {prop: 'instock', label: '入庫達成率'},
            {prop: 'inventory', label: '盤點達成率'},
            {prop: 'attendance', label: '出勤率'},
          ]
        },
        {
          label: '倉庫效率',
          children: [
            {prop: 'security', label: '安全管理'},
            {prop: 'manManagement', label: '人員管理'},
            {prop: 'custComplaint', label: '客訴'},
            {prop: 'abnormalOperation', label: '作業異常'},
          ]
        },
        {
          label: '儲位效能',
          children: [
            {prop: 'emptyRate', label: '儲位空置率'},
            {prop: 'quaterAjust', label: '儲位季度調整'},
          ]
        },
        {
          label: '人員效率',
          children: [
            {prop: 'jobSaturation', label: '工作飽和度'},
            {prop: 'hrEvaluation', label: '人力評估'},
          ]
        },
        {prop: 'rank', label: '排名', style: {'font-size': '18px', 'font-weight': 'bold'}}
      ],
      tableData: [
        {
          name: 'Mark Otto',
          email: 'ottoto@wxample.com',
          product: 'ON the Road',
          price: '$25224.2',
          date: '11 May 2017',
          city: 'Otsego',
          status: 'Sent'
        },
        {
          name: 'Jacob Thornton',
          email: 'thornton@wxample.com',
          product: 'HP Core i7',
          price: '$1254.2',
          date: '4 Jun 2017',
          city: 'Fivepointville',
          status: 'Sent'
        },
        {
          name: 'Larry the Bird',
          email: 'bird@wxample.com',
          product: 'Air Pro',
          price: '$1570.0',
          date: '27 Aug 2017',
          city: 'Leadville North',
          status: 'Pending'
        },
        {
          name: 'Joseph May',
          email: 'josephmay@wxample.com',
          product: 'Version Control',
          price: '$5224.5',
          date: '19 Feb 2018',
          city: 'Seaforth',
          status: 'Declined'
        },
        {
          name: 'Peter Horadnia',
          email: 'horadnia@wxample.com',
          product: 'Let`s Dance',
          price: '$43594.7',
          date: '1 Mar 2018',
          city: 'Hanoverton',
          status: 'Sent'
        },
      ],
      tableData_stock: [
        {
          index: 'D10_L10電子倉',
          prepare: 95,
          instock: 95,
          inventory: 95,
          attendance: 95,
          security: 80,
          manManagement: 95,
          custComplaint: 95,
          abnormalOperation: 95,
          emptyRate: 95,
          quaterAjust: 95,
          jobSaturation: 95,
          hrEvaluation: 95,
          rank: 1,
        },
        {
          index: 'D9_L10電子倉',
          prepare: 95,
          instock: 95,
          inventory: 95,
          attendance: 95,
          security: 95,
          manManagement: 95,
          custComplaint: 85,
          abnormalOperation: 95,
          emptyRate: 95,
          quaterAjust: 95,
          jobSaturation: 85,
          hrEvaluation: 95,
          rank: 2,
        },
        {
          index: 'D10_L10成品倉',
          prepare: 95,
          instock: 95,
          inventory: 95,
          attendance: 75,
          security: 95,
          manManagement: 75,
          custComplaint: 95,
          abnormalOperation: 95,
          emptyRate: 95,
          quaterAjust: 95,
          jobSaturation: 95,
          hrEvaluation: 95,
          rank: 3,
        },
        {
          index: 'E6_L10成品倉',
          prepare: 95,
          instock: 95,
          inventory: 95,
          attendance: 95,
          security: 95,
          manManagement: 65,
          custComplaint: 95,
          abnormalOperation: 95,
          emptyRate: 95,
          quaterAjust: 65,
          jobSaturation: 85,
          hrEvaluation: 95,
          rank: 4,
        },
        {
          index: 'D11_L5成品倉',
          prepare: 95,
          instock: 95,
          inventory: 95,
          attendance: 50,
          security: 95,
          manManagement: 95,
          custComplaint: 60,
          abnormalOperation: 95,
          emptyRate: 95,
          quaterAjust: 95,
          jobSaturation: 60,
          hrEvaluation: 95,
          rank: 5,
        },
      ]
    }
  },
  methods: {
    getTagColor(data) {
      var style
      switch (data) {
        case 'Sent':
          style = {'background-color': '#368DDC'}
          break
        case 'Pending':
          style = {'background-color': '#48A154'}
          break
        case 'Declined':
          style = {'background-color': '#F26044'}
          break
      }
      return style
    },
    getSignalColor(rate) {
      if (rate >= 95) {
        return 'green'
      }
      else if (rate >= 85) {
        return 'orange'
      }
      else return 'red'
    }
  }
}
</script>

<style lang="scss" module>
@import '@/style/general.module';
.wrapper {
  @include block(100%);
  .table {
    @include block(90%, $radius: 5px);
    margin-top:10px;
    margin-left: 10px;
    box-shadow: 0px 0px 10px 5px rgb(230, 230, 230);
    font-family: Andale Mono, monospace;
    .tableTitle {
      font-size: 20px;
      padding-left: 20px;
      padding-top: 15px;
    }
    .tableTag {
      position: relative;
      border-radius: 20px;
      padding: 2px 8px;
      font-size: 13px;
      font-weight: bold;
      color: #fff;
    }
    .fstLevelHeader {
       font-size:18px;
       border-bottom: 1px #d3d3d3 solid;
    }
    .cell {
      display: flex;
      justify-content: center;
      .rate {
        margin-right:10px;
        font-family: Andale Mono, monospace;
        font-size: 18px;
      }
    }
  }
}
</style>