<template>
  <section>
    <div class="discountShowToast">
      <div class="discountShowToasttitle">
        OBS Studio安装助手
        <span @click="closeShowToast">
          <img src="../assets/image/close.png" alt="关闭按钮"
        /></span>
      </div>
      <div>暂未检测到支付信息，请在15秒后重试</div>
      <div>
        <span @click="closeShowToast">确定</span>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup >
import { defineEmits } from "vue";

const myEmits = defineEmits(["changeShowToastAge"]);

const closeShowToast = () => {
  myEmits("changeShowToastAge");
};
</script>

<style scoped lang="scss" >
@import "../assets/app.scss";
@import "../assets/scss/payShowToast.scss";
</style>
