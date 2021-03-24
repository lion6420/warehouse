<template>
  <div :class="$style.contentContainer">
    <!--現有人員列表-->
    <div class="row justify-content-center" style="margin:0px 1vw;">
      <hr-maintenance-table></hr-maintenance-table>
    </div>

    <!--新增人員-->
    <div v-if="false" :class="$style.contentSubTitle" style="margin-top:20px;">
      <div style="width: 95%;display:flex">
        <div class="fas fa-square" style="color:red;font-size:16px;margin:15px 10px;"></div>
        <div>人員新增</div>
      </div>
      <div :class="$style.submitBtn" @click="submit">送出</div>
    </div>
    <div v-if="false" :class="$style.newDataArea" class="row justify-content-center" style="margin:0px 1vw 300px 1vw;">
      <hr-new-data v-for="(row,r_index) in new_data.length" :key="r_index" @removeRow="removeRow" :index="r_index" :data="new_data[r_index]"></hr-new-data>
      <div class="col align-self-end">
        <div :class="$style.addRow" @click="addRow()"><span style="position:relative;top:5px" class="fas fa-plus"></span></div>
      </div>
    </div>

    <!--檔案上傳-->
    <div v-if="false" :class="$style.contentSubTitle" style="margin-top:20px;">
      <span class="fas fa-square" style="color:red;font-size:16px;margin:15px 10px"></span>檔案上傳
    </div>
    <div v-if="false" class="row justify-content-center" style="margin:0px 1vw 0px 1vw;">
      <hr-upload-file></hr-upload-file>
    </div>
  </div>
</template>

<script>
import hrMaintenanceTable from './hr-maintenance-table'
import hrNewData from './hr-new-data'
import hrUploadFile from './hr-upload-file'

export default {
  components: {
    hrMaintenanceTable,
    hrNewData,
    hrUploadFile,
  },
  data() {
    return {
      //week selection
      week: '35',

      //site BU
      site: '',
      BU: '',

      new_data: [{
        EMP_NO: '',
        EMP_NAME: '',
        POST_TYPE: '',
        SOURCE: '',
        DEPARTMENT: '',
        SITE: 'FOL',
        BU: '',
        WHS_TYPE: '',
        AREA: '',
        JOB_TYPE: '',
        CLASS: '',
        JOB_RANK: '',
        JOB_NAME: '',
        TIME: '',
      }],
    }
  },
  created() {
  },
  methods: {
    removeRow(index) {
      var left = this.new_data.slice(0, index)
      var right = this.new_data.slice(index+1)
      this.new_data = left.concat(right)
    },
    addRow() {
      this.new_data.push({
        EMP_NO: '',
        EMP_NAME: '',
        POST_TYPE: '',
        SOURCE: '',
        DEPARTMENT: '',
        SITE: 'FOL',
        BU: '',
        WHS_TYPE: '',
        AREA: '',
        JOB_TYPE: '',
        CLASS: '',
        JOB_RANK: '',
        JOB_NAME: '',
        TIME: '',
      })
    },
    reset() {
      this.new_data = [{
        EMP_NO: '',
        EMP_NAME: '',
        POST_TYPE: '',
        SOURCE: '',
        DEPARTMENT: '',
        SITE: 'FOL',
        BU: '',
        WHS_TYPE: '',
        AREA: '',
        JOB_TYPE: '',
        CLASS: '',
        JOB_RANK: '',
        JOB_NAME: '',
        TIME: '',
      }]
    },
    submit() {
      return
    },
  }
}
</script>
<style lang="scss" module>
@import '@/styles/general.scss';
.contentContainer {
  @include block(100%);
  display:flex;
  flex-direction: column;
  margin-bottom:30px;
  text-align: center;
  .submitBtn {
    @include block(5%, 34px, $radius: 5px);
    @include border();
    font-size: 20px;
    background-color: rgb(62, 158, 62);
    color: #fff;
    text-align: center;
    margin-right: 1vw;
    cursor: pointer;
  }
  .submitBtn:hover {
    background-color: rgb(72, 179, 72);
  }
  .newDataArea {
    @include block($radius: 5px);
    box-shadow: 0px 0px 1px 1px rgb(214, 214, 214);
  }
  .addRow {
    @include block(40px, 40px, $radius:50%);
    @include border();
    float:right;
    background-color: rgb(65, 76, 194);
    color: #fff;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 10px;
    margin-top:10px;
  }
  .addRow:hover {
    background-color: rgb(99, 108, 206);
  }
  .filterContainer {
    @include block(100%);
    display: flex;
    .filter_EMPID {
      @include block(150px);
    }
    .filter_EMPNAME {
      @include block(150px);
      margin-left: 10px;
    }
  }
  .contentSubTitle {
    @include block(100%);
    display: flex;
    font-size:30px;
    font-family: Microsoft JhengHei;
    font-weight: bold;
    text-align: left;
  }
}

</style>
