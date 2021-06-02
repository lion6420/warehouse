<template>
  <div :class="$style.wrapper" :id="'mobile_sidear_' + _uid.toString()">
    <span class="fas fa-bars" :class="$style.expand_btn" @click="manipulate_menu"></span>
    <div :class="$style.menu" :id="'menu_' + _uid.toString()">
      <router-link :to="item.link" :class="$style.menu_item" v-for="(item,i_index) in menu" :key="i_index" :id="'item-btn_' + _uid.toString()">
        <div :class="item.icon.class" style="font-size: 20px;padding: 12px">{{item.icon.label}}</div>
        <div style="padding:12px">{{item.label}}</div>
        <div style="width: 10%"></div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      if_expand: false,
      menu: [],

      menu_human_resources: [
        {
          label: '人力統計',
          link: '/hr/statistics',
          icon: {
            class: 'fas fa-chart-bar'
          }
        },
        {
          label: '人力維護',
          link: '/hr/maintenance',
          icon: {
            class: 'fas fa-wrench'
          }
        },
      ],
      menu_material: [
        {
          label: '物料列表',
          link: '/material/list',
          icon: {
            class: 'fas fa-list'
          }
        },
        {
          label: '物料申請',
          link: '/material/apply',
          icon: {
            class: 'fas fa-shopping-cart'
          }
        },
        {
          label: '歷史紀錄',
          link: '/material/history',
          icon: {
            class: 'fas fa-history'
          }
        }
      ]
    }
  },
  created() {
    window.addEventListener('click', this.clickEventHandler)
    this.getMenu()
  },
  methods: {
    manipulate_menu() {
      if (this.if_expand) this.close_menu()
      else this.expand_menu()
    },
    expand_menu() {
      let DOM = document.getElementById('menu_' + this._uid.toString())
      DOM.style.display = 'block'
      setTimeout(function showMenu() {
        DOM.style.maxHeight = '500px'
      }, 10)
      this.if_expand = true
    },
    close_menu() {
      let DOM = document.getElementById('menu_' + this._uid.toString())
      DOM.style.maxHeight = '0px'
      setTimeout(function hideMenu() {
        DOM.style.display = 'none'
      }, 10)
      this.if_expand = false
    },
    clickEventHandler(evt) {
      let DOM = document.getElementById('mobile_sidear_' + this._uid.toString())
      if (DOM.contains(evt.target)) return
      else this.close_menu()
    },
    getMenu() {
      let regex_hr = new RegExp('/hr')
      let regex_material = new RegExp('/material')
      let path = window.location.pathname
      
      if (regex_hr.test(path)) {
        this.menu = this.menu_human_resources
      }
      else if (regex_material.test(path)) {
        this.menu = this.menu_material
      }
      else this.menu = []
    }
  },
  watch: {
    "$route.path"() {
      this.getMenu()
    }
  },
  destroyed() {
    window.removeEventListener('click', this.clickEventHandler)
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.wrapper {
  .expand_btn {
    font-size:25px;
    padding:15px;
    margin-right:10px;
    cursor: pointer;
  }
  .menu {
    @include block(150px);
    max-height: 0px;
    box-shadow: 0px 0px 5px 2px rgb(41, 41, 41);
    background-color: var(--bg-color);
    position:absolute;
    right: 10px;
    top: 40px;
    transition: max-height 0.2s linear;
    .menu_item {
      display: flex;
      cursor: pointer;
      color: var(--text-color);
    }
    .menu_item:hover {
      background-color: var(--bg-color-snd);
    }
  }
}
</style>