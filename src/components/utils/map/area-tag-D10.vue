<template>
  <div :class="$style.wrapper">
    <div :class="$style.areaTag" :id="'areaTag_' + name">
      <div :class="$style.clickBtn" class="fas fa-circle"
        @click="showInfoBoard(infoPositionX, infoPositionY, ('infoBoard_' + name))">
      </div>
      <div :class="$style.areaName">{{name}}</div>
    </div>
    <indication-line
      :startPointX="35"
      :startPointY="30"
      :endPointX="0"
      :endPointY="200"
      :signal="indicateSignal"
      style="position:relative;top:-240px;left:-180px">
    </indication-line>
    <div :class="$style.infoBoard" :id="'infoBoard_' + name">
      <div :class="$style.header">
        <div v-for="(header,h_index) in headers" :key="h_index" :class="$style.headerCell">
          {{header.label}}
        </div>
      </div>
      <div :class="$style.body">
        <div v-for="(row,r_index) in data" :key="r_index" :class="$style.row">
          <div v-for="(header,h_index) in headers" :key="h_index">
            <div v-if="header.prop === 'index'" :class="$style.rowCell">{{row[header.prop]}}</div>
            <div v-else :class="$style.rowCell"><span class="fas fa-circle" :style="{color: getSignalColor(row[header.prop])}"></span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import indicationLine from './indication-line'
export default {
  components: {
    indicationLine,
  },
  props: {
    name: {
      type: String,
      require: true,
    },
    infoPositionX: {
      type: Number,
      require: false,
      default() {
        return 0;
      }
    },
    infoPositionY: {
      type: Number,
      require: false,
      default() {
        return 0;
      }
    },
    data: {
      type: Array,
      require: false,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      indicateSignal: false,
      titles: ['', 'taskAchievement', 'warehousePerformance', 'warehouseEfficiency', 'staffEfficiency'],
      headers: [
        {prop: 'index', label: '', style: {color: '#fff'}},
        {prop: 'taskAchievement', label: '作業達成率', style: {color: '#fff'}},
        {prop: 'warehousePerformance', label: '倉庫績效', style: {color: '#fff'}},
        {prop: 'warehouseEfficiency', label: '儲位效能', style: {color: '#fff'}},
        {prop: 'staffEfficiency', label: '人員效率', style: {color: '#fff'}},
      ],
    }
  },
  methods: {
    getSignalColor(rate) {
      if (rate >= 95) {
        return 'green'
      }
      else if (rate >= 85) {
        return 'orange'
      }
      else return 'red'
    },
    showInfoBoard(x, y, id) {
      var DOM = document.getElementById(id)
      if (!DOM.style.transform || DOM.style.transform === 'scaleY(0)') {
        this.indicateSignal = true
        DOM.style.left = x.toString() + 'px'
        DOM.style.top = y.toString() + 'px'
        DOM.style.transform = 'scaleY(1)'
        setTimeout (function () {
          DOM.style.maxWidth = '500px'
        }, 200)
      }
      else {
        this.indicateSignal = false
        DOM.style.maxWidth = '0px'
        setTimeout (function () {
          DOM.style.transform = 'scaleY(0)'
        }, 200)
      }
    },
  }
}
</script>

<style lang="scss" module>
@import '@/style/general.module.scss';
.wrapper {
  @include block(40px);
  position:absolute;
  .areaTag {
    @include block(40px);
    display: flex;
    .clickBtn {
      font-size: 30px;
      color: #6BF027;
      cursor: pointer;
    }
    .clickBtn:hover {
      font-size: 35px;
    }
    .areaName {
      font-size: 30px;
      color: #6BF027;
      position:relative;
      left:-35px;
      top: 30px;
    }
  }
  .infoBoard {
    @include border();
    @include block(500px);
    position: relative;
    margin-left: 35px;
    background-color: #000;
    //transition
    transform-origin: 0 100%;
    transform: scaleY(0);
    max-width: 0;
    transition: max-width 0.2s linear, transform 0.2s;
    overflow: hidden;
    .header {
      @include block(500px);
      display: flex;
      text-align: center;
      .headerCell {
        padding: 8px;
        color:#fff;
        width:100px;
        border-right: 1px #fff solid;
        border-bottom: 1px #fff solid;
      }
    }
    .body {
      @include block(500px);
      text-align: center;
      .row {
        display: flex;
        .rowCell {
           color:#fff;
           width:100px;
           border-right: 1px #fff solid;padding:8px;
        }
      }
    }
  }
}
</style>