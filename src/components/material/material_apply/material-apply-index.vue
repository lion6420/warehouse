<template>
  <div :class="$style.wrapper">
    <div :class="$style.title">Material Apply</div>
    <div :class="$style.header">
      <div :class="$style.selectBox"></div>
      <div :class="$style.img"></div>
      <div :class="$style.header_title">料號</div>
      <div :class="$style.name">品名</div>
      <div :class="$style.supplier">供應商</div>
      <div :class="$style.price_single">單價</div>
      <div :class="$style.price_total">總價</div>
      <div :class="$style.amount">數量</div>
      <div :class="$style.operation"></div>
    </div>
    <div :class="$style.content">
      <material-apply-element v-for="(order,o_index) in orderList" :key="o_index" :order="order"></material-apply-element>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    materialApplyElement: () => import('./material-apply-element'),
  },
  computed: {
    orderList() {
      return this.$store.getters.orderList
    }
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.wrapper {
  @include block(95%);
  margin: auto;
  .title {
    @include block(100%);
    color: var(--text-color);
    font-size: 40px;
    margin-top:10px;
  }
  .header {
    @include block(100%);
    display: flex;
    justify-content: space-around;
    color: var(--text-color);
    text-align: center;
    .selectBox {
      @include block(50px);
    }
    .img {
      @include block(100px);
    }
    .header_title {
      @include block(130px);
    }
    .name {
      @include block(120px);
    }
    .supplier {
      @include block(100px);
    }
    .price_single {
      @include block(100px);
    }
    .price_total {
      @include block(100px);
    }
    .amount {
      @include block(170px);
    }
    .operation {
      @include block(50px);
      margin-left: 10px;
    }
  }
}

</style>