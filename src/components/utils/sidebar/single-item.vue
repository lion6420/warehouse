<template>
  <div :class="$style.wrapper" :id="'single-item_' + _uid.toString()">
    <div :class="$style.activebar"></div>
    <router-link :to="link" :class="$style.btn" :id="'item-btn_' + _uid.toString()"
      :style="[itemStyle]">
      <div :class="[$style.baseBtn_icon, icon.class]">{{icon.label}}</div>
      <div :class="$style.btn_label"><span style="position:relative; top:12px">{{label}}</span></div>
      <div style="width:20%"></div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'single-item',
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
    theme: {
      type: String,
      require: false,
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
    this.activeCheck()
  },
  methods: {
    activeCheck() {
      const path = window.location.pathname
      let htmlElement = document.getElementById('single-item_' + this._uid.toString())

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
  @include block(180px, $sidebar-item-height);
  display: flex;
  background-color: transparent;
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
    text-align: center;
    .baseBtn_icon {
      @include block(20%);
      position:relative;
      top: 15px;
      padding:0px 8px;
    }
    .btn_label {
      @include block(60%);
    }
  }
}
.wrapper:hover {
  background-color: var(--sidebar-bg-color-hover);
  color: var(--sidebar-text-color-hover);
}
</style>