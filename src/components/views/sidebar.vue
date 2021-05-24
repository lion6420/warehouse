<template>
  <div :class="$style.wrapper">
    <sidebar theme="dark" :menu="menu" style="margin-top:60px"></sidebar>
  </div>  
</template>

<script>
import sidebar from '@/components/utils/sidebar/sidebar'
export default {
  components: {
    sidebar,
  },
  props: {
    menu_type: {
      type: String,
      require: true,
      default() {
        return 'achievement'
      }
    }
  },
  data() {
    return {
      menu: [],
      menu_achievement: [
        {
          label: '達成總覽',
          icon: {
            class: 'fas fa-warehouse'
          },
          link: '/achievement/dashboard'
        },
        {
          label: '人員效率',
          icon: {
            class: 'fas fa-truck-moving'
          },
          link: '/achievement/man_efficiency'
        },
      ],
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
    this.getMenu()
  },
  methods: {
    getMenu() {
      if (this.menu_type === 'achievement') {
        this.menu = this.menu_achievement
      }
      else if (this.menu_type === 'hr') {
        this.menu = this.menu_human_resources
      }
      else if (this.menu_type === 'material') {
        this.menu = this.menu_material
      }
    }
  },
  watch: {
    menu_type() {
      this.getMenu()
    }
  }
}
</script>
<style lang="scss" module>
@import '@/styles/general.scss';

</style>