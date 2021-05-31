<template>
  <div :class="$style.wrapper">
    <div :class="$style.title">
      <div>Material Apply</div>
    </div>
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
      <div :class="$style.list_empty" v-if="!orderList.length">
        <div :class="$style.empty_icon">
          <span class="fas fa-folder-open"></span>
        </div>
        <div :class="$style.empty_label">Empty</div>
      </div>
    </div>
    <br/>
    <hr style="border-color: #AAAAAA"/>
    <div :class="$style.total_row">
      <div>總計: {{total_price}}</div>
      <div style="float:right">
        <div :class="$style.submit_btn" @click="submit_order">
          <span v-if="!loading_submit">送出</span>
          <t-spin v-if="loading_submit" style="padding: 5px 0px"></t-spin>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tSpin from '@/components/utils/spin'
export default {
  components: {
    materialApplyElement: () => import('./material-apply-element'),
    tSpin
  },
  data() {
    return {
      loading_submit: false,
    }
  },
  methods: {
    submit_order() {
      if (!this.orderList.length) {
        alert('列表為空')
        return
      }
      var self = this
      this.loading_submit = true
      setTimeout(function mock_submit_loading() {
        self.loading_submit = false
        alert('送出成功')
        self.$store.dispatch('clear_order')
      }, 500)
    }
  },
  computed: {
    orderList() {
      return this.$store.getters.orderList
    },
    total_price() {
      return this.$store.getters.total_price
    }
  },
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
  .list_empty {
    @include block(100%);
    margin-top:100px;
    .empty_icon {
      @include block(140px);
      color: var(--text-color);
      font-size: 80px;
      text-align: center;
      margin: auto;
    }
    .empty_label {
      color: var(--text-color);
      font-size: 30px;
      text-align: center;
      font-family: $aphabet;
    }
  }
  .total_row {
    color: var(--text-color-hover);
    font-size: 25px;
    float: right;
    .submit_btn {
      background-color: $color-btn;
      width: 70px;
      text-align: center;
      border-radius: 5px;
      font-size: 20px;
      cursor: pointer;
      margin-top:10px;
    }
    .submit_btn:hover {
      background-color: $color-btn-hover;
    }
  }
}

</style>