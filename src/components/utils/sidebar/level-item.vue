<template>
  <div :class="$style.wrapper" :id="'level-item_' + _uid.toString()">
    <div :class="$style.activebar" :style="{'background-color':active?'rgb(52, 133, 255)':''}"></div>
    <div :class="$style.baseBtn" :style="[itemStyle, {color: active?'#fff':''}]"
      @mouseover="expandNextLevel" @mouseleave="closeNextLevel">
      <div :class="$style.baseBtn_icon"></div>
      <div :class="$style.baseBtn_label">{{label}}</div>
      <div :class="$style.baseBtn_expandIcon" class="fas fa-angle-right"></div>
    </div>
    <div :class="$style.expandArea"
      :id="'expandArea_' + _uid.toString()"
      :style="{'margin-left': width.toString() + 'px'}"
       @mouseover="expandNextLevel" @mouseleave="closeNextLevel">
        <div 
          :class="$style.expandBtn"
          v-for="(expandElement, exp_index) in expandList"
          :key="exp_index">
          <sidebar-item :root="expandElement"></sidebar-item>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'levelItem',
  components: {
    sidebarItem: () => import('./sidebar-item')
  },
  props: {
    activePath: {
      type: String,
      require: false,
      default() {
        return ''
      }
    },
    label: {
      type: String,
      require: false,
    },
    expandList: {
      type: Array,
      require: false,
      default() {
        return []
      }
    },
    itemStyle: {
      type: Object,
      require: false,
      default() {
        return {}
      }
    },
    expandWidth: {
      type: Number,
      require: false,
      default() {
        return 200
      }
    },
    width: {
      type: Number,
      require: false,
      default() {
        return 200
      }
    }
  },
  data() {
    return {
      active: false,
      height: 50,
    }
  },
  mounted() {
    this.checkActive()
  },
  methods: {
    expandNextLevel() {
      const DOM = document.getElementById('expandArea_' + this._uid.toString())
      DOM.style.maxHeight = (this.expandList.length*this.height).toString() + 'px'
      DOM.style.height = (this.expandList.length*this.height).toString() + 'px'
      DOM.style.maxWidth = this.expandWidth.toString() + 'px'
      DOM.style.width = this.expandWidth.toString() + 'px'
    },
    closeNextLevel() {
      const DOM = document.getElementById('expandArea_' + this._uid.toString())
      DOM.style.maxHeight = '0px'
      DOM.style.maxWidth = '0px'
    },

    checkActive() {
      if (this.activePath === '') return
      const path = window.location.pathname
      const urlPattern = new RegExp(this.activePath)
      this.active = urlPattern.test(path)
    }
  },
  watch: {
    '$route'() {
      this.checkActive()
    },
  }
}
</script>

<style lang="scss" module>
@import '../common/general.scss';
@import './sidebar-style.scss';
.wrapper {
  overflow: hidden;
  @include block(200px);
  display: flex;
  color: var(--sidebar-text-color);
  .activebar {
    @include block(4px, $sidebar-item-height);
    background-color: var(--sidebar-active-bar);
  }
  .baseBtn {
    @include block(200px, 50px);
    background-color: transparent;
    text-align: center;
    font-size: 16px;
    display: flex;
    cursor: pointer;
    overflow: hidden;
    text-align: center;
    .baseBtn_icon {
      @include block(20%);
    }
    .baseBtn_label {
      @include block(60%);
      position: relative;
      top: 10px;
    }
    .baseBtn_expandIcon {
      @include block(20%);
      position: relative;
      top: 18px;
      font-size: 15px;
    }
  }
  .baseBtn:hover {
    background-color: var(--sidebar-bg-color-hover);
    color: var(--sidebar-text-color-hover);
  }
  .expandArea {
    display: inline-block;
    position: absolute;
    text-align: center;
    font-size: 20px;
    overflow: hidden;
    max-height: 0px;
    max-width: 0px;
    transition: max-height 0.2s linear, max-width 0.1s linear;
    background-color: var(--sidebar-bg-color);
    box-shadow: 0px 0px 1px 1px rgb(56, 56, 56);
  }
}

</style>