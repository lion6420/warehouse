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
  data() {
    return {
      menu: [
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
              label: '人員效率'
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
      ]
    }
  }
}
</script>
<style lang="scss" module>
@import '@/styles/general.scss';

</style>