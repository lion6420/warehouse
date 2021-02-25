<template>
  <div :class="$style.login">
    <div :class="$style.title">
      <span style="position:relative; top:10px">LOGIN</span>
    </div>
    <div :class="$style.username">
      <div :class="$style.username_label">
        <span>Username:</span>
      </div>
      <t-input :class="$style.username_input" width="300px"></t-input>
    </div>
    <div :class="$style.password">
      <div :class="$style.password_label">
        <span>Password:</span>
      </div>
      <t-input :class="$style.password_input" width="300px"></t-input>
    </div>
    <div :class="$style.msgArea">
      <span v-if="errorMsg" class="fas fa-exclamation-triangle" style="position:relative; right:5px"></span>
      <span>{{errorMsg}}</span>
    </div>
    <div :class="$style.login_btn" @click="login">
      <div style="padding: 8px 10px;">LOGIN</div>
    </div>
  </div>
</template>

<script>
import tInput from '@/components/utils/input'
export default {
  components: {
    tInput
  },
  data() {
    return {
      show_warning: false,
      errorMsg: '',
      username: '',
      password: '',
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login', this.username)
      this.$router.push('/')
    },
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.login {
  @include block(500px, 300px);
  box-shadow: 0px 0px 20px 1px rgb(15, 15, 15);
  border-radius: 10px;
  color: #fff;
  background-color: var(--bg-color-snd);
  margin: auto;
  margin-top:120px;
  margin-bottom: 40px;
  .title {
    @include block(100%, 50px);
    text-align: center;
    font-size: 35px;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    margin-bottom:10px;
  }
  .username {
    @include block(100%);
    padding: 10px 0px;
    .username_label {
      margin:auto;
      margin-left:100px;
      font-size: 20px;
    }
    .username_input {
      margin:auto;
    }
  }
  .password {
    @include block(100%);
    padding: 10px 0px 0px 0px;
    .password_label {
      margin:auto;
      margin-left:100px;
      font-size: 20px;
    }
    .password_input {
      margin:auto;
    }
  }
  .msgArea {
    height: 20px;
    margin: auto;
    text-align: center;
    color: rgb(255, 49, 49);
  }
  .login_btn {
    @include block(300px);
    @include border();
    border-radius: 20px;
    text-align: center;
    margin: 10px auto;
    background-color: $color-azure;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    cursor: pointer;
  }
}
</style>