<template>
  <div :class="$style.wrapper" :id="'hr_new_data_' + _uid.toString()">
    <div :class="$style.removeIcon" @click="$emit('removeRow', index)"><span class="fas fa-times-circle"></span></div>
    <div :class="$style.row">
      <div :class="$style.col">
        <div :class="$style.label">工號: </div>
        <t-input :class="$style.selector" v-model="new_data.EMP_NO"></t-input>
      </div>
      <div :class="$style.col">
        <div :class="$style.label">姓名: </div>
        <t-input :class="$style.selector" v-model="new_data.EMP_NAME"></t-input>
      </div>
      <div :class="$style.col">
        <div :class="$style.label">人力來源: </div>
        <t-input :class="$style.selector" v-model="new_data.SOURCE"></t-input>
      </div>

      <div :class="$style.col">
        <div :class="$style.label">部門名稱: </div>
        <t-input :class="$style.selector" v-model="new_data.DEPARTMENT"></t-input>
      </div>
      <div :class="$style.col">
        <div :class="$style.label">倉庫種類: </div>
        <single-select :class="$style.selector" :options="optionsWHS_TYPE" v-model="new_data.WHS_TYPE" :filter_disabled="true"></single-select>
      </div>
      <div :class="$style.col">
        <div :class="$style.label">倉庫位置: </div>
        <single-select :class="$style.selector" :options="optionsAREA" v-model="new_data.AREA" :filter_disabled="true"></single-select>
      </div>

      <div :class="$style.col">
        <div :class="$style.label">班別: </div>
        <single-select :class="$style.selector" :options="optionsCLASS" v-model="new_data.CLASS" :filter_disabled="true"></single-select>
      </div>
      <div :class="$style.col">
        <div :class="$style.label">崗位名稱: </div>
        <single-select :class="$style.selector" :options="optionsJOB_NAME" v-model="new_data.JOB_NAME" :filter_disabled="true"></single-select>
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
    new_data: {
      type: Object,
      require: true,
    }
  },
  data() {
    return {
      optionsWHS_TYPE: ['電子倉I', '電子倉II', '成品倉I', '成品倉II'],
      optionsAREA: ['A棟','B棟','C棟'],
      optionsCLASS: ['白班', '晚班'],
      optionsJOB_NAME: ['崗位A','崗位B','崗位C','崗位D','崗位E'],
    }
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
    justify-content: flex-start;
    flex-wrap: wrap;
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

@media screen and (max-width: 1210px) {
  .wrapper {
    .row {
      .col {
        @include block(49%);
      }
    }
  }
}

@media screen and (max-width: 950px) {
  .wrapper {
    .row {
      .col {
        @include block(99%);
      }
    }
  }
}

</style>