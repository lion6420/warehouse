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
          type: 'dropdown',
          label: '收貨',
          icon: {
            class: 'fas fa-warehouse'
          },
          children: [
            {
              label: '實時查詢',
              link: '/achievement/stock/realtime',
            },
            {
              label: '歷史查詢'
            },
            {
              label: '人員效率',
              link: '/achievement/stock/man_efficiency',
            }
          ]
        },
        {
          type: 'dropdown',
          label: '備料',
          icon: {
            class: 'fas fa-truck-moving'
          },
          children: [
            {
              label: '實時查詢'
            },
            {
              label: '歷史查詢'
            },
            {
              label: '人員效率'
            }
          ]
        },
        {
          type: 'dropdown',
          label: '盤點',
          icon: {
            class: 'fas fa-calculator'
          },
          children: [
            {
              label: '實時查詢'
            },
            {
              label: '歷史查詢'
            },
            {
              label: '人員效率'
            }
          ]
        }
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
        {
          label: '人力新增',
          link: '/hr/new_data',
          icon: {
            class: 'fas fa-cloud-upload-alt'
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