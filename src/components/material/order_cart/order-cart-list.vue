<template>
  <div :class="$style.wrapper">
    <div :class="$style.orders" v-for="(order,o_index) in orderList" :key="o_index">
      <!--select box-->
      <div :class="$style.selectBox">
        <input style="width:16px; height:16px;margin-top:25px" type="checkbox"/>
      </div>

      <!--image-->
      <div :class="$style.img">
        <img width="70" height="70" style="margin-top:5px" src="/warehouse/figure/material.jpg" />
      </div>

      <!--description-->
      <div :class="$style.title">
        <div :class="$style.PN">{{order.PN}}</div>
        <div :class="$style.type">Catagory {{order.type}}</div>
      </div>

      <!--amount-->
      <div :class="$style.amount">
        <div :class="$style.minus" @click="cut_amount(order)">
          <span class="fas fa-minus"></span>
        </div>
        <div :class="$style.inputBlock">
          <t-input height="25px" width="100px" textAlign="center" v-model="order.demand" type="number"></t-input>
        </div>
        <div :class="$style.plus" @click="add_amount(order)">
          <span class="fas fa-plus"></span>
        </div>
      </div>

      <div :class="$style.operation">
        <div :class="$style.cancel" @click="remove_order(order)">
          <span style="position:relative;top:2px">刪除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tInput from '@/components/utils/input'
export default {
  components: {
    tInput,
  },
  data() {
    return {

    }
  },
  methods: {
    remove_order(order) {
      this.$store.dispatch('remove_order', order.PN)
    },
    add_amount(order) {
      this.$store.commit('add_amount', order.PN)
    },
    cut_amount(order) {
      this.$store.commit('cut_amount', order.PN)
    }
  },
  computed: {
    orderList() {
      return this.$store.getters.orderList
    },
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.wrapper {
  @include block(100%);
  .orders {
    @include block(100%, 80px);
    display: flex;
    border-bottom: 1px solid;
    border-color: var(--bg-color-forth);
    .selectBox {
      @include block(30px);
      margin: 5px 0px 0px 10px;
    }
    .img {
      @include block(70px);
    }
    .title {
      @include block(110px);
      .PN {
        color: $color-white;
        font-size: 18px;
        margin:15px 0px 5px 10px;
      }
      .type {
        color: var(--text-color);
        margin: 0px 0px 5px 10px;
      }
    }
    .amount {
      @include block(170px);
      display: flex;
      justify-content: space-around;
      .minus {
        @include block(25px, 25px);
        color: $color-red;
        font-size: 20px;
        margin-top:25px;
        cursor: pointer;
      }
      .minus:hover {
        color: $color-red-light;
      }
      .inputBlock {
        @include block(100px, 25px);
        margin-top:24px;
        text-align: center;
      }
      .plus {
        @include block(25px, 25px);
        color: $color-green;
        font-size: 20px;
        margin-top:25px;
        cursor: pointer;
      }
      .plus:hover {
        color: $color-green-light;
      }
    }
    .operation {
      margin-left: 10px;
      .cancel {
        @include block(40px, 25px);
        cursor: pointer;
        border-radius: 5px;
        margin-top:30px;
        background-color: $color-red;
        color: $color-white;
        text-align: center;
        font-family: $zh;
      }
      .cancel:hover {
        background-color: $color-red-light;
      }
    }
  }
}

</style>