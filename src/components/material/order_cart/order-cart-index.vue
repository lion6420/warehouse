<template>
  <div :class="$style.order_cart">
    <div :class="$style.order_cart_btn_warpper">
      <div :class="$style.order_cart_btn" @click="is_expand_cart_list = is_expand_cart_list ? false:true">
        <span v-if="is_expand_cart_list" class="fas fa-angle-right" style="position:relative;top:2px"></span>
        <span v-if="!is_expand_cart_list" class="fas fa-angle-left" style="position:relative;top:2px"></span>
        <span style="position:relative;top:5px;left:-2px">申請列表</span>
      </div>
    </div>
    <div :class="$style.cart_list" :style="{'max-width':is_expand_cart_list ? '500px':'0px'}">
      <div :class="$style.cart_list_title">
        <div>Material Order List</div>
        <div :class="$style.submit_btn" @click="toSubmitPage">提交<span class="fas fa-external-link-square-alt" style="position:relative; left:5px"></span></div>
      </div>
      <order-cart-list :class="$style.cart_content"></order-cart-list>
      <!--空列表-->
      <div :class="$style.cart_list_empty" v-if="$store.getters.orderList.length === 0">
        <div :class="$style.empty_icon">
          <span class="fas fa-folder-open"></span>
        </div>
        <div :class="$style.empty_label">Empty</div>
      </div>
      <div :class="$style.loading_effect" v-if="cartState === 'loading'">
        <t-spin style="color: #fff; margin: 200px auto"></t-spin>
      </div>
    </div>
  </div>
</template>

<script>
import orderCartList from './order-cart-list'
import tSpin from '@/components/utils/spin'
export default {
  components: {
    orderCartList,
    tSpin
  },
  data() {
    return {
      is_expand_cart_list: false,
    }
  },
  methods: {
    toSubmitPage() {
      this.$router.push({name: 'material_apply'})
    }
  },
  computed: {
    cartState() {
      return this.$store.getters.cartState
    }
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.order_cart {
  display: flex;
  position: fixed;
  right: 0px;
  bottom: 20px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  .order_cart_btn_warpper {
    .order_cart_btn {
      cursor: pointer;
      @include block(20px, 90px);
      margin-top:410px;
      background-color: var(--bg-color-trd);
      color: var(--text-color);
      font-size: 16px;
      writing-mode: vertical-lr;
    }
    .order_cart_btn:hover {
      color: var(--text-color-hover);
    }
  }
  .cart_list {
    @include block(500px);
    background-color: var(--bg-color-trd);
    opacity: 0.95;
    transition: max-width 0.2s linear;
    .loading_effect {
      @include block(500px, 500px);
      background-color: var(--bg-color-trd);
      opacity: 0.8;
      position: absolute;
      top: 0px;
      text-align: center;
    }
    .cart_list_title {
      display: flex;
      justify-content: space-between;
      @include block(500px, 50px);
      color: var(--text-color);
      font-size: 24px;
      padding:5px;
      .submit_btn {
        font-size: 16px;
        margin: 10px 10px 0px 0px;
        cursor: pointer;
      }
      .submit_btn:hover {
        color: var(--text-color-hover);
      }
    }
    .cart_content {
      @include block(500px);
      overflow: auto;
      max-height: 460px;
    }
    .cart_list_empty {
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
  }
}
</style>