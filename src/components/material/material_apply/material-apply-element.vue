<template>
  <div :class="$style.wrapper">
    <!--select box-->
    <div :class="$style.selectBox">
      <input style="width:16px; height:16px;margin-top:25px;margin-left: 10px" type="checkbox"/>
    </div>

    <!--image-->
    <div :class="$style.img">
      <img width="70" height="70" style="margin-top:5px" src="/figure/material.jpg" />
    </div>

    <!--description-->
    <div :class="$style.title">
      <div :class="$style.PN">{{order.PN}}</div>
      <div :class="$style.type">Catagory {{order.type}}</div>
    </div>

    <div :class="$style.name">
      <span style="position:relative; top:21px">{{order.name}}</span>
    </div>

    <div :class="$style.supplier">
      <span style="position:relative; top:21px">{{order.supplier}}</span>
    </div>

    <div :class="$style.price_single">
      <span style="position:relative; top:21px">${{order.price}}</span>
    </div>

    <div :class="$style.price_total">
      <span style="position:relative; top:21px">$ {{order.price*order.demand}}</span>
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
</template>

<script>
import tInput from '@/components/utils/input'
export default {
  components: {
    tInput,
  },
  props: {
    order: {
      type: Object,
      require: true,
    },
  },
  methods: {
    remove_order(order) {
      this.$store.dispatch('remove_order', order.PN)
    },
    add_amount(order) {
      this.$store.dispatch('add_amount', order.PN)
    },
    cut_amount(order) {
      this.$store.dispatch('cut_amount', order.PN)
    }
  },
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.wrapper {
  display: flex;
  justify-content: space-around;
  @include block(100%, 80px);
  border-radius: 5px;
  background-color: var(--bg-color-snd);
  margin-top: 10px;
  text-align: center;
  .selectBox {
    @include block(50px);
  }
  .img {
    @include block(100px);
  }
  .title {
    @include block(130px);
    .PN {
      color: $color-white;
      font-size: 20px;
      margin:15px 0px 5px 10px;
    }
    .type {
      color: var(--text-color);
      margin: 0px 0px 5px 10px;
    }
  }
  .name {
    @include block(120px);
    font-size: 20px;
    color: var(--text-color);
  }
  .supplier {
    @include block(100px);
    font-size: 20px;
    color: var(--text-color);
  }
  .price_single {
    @include block(100px);
    font-size: 20px;
    color: var(--text-color);
  }
  .price_total {
    @include block(100px);
    font-size: 20px;
    color: var(--text-color);
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
    @include block(50px);
    margin-left: 10px;
    .cancel {
      @include block(40px, 25px);
      cursor: pointer;
      border-radius: 5px;
      margin-top:25px;
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
</style>