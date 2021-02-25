<template>
  <div :class="$style.wrapper" :id="'sidebar_item_' + _uid.toString()">
    <div v-if="root.type === 'level'">
      <level-item :showSidebar="showSidebar" :label="root.label" :expandList="root.children" :itemStyle="root.style"
        :expandWidth="root.children[0].style ? root.children[0].style.width : null"
        :activePath="root.activePath?root.activePath:''">
        <sidebar-item
          v-for="(child, child_index) in root.children"
          :key="child_index"
          :root="child">
        </sidebar-item>
      </level-item>
    </div>
    <div v-else-if="root.type === 'dropdown'">
      <dropdown-item :showSidebar="showSidebar" :label="root.label" :icon="root.icon" :expandList="root.children" :itemStyle="root.style"
        :theme="theme">
      </dropdown-item>
    </div>
    <div v-else>
      <single-item :showSidebar="showSidebar" :label="root.label" :icon="root.icon" :itemStyle="root.style" :link="root.link"
        :theme="theme">
      </single-item>
    </div>
  </div>
</template>

<script>
import levelItem from './level-item'
import dropdownItem from './dropdown-item'
import singleItem from './single-item'

export default {
  name: 'sidebarItem',
  components: {
    levelItem,
    dropdownItem,
    singleItem,
  },
  props: {
    root: {
      type: Object,
      require: true,
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
      active: false,
    }
  },
  created() {
  },
  methods: {
  },
  watch: {
    showSidebar() {
      let DOM = document.getElementById('sidebar_item_' + this._uid.toString())
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

</style>