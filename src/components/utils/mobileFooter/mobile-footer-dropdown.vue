<template>
  <div :class="$style.wrapper">
    <div :class="$style.item" @click="showMenu">
      <center>
        <div :class="$style.icon"><span :class="icon.class">{{icon.label}}</span></div>
        <router-link :to="link" :class="$style.item_label">
          <span style="position:relative;top:-6px;">{{label}}</span>
        </router-link>
      </center>
    </div>
    <div :class="$style.menu" :id="'menu_' + _uid.toString()">
      <router-link to="/FOL/NSD/hr/management" :class="$style.menu_item"><span>NSD</span></router-link>
      <router-link to="/FOL/CSD/hr/management" :class="$style.menu_item"><span>CSD</span></router-link>
      <router-link to="/FOL/HWD/hr/management" :class="$style.menu_item"><span>HWD</span></router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      require: false,
      default() {
        return ''
      }
    },
    link: {
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
        return {
          class: '',
          label: '',
        }
      }
    }
  },
  data() {
    return {
      if_show_menu: false,
    }
  },
  // mounted() {
  //   window.addEventListener()
  // },
  methods: {
    showMenu() {
      let DOM = document.getElementById('menu_' + this._uid.toString())
      if (!this.if_show_menu) {
        DOM.style.transform = 'scaleY(1)'
        this.if_show_menu = true
      }
      else {
        DOM.style.transform = 'scaleY(0)'
        this.if_show_menu = false
      }
    }
  }
}
</script>

<style lang="scss" module>
@import '../common/general.scss';
.wrapper {
  .item {
    @include block(80px, 45px);
    cursor: pointer;
    .icon {
      @include block(50px);
      color: #fff;
      font-size: 20px;
    }
    .item_label {
      color: #fff;
      font-size: 14px;
    }
  }
  .menu {
    @include block(80px);
    display: flex;
    flex-direction: column;
    background-color: #030038;
    position: fixed;
    bottom: 45px;
    transform-origin: 0 100%;
    transform: scaleY(0);
    transition: transform 0.1s linear;
    .menu_item {
      color: #fff;
      font-size: 20px;
      text-align: center;
      padding: 5px 0px;
    }
  }
}

</style>