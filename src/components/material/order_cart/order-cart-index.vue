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
      <div :class="$style.cart_list_title">Material Order List</div>
      <order-cart-list></order-cart-list>
      <!--空列表-->
      <div :class="$style.cart_list_empty" v-if="$store.getters.orderList.length === 0">
        <div :class="$style.empty_icon">
          <span class="fas fa-folder-open"></span>
        </div>
        <div :class="$style.empty_label">Empty</div>
      </div>
    </div>
  </div>
</template>

<script>
import orderCartList from './order-cart-list'
export default {
  components: {
    orderCartList,
  },
  data() {
    return {
      is_expand_cart_list: false,
    }
  },
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
    @include block(500px, 500px);
    overflow: hidden;
    background-color: var(--bg-color-trd);
    opacity: 0.95;
    transition: max-width 0.2s linear;
    .cart_list_title {
      color: var(--text-color);
      font-size: 24px;
      padding:5px;
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