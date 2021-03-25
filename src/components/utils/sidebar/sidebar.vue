<template>
  <div
    :class="$style.sidebar"
    :id="'sidebar_' + _uid.toString()"
    :style="{
      width: width,
    }">
    <div v-for="(item, i_index) in menu" :key="i_index" :style="{'margin-top' : i_index === 0 ? '0px': '0px'}">
      <sidebar-item :root="item" :showSidebar="showSidebar" :theme="theme" :width="width"></sidebar-item>
    </div>
  </div>
</template>

<script>
import sidebarItem from './sidebar-item'
export default {
  props: {
    width: {
      type: String,
      require: false,
      default() {
        return '200px'
      }
    },
    menu: {
      type: Array,
      require: true,
      default() {
        return []
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
      default() {
        return 'light'
      }
    },
  },
  components: {
    sidebarItem,
  },
  data() {
    return {

    }
  },
  mounted() {
    this.initTheme()
  },
  methods: {
    initTheme() {
      let htmlElement = document.getElementById('sidebar_' + this._uid.toString())
      if (this.theme === 'dark') {
        htmlElement.setAttribute('sidebar-theme', 'dark')
      }
      else {
        htmlElement.setAttribute('sidebar-theme', 'light')
      }
    },
  },
  watch: {
    showSidebar() {
      let DOM = document.getElementById('sidebar_' + this._uid.toString())
      if (this.showSidebar) {
        DOM.style.maxWidth = '100%'
      }
      else {
        DOM.style.maxWidth = '0px'
      }
    }
  }
}
</script>

<style lang="scss" module>
@import '../common/general.scss';
.sidebar {
  @include block(100%);
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  transition: max-width 0.3s linear;
}
@media screen and (max-width: 700px) {
  .sidebar {
    @include block(100%);
    max-width: 0px;
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
  }
}
</style>