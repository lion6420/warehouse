<template>
  <div :class="$style.wrapper" :id="'dropdown-single-item_' + _uid.toString()">
    <div :class="$style.activebar"></div>
    <router-link :to="link" :class="$style.btn" :id="'item-btn_' + _uid.toString()"
      :style="[itemStyle, {height: height.toString() + 'px'}]">
      <span :class="[$style.baseBtn_icon, icon.class]">{{icon.label}}</span>
      <div :class="$style.btn_label"><span style="position:relative; top:12px">{{label}}</span></div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      require: true,
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
    link: {
      type: String,
      require: false,
      default() {
        return ''
      }
    },
    showSidebar: {
      type: Boolean,
      require: false,
      default() {
        return false
      }
    },
    theme: {
      type: String,
      require: false,
    }
  },
  data() {
    return {
      width: 180,
      height: 50,
    }
  },
  created() {
    if (this.itemStyle.width && typeof(this.itemStyle.width) === 'number') this.width = this.itemStyle.width
    if (this.itemStyle.height && typeof(this.itemStyle.height) === 'number') this.height = this.itemStyle.height
  },
  mounted() {
    this.activeCheck()
  },
  methods: {
    activeCheck() {
      const path = window.location.pathname
      let htmlElement = document.getElementById('dropdown-single-item_' + this._uid.toString())

      //handle multi-slash
      var real_path = ''
      const temp_path = this.$router.history.base + this.link
      for (let i=0; i<temp_path.length; i++) {
        if (i>0 && temp_path[i] == '/' && temp_path[i-1] == '/') continue
        else {
          real_path+=temp_path[i]
        }
      }
      
      if (path === real_path) {
        htmlElement.setAttribute('sidebar-active', 'active')
      }
      else {
        htmlElement.setAttribute('sidebar-active', 'inactive')
      }
    },
  },
  watch: {
    showSidebar() {
      let DOM = document.getElementById('single-item_' + this._uid.toString())
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
  display: flex;
  background-color: var(--sidebar-dropdown-bg-color);
  cursor: pointer;
  .activebar {
    @include block(4px, $sidebar-item-height);
    background-color: var(--sidebar-active-bar);
  }
  .btn {
    @include block(100%);
    display: flex;
    font-size: 16px;
    text-decoration: none;
    color: var(--sidebar-text-color);
    font-weight: var(--sidebar-text-weight);
    background-color: var();
    .baseBtn_icon {
      position:relative;
      margin-left: 12px;
      top: 15px;
      padding:0px 8px;
    }
    .btn_label {
      @include block(100%);
    }
  }
}
.wrapper:hover {
  background-color: var(--sidebar-bg-color-hover);
  color: var(--sidebar-text-color-hover);
}
</style>