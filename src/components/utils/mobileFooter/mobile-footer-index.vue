<template>
  <div :class="$style.mobileFooter">
    <mobile-footer-item label="Global" link="/global" :icon="{class: 'fas fa-globe-asia'}" :class="$style.footerItem"></mobile-footer-item>
    <mobile-footer-dropdown label="FOL" :icon="{class: 'fas fa-warehouse'}" :class="$style.footerItem"></mobile-footer-dropdown>
    <mobile-footer-item label="FOC" :icon="{class: 'fas fa-warehouse'}" :class="$style.footerItem"></mobile-footer-item>
    <mobile-footer-item label="FCZ" :icon="{class: 'fas fa-warehouse'}" :class="$style.footerItem"></mobile-footer-item>
  </div>
</template>

<script>
import mobileFooterItem from './mobile-footer-item'
import mobileFooterDropdown from './mobile-footer-dropdown'
export default {
  components: {
    mobileFooterItem,
    mobileFooterDropdown,
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" module>
@import '../common/general.scss';
.mobileFooter {
  @include block(100%, 45px);
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0px;
  z-index: 1;
  background-color: #030038;
  .footerItem {
    margin: auto;
  }
}

</style>