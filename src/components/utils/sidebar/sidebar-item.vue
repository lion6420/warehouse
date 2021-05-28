<template>
  <div :class="$style.wrapper" :id="'sidebar_item_' + _uid.toString()">
    <div v-if="root.type === 'level'">
      <level-item :label="root.label" :expandList="root.children" :itemStyle="root.style"
        :activePath="root.activePath?root.activePath:''" :width="width">
      </level-item>
    </div>
    <div v-else-if="root.type === 'dropdown'">
      <dropdown-item :label="root.label" :icon="root.icon" :expandList="root.children"
        :itemStyle="root.style" :theme="theme" :activePath="root.activePath?root.activePath:''" :width="width">
      </dropdown-item>
    </div>
    <div v-else>
      <single-item :label="root.label" :icon="root.icon" :itemStyle="root.style" :link="root.link"
        :theme="theme" :width="width">
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
    width: {
      type: Number,
      require: false,
      default() {
        return 220
      }
    },
    root: {
      type: Object,
      require: true,
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