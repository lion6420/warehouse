<template>
  <div :class="$style.wrapper" :id="'level-item_' + _uid.toString()" :style="{width: width.toString() + 'px'}">
    <div :class="$style.activebar" :style="{'background-color':active?'rgb(52, 133, 255)':''}"></div>
    <div :class="$style.baseBtn" :style="[itemStyle, {color: active?'#fff':''}]"
      @mouseover="expandNextLevel" @mouseleave="closeNextLevel">
      <div :class="$style.baseBtn_icon" v-if="Object.keys(icon).length"></div>
      <div :class="$style.baseBtn_label" :style="{'padding-left': Object.keys(icon).length > 0 ? '5px':'20px'}">{{label}}</div>
      <div :class="$style.baseBtn_expandIcon" class="fas fa-angle-right"></div>
    </div>
    <div :class="$style.expandArea"
      :id="'expandArea_' + _uid.toString()"
      :style="{'margin-left': (width+1).toString() + 'px', width: width.toString() + 'px'}"
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
    icon: {
      type: Object,
      require: false,
      default() {
        return {}
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
        return 220
      }
    },
    width: {
      type: Number,
      require: false,
      default() {
        return 220
      }
    },
  },
  data() {
    return {
      active: false,
      height: 50,
    }
  },
  mounted() {
    this.activeCheck()
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

    activeCheck() {
      const path = window.location.pathname
      let htmlElement = document.getElementById('level-item_' + this._uid.toString())

      //handle multi-slash
      var real_path = ''
      const temp_path = this.$router.history.base + this.link
      for (let i=0; i<temp_path.length; i++) {
        if (i>0 && temp_path[i] == '/' && temp_path[i-1] == '/') continue
        else {
          real_path+=temp_path[i]
        }
      }
      const regex_path = new RegExp(path)
      if (regex_path.test(real_path)) {
        htmlElement.setAttribute('sidebar-active', 'active')
      }
      else {
        htmlElement.setAttribute('sidebar-active', 'inactive')
      }
    },
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
  @include block(220px, $sidebar-item-height);
  display: flex;
  color: var(--sidebar-text-color);
  .activebar {
    @include block(4px, $sidebar-item-height);
    background-color: var(--sidebar-active-bar);
  }
  .baseBtn {
    @include block(100%, 50px);
    background-color: transparent;
    font-size: 18px;
    display: flex;
    cursor: pointer;
    overflow: hidden;
    .baseBtn_icon {
      @include block(20%);
    }
    .baseBtn_label {
      @include block(70%);
      padding-top:12px;
    }
    .baseBtn_expandIcon {
      @include block(10%);
      font-size: 18px;
      padding-top:13px;
    }
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
    @include border();
  }
}
.wrapper:hover {
  background-color: var(--sidebar-bg-color-hover);
  color: var(--sidebar-text-color-hover);
}

</style>