<template>
  <div :class="$style.wrapper" :id="'hr_new_data_' + _uid.toString()">
    <div :class="$style.removeIcon" @click="$emit('removeRow', index)"><span class="fas fa-times-circle"></span></div>
    <div :class="$style.row">
      <div :class="$style.col">
        <div :class="$style.label">工號: </div>
        <t-input :class="$style.selector" v-model="data.EMP_NO"></t-input>
      </div>
      <div :class="$style.col">
        <div :class="$style.label">姓名: </div>
        <t-input :class="$style.selector" v-model="data.EMP_NAME"></t-input>
      </div>
      <div :class="$style.col">
        <div :class="$style.label">人力來源: </div>
        <t-input :class="$style.selector" v-model="data.SOURCE"></t-input>
      </div>
    </div>

    <div :class="$style.row">
      <div :class="$style.col">
        <div :class="$style.label">部門名稱: </div>
        <t-input :class="$style.selector" v-model="data.DEPARTMENT"></t-input>
      </div>
      <div :class="$style.col">
        <div :class="$style.label">倉庫位置: </div>
        <single-select :class="$style.selector" :options="optionsAREA" v-model="data.AREA">
          <template slot="empty" v-if="data.WHS_TYPE === ''">
            <span>請先選擇倉庫種類</span>
          </template>
        </single-select>
      </div>
      <div :class="$style.col">
        <div :class="$style.label">班別: </div>
        <single-select :class="$style.selector" :options="optionsCLASS" v-model="data.CLASS"></single-select>
      </div>
    </div>

    <div :class="$style.row" style="margin-bottom:10px"> 
      <div :class="$style.col">
        <div :class="$style.label">崗位名稱: </div>
        <single-select :class="$style.selector" :options="optionsJOB_NAME" v-model="data.JOB_NAME">
          <template slot="empty" v-if="data.JOB_RANK === ''">
            <span>請先選擇崗位一階</span>
          </template>
        </single-select>
      </div>
    </div>
    <hr style="width: 95%;margin:10px auto;border-color:#AAAAAA"/>
  </div>
</template>

<script>
import tInput from '@/components/utils/input'
import singleSelect from '@/components/utils/single-select'
export default {
  components: {
    tInput,
    singleSelect,
  },
  props: {
    index: {
      type: Number,
      require: true,
    },
    data: {
      type: Object,
      require: true,
    }
  },
  data() {
    return {
      site: '',
      BU_name: '',
       
      optionsSITE: ['FOL'],
      optionsBU: [],
      optionsWHS_TYPE: [],
      optionsAREA: [],
      optionsCLASS: ['白班', '晚班'],
      optionsJOB_RANK: [],
      optionsJOB_NAME: [],

      typetoArea: {},

      whs_job_map: {},
    }
  },
  methods: {
  },
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.wrapper {
  @include block(100%, $radius: 5px);
  font-family: Microsoft JhengHei;
  font-weight: bold;
  color: var(--text-color);
  .removeIcon {
    font-size: 15px;
    margin-top: 10px;
    margin-right: 20px;
    float:right;
    cursor: pointer;
    color: rgb(170, 170, 170);
  }
  .removeIcon:hover {
    color: rgb(136, 136, 136);
  }
  .row {
    @include block(100%);
    display: flex;
    justify-content: space-between;
    .col {
      @include block(33%);
      display: flex;
      .label {
        @include block(20%);
        margin-top: 14px;
        margin-left: 30px;
      }
      .selector {
        @include block(80%, $radius: 3px);
        margin-top:10px;
      }
    }
  }
}

</style>