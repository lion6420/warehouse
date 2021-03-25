<template>
  <div
    :class="$style.inputWrapper"
    :style="{
      width: width,
      border: border,
    }">
    <div :class="$style.addonBefore">
      <slot name="addonBefore"></slot>
    </div>
    <input
      :class="$style.inputStyle"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :style="{height: height ? height:'30px', 'text-align':textAlign?textAlign:'default'}" />
      <div :class="$style.addonAfter">
        <slot name="addonAfter"></slot>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      require: true,
    },
    width: {
      type: String,
      require: false,
      default() {
        return '200px'
      }
    },
    height: {
      type: String,
      require: false,
    },
    textAlign: {
      type: String,
      require: false,
    },
    placeholder: {
      type: String,
      require: false,
      default() {
        return ''
      }
    },
    addonBefore: {
      type: Boolean,
      require: false,
      default() {
        return false
      }
    },
    addonAfter: {
      type: Boolean,
      require: false,
      default() {
        return false
      }
    },
    border: {
      type: String,
      require: false,
    },
  },
}
</script>

<style lang="scss" module>
@import './common/general.scss';
.inputWrapper {
  @include block(100%, $radius: 3px);
  display: flex;
  font-size: 15px;
  border: 1px solid #c2c2c2;
  background-color: $background-color;
  color: #000;
  .addonBefore {
    padding:4px;
  }
  .inputStyle {
    @include block(100%, 30px);
    outline: none;
    border:none;
    font-size: 15px;
    background-color: $background-color;
  }
  .addonAfter {
    padding:4px;
  }
}
.inputWrapper:focus-within {
    border: 1px solid #6294f1;
    box-shadow: 0px 0px 5px #739ce9;
  }

</style>