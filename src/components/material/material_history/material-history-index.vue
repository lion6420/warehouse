<template>
  <div :class="$style.material_history">
    <div :class="$style.title">Material Applied History</div>
    <div :class="$style.selectArea">
      <!--time-->
      <div :class="$style.select_time">
        <span style="margin: 5px 20px 0px 10px; width: 90px">搜尋時間範圍: </span>
        <date-picker
          v-model="time_range"
          value-type="format"
          format="YYYY-MM-DD"
          range
          placeholder="Select datetime range"
        ></date-picker>
      </div>

      <!--PN-->
      <div :class="$style.select_pn">
        <span style="margin: 5px 20px 0px 10px; width: 90px">搜尋料號: </span>
        <t-input v-model="PN"></t-input>
      </div>

      <!--Applicant-->
      <div :class="$style.select_applicant">
        <span style="margin: 5px 20px 0px 10px; width: 90px">搜尋申請人: </span>
        <t-input v-model="applicant"></t-input>
      </div>

      <a-button :class="$style.search_btn" @click="search_signal = true">搜尋</a-button>
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
    justify-content: space-around;
    color: var(--text-color);
    margin: 20px 0px;
    .select_time {
      display: flex;
      @include block(40%);
    }
    .select_pn {
      display: flex;
      @include block(28%);
    }
    .select_applicant {
      display: flex;
      @include block(28%);
    }
    .search_btn {
      margin-left: 10px;
    }
  }
  .listArea {
    @include block(100%);
  }
}

@media screen and (max-width: 1450px) {
  .material_history {
    .selectArea {
      flex-wrap: wrap;
      justify-content: flex-start;
      .select_time {
        @include block(100%);
      }
      .select_pn {
        @include block(38%);
        margin-top: 10px;
      }
      .select_applicant {
        @include block(38%);
        margin-top: 10px;
      }
      .search_btn {
        margin-top: 10px;
      }
    }
  }
}

@media screen and (max-width: 1080px) {
  .material_history {
    .title {
      font-size: 30px;
    }
    .selectArea {
      .select_pn {
        @include block(95%);
        margin-top: 10px;
      }
      .select_applicant {
        @include block(95%);
        margin-top: 10px;
      }
    }
  }
}
</style>