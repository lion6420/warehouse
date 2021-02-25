<template>
  <div :class="$style.wrapper" :id="'dropdown-item_' + _uid.toString()">
    <div
      :class="$style.baseBtn"
      @click="operateItem"
      :style="[itemStyle, {height: height.toString() + 'px'}]">
      <span :class="[$style.baseBtn_icon, icon.class]">{{icon.label}}</span>
      <div :class="$style.baseBtn_label"><span style="position:relative;top:12px">{{label}}</span></div>
      <!--expand icon-->
      <div v-if="if_expand" :class="$style.baseBtn_dropicon"><span class="fas fa-caret-down" style="position:relative; top:10px"></span></div>
      <div v-else :class="$style.baseBtn_dropicon"><span class="fas fa-caret-right" style="position:relative; top:10px"></span></div>
    </div>
    <div
      :class="$style.expandArea" :id="'expandArea_' + _uid.toString()"
      :style="[{width: width}, itemStyle]">
      <div 
        :class="$style.expandBtn"
        v-for="(expandElement, exp_index) in expandList"
        :key="exp_index">
        <dropdown-single-item :theme="theme" :icon="expandElement.icon" :label="expandElement.label" :link="expandElement.link"></dropdown-single-item>
      </div>
    </div>
  </div>
</template>

<script>
import dropdownSingleItem from './dropdown-single-item'
export default {
  components: {
    dropdownSingleItem,
  },
  props: {
    expandList: {
      type: Array,
      require: false,
      default() {
        return []
      }
    },
    label: {
      type: String,
      require: true,
    },
    theme: {
      type: String,
      require: false,
      default() {
        return 'light'
      }
    },
    icon: {
      type: Object,
      require: false,
      default() {
        return {}
      }
    },
    itemStyle: {
      type: Object,
      require: false,
      default() {
        return {}
      }
    },
    width: {
      type: String,
      require: false,
      default() {
        return '100%'
      }
    },
    showSidebar: {
      type: Boolean,
      require: false,
      default() {
        false
      }
    }
  },
  data() {
    return {
      active: false,
      if_expand: false,
      num_of_items: 0,
      height: 50,
    }
  },
  created() {
    this.num_of_items = this.expandList.length
    if (this.itemStyle.width && typeof(this.itemStyle.width) === 'number') this.width = this.itemStyle.width
    if (this.itemStyle.height && typeof(this.itemStyle.height) === 'number') this.height = this.itemStyle.height
  },
  mounted() {
    this.activeCheck()
  },
  methods: {
    operateItem() {
      if (this.if_expand) this.closeItem()
      else this.expandItem()
    },
    expandItem() {
      const DOM = document.getElementById('expandArea_' + this._uid.toString())
      this.if_expand = true
      DOM.style.maxHeight = (this.num_of_items*50).toString() + 'px'
    },
    closeItem() {
      const DOM = document.getElementById('expandArea_' + this._uid.toString())
      this.if_expand = false
      DOM.style.maxHeight = '0px'
    },
    activeCheck() {
      const path = window.location.pathname
      let htmlElement = document.getElementById('dropdown-item_' + this._uid.toString())
      if (path === this.link) {
        htmlElement.setAttribute('sidebar-active', 'active')
      }
      else {
        htmlElement.setAttribute('sidebar-active', 'inactive')
      }
    },
  },
  watch: {
    showSidebar() {
      let DOM = document.getElementById('dropdown-item_' + this._uid.toString())
      if (this.showSidebar) {
        DOM.style.maxWidth = '100%'
      }
      else {
        DOM.style.maxWidth = '0px'
      }
    },
    "$route.path": function() {
      this.activeCheck()
    }
  }
}
</script>

<style lang="scss" module>
@import '../common/general.scss';
@import './sidebar-style.scss';
.wrapper {
  @include block(100%);
  cursor: pointer;
  // expand item
  .baseBtn {
    @include block(100%);
    display: flex;
    font-size: 18px;
    color: var(--sidebar-text-color);
    font-weight: var(--sidebar-text-weight);
    background-color: var(--sidebar-bg-color);
    .baseBtn_icon {
      position:relative;
      text-align: center;
      top:15px;
      padding:0px 10px 0px 12px;
    }
    .baseBtn_label {
      @include block(85%);
      margin-left:4px;
    }
    .baseBtn_dropicon {
      @include block(15%);
      text-align: center;
      position:relative;
      font-size:18px;
    }
  }
  .baseBtn:hover {
    background-color: var(--sidebar-bg-color-hover);
    color: var(--sidebar-text-color-hover);
  }
  // single item
  .expandArea {
    @include block(100%);
    overflow: hidden;
    max-height: 0px;
    transition: max-height 0.1s linear;
    .expandBtn {
      display: flex;
    }
  }
}
</style>