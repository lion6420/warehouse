<template>
  <div :class="$style.wrapper">
    <card width="380px" height="160px" :color="color">
      <template slot="content">
        <div :class="$style.amount">{{amount}}</div>
        <div :class="$style.label">{{label}}</div>
      </template>
    </card>
  </div>
</template>

<script>
import card from '@/components/utils/card'
export default {
  components: {
    card
  },
  props: {
    amount: {
      type: Number,
      require: true,
    },
    label: {
      type:String,
      require: true,
    },
    color: {
      type: String,
      require: false,
    },
    trend: {
      type: Array,
      require: true,
    }
  }

}
</script>

<style lang='scss' module>
@import '@/styles/general/general.module.scss';
.wrapper {
  color: #fff;
  .amount {
    font-size: 25px;
    font-family: $aphabet;
    padding-top: 25px;
    padding-left: 20px;
  }
  .label {
    font-size: 18px;
    font-family: $zh;
    color:#fff;
    padding-left: 20px;
    padding-top:5px;
  }
}

</style>