<template>
<div :class="$style.tabs" :id="'tabs_' + _uid.toString()">
  <ul :class="$style.tabList">
    <li v-for="(tab,index) in tabs" :key="index"
      :style="isActive(tab.tabKey)"
      :class="$style.tabBtn"
      :id="'tab_' + tab.tabKey + '_' + _uid.toString()">
      <a @click="tabChange(tab)">{{tab.label}}</a>
    </li>
  </ul>
  <div :class="$style.slider" :id="'slider_' + _uid.toString()"></div>
  <div :class="$style.tabPane" :id="'tabPane_' + _uid.toString()">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      require: true,
      default () {
        return this.defaultKey
      }
    },
  },
  data() {
    return {
      tabs: [],
      tabWidth: {},
    }
  },
  created() {
    this.tabs = this.$children
  },
  mounted() {
    var self = this
    this.$nextTick(function init() {
      self.initialization()
    })
  },
  methods: {
    initialization() {
      this.tabWidth = this.keepWidth()
      for (let i=0; i<this.tabs.length; i++) {
        if (this.tabs[i].tabKey === this.value) {
          this.tabChange(this.tabs[i])
        }
      }
      this.$emit('onTabChange', this.value)
    },
    isActive(key) {
      if (key === this.value) {
        return {
          'color': '#2164E7',
        }
      }
    },
    tabChange(tab) {
      this.$emit('input', tab.tabKey)
      this.moveSlider(tab)
    },

    keepWidth() {
      var keep = {}
      var DOM
      for (let i=0; i<this.tabs.length; i++) {
        DOM  = document.getElementById('tab_' + this.tabs[i].tabKey + '_' + this._uid.toString())
        keep[this.tabs[i].tabKey] = DOM.getBoundingClientRect().width
      }
      return keep
    },

    //slider control
    moveSlider(tab) {
      var DOM  = document.getElementById('slider_' + this._uid.toString())
      var left = 0
      for (let i=0; i<this.tabs.length; i++) {
        if (this.tabs[i].tabKey === tab.tabKey) break
        left+=this.tabWidth[this.tabs[i].tabKey]
      }
      DOM.style.left = left + 'px'
      DOM.style.width = this.tabWidth[tab.tabKey] + 'px'
    },
  },
  watch: {
    value() {
      this.$emit('onTabChange', this.value)
    },
  },
}
</script>

<style lang="scss" module>
@import '../common/general.scss';
.tabs {
  @include block(100%);
  .tabList {
    @include block(100%);
    display: flex;
    justify-content: flex-start;
    list-style: none;
    border-bottom: 3px solid #D9D9D9;
    margin:auto;
    padding:0px;
    .tabBtn {
      font-size: 24px;
      padding: 0px 15px;
      font-family: Microsoft JhengHei;
      font-weight:bold;
    }
  }
  .slider {
    position: relative;
    left: 0;
    height:0px;
    width:0px;
    top:-3px;
    border-bottom: solid 3px #2164E7;
    transition: left 0.15s;
  }
  .tabPane {
    @include block(100%);
    margin:auto;
  }
}
</style>