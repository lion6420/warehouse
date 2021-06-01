<template>
  <div :class="$style.mobileFooter">
    <mobile-footer-item label="達成狀態" link="/achievement/dashboard" :icon="{class: 'fas fa-warehouse'}" :class="$style.footerItem"></mobile-footer-item>
    <mobile-footer-item label="人力管理" link="/hr/statistics" :icon="{class: 'fas fa-user-circle'}" :class="$style.footerItem"></mobile-footer-item>
    <mobile-footer-item label="物料訊息" link="/material/list" :icon="{class: 'fas fa-shopping-cart'}" :class="$style.footerItem"></mobile-footer-item>
  </div>
</template>

<script>
import mobileFooterItem from '@/components/utils/mobileFooter/mobile-footer-item'
export default {
  components: {
    mobileFooterItem,
  },
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.mobileFooter {
  @include block(100%, 45px);
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0px;
  z-index: 1;
  background-color: var(--bg-color);
  .footerItem {
    margin: auto;
  }
}

</style>