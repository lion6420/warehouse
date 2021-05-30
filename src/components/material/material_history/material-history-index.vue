<template>
  <div :class="$style.material_history">
    <div :class="$style.title">Material Applied History</div>
    <div :class="$style.selectArea">
      <!--time-->
      <span style="margin: 5px 20px 0px 0px">搜尋時間範圍: </span>
      <date-picker
        v-model="time_range"
        value-type="format"
        format="YYYY-MM-DD"
        range
        placeholder="Select datetime range"
      ></date-picker>

      <!--PN-->
      <span style="margin: 5px 20px 0px 30px">搜尋料號: </span>
      <t-input v-model="PN"></t-input>

      <!--Applicant-->
      <span style="margin: 5px 20px 0px 30px">搜尋申請人: </span>
      <t-input v-model="applicant"></t-input>

      <a-button style="margin-left:20px" @click="search_signal = true">搜尋</a-button>
    </div>
    <div :class="$style.listArea">
      <material-history-list
        :PN="PN"
        :applicant="applicant"
        :search_signal="search_signal"
        @handle_search_signal="handle_search_signal">
      </material-history-list>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import tInput from '@/components/utils/input'
import materialHistoryList from './material-history-list'

export default {
  components: {
    DatePicker,
    tInput,
    materialHistoryList,
  },
  data() {
    return {
      time_range: [],
      PN: '',
      applicant: '',

      search_signal: false
    }
  },
  methods: {
    handle_search_signal() {
      this.search_signal = false
    }
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.material_history {
  @include block(95%);
  margin: auto;
  .title {
    @include block(100%);
    color: var(--text-color);
    font-size: 40px;
    margin-top:10px;
  }
  .selectArea {
    @include block(100%);
    display: flex;
    color: var(--text-color);
    margin: 20px 0px;
  }
  .listArea {
    @include block(100%);
  }
}

</style>