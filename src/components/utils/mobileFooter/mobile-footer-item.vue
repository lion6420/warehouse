<template>
  <div :class="$style.wrapper">
    <div :class="$style.item">
      <center>
        <router-link :to="link" :class="$style.item_label">
          <div :class="$style.icon"><span :class="icon.class">{{icon.label}}</span></div>
          <span style="position:relative;top:-5px;">{{label}}</span>
        </router-link>
      </center>
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

    }
  }
}
</script>

<style lang="scss" module>
@import '../common/general.scss';
.wrapper {
  @include block();
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
      font-family: Microsoft JhengHei;
    }
  }
}

</style>