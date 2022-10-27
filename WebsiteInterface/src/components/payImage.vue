<script setup lang="ts" >
import { defineEmits, defineProps, inject, ref } from "vue";
import PayShowToast from "./payShowToast.vue";
const myEmits = defineEmits(["changePayImageAge", "changUserPayAge"]);

const myProps = defineProps({
  payNum: {
    type: Object,
    default: [],
  },
  isDiscount: {
    type: Boolean,
    default: false,
  },
  wechatNum: {
    type: String,
    default: "",
  },
});

const isFinish = ref<boolean>(false);
const isShowToast = ref<boolean>(false);

const closeDownloadAppPage = inject("closeDownloadAppPage") as () => void;
const changePayImageAge = (): void => {
  if (myProps.isDiscount) closeDownloadAppPage();
  else myEmits("changePayImageAge");
};

const userFinishPay = (event: any): void => {
  myEmits("changUserPayAge");
  isFinish.value = true;
  isShowToast.value = true;
};

const changeShowToastAge = () => {
  isShowToast.value = false;
};
</script>

<template>
  <section class="cover">
    <pay-show-toast
      @changeShowToastAge="changeShowToastAge"
      v-if="isShowToast"
    />
    <div class="payImageBox">
      <div class="payTitle">
        限时优惠-激活VIP会员
        <span @click="changePayImageAge"
          ><img src="../assets/image/close.png" alt=""
        /></span>
      </div>
      <div>
        <img src="../assets/image/payImage.png" alt="支付二维码" />
        <img
          :src="
            myProps.isDiscount
              ? myProps.payNum[1].imageUrl
              : myProps.payNum[0].imageUrl
          "
          alt="付款二维码"
        />
        <span class="payNum"
          >￥{{
            myProps.isDiscount
              ? myProps.payNum[1].amount
              : myProps.payNum[0].amount
          }}.00</span
        >
      </div>
      <p>
        <span>
          <span v-if="!isFinish" @click="userFinishPay">我已完成付款</span>
          <a :href="myProps.payNum[0].url" target="_blank" v-if="isFinish"
            >我已完成付款</a
          >
        </span>
        <span @click="changePayImageAge">关闭</span>
      </p>
      <p>
        *付款后点击"我已付款完成"即可, 遇到问题可联系客服微信 &nbsp;&nbsp;{{
          myProps.wechatNum
        }}
      </p>
    </div>
  </section>
</template>



<style scoped lang="scss">
@import "../assets/app.scss";
@import "../assets/scss/payImage.scss";
</style>
