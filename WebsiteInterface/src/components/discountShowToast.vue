<script lang="ts" setup >
import { defineEmits, defineProps, computed } from "vue";
const myEmits = defineEmits(["closeDiscountShowToast"]);
const myProps = defineProps({
  payNum: {
    type: Object,
    default: [],
  },
});
const discountNum = computed(() => {
  return myProps.payNum[0].amount - myProps.payNum[1].amount;
});

const closeDiscountShowToast = () => {
  myEmits("closeDiscountShowToast");
};
</script>

<template>
  <section>
    <div class="discountShowToast">
      <div class="discountShowToasttitle">
        OBS Studio安装助手
        <span @click="closeDiscountShowToast">
          <img src="../assets/image/close.png" alt="关闭按钮"
        /></span>
      </div>
      <div>
        恭喜您！为您抽中一张{{
          discountNum
        }}元的优惠劵，超低价即可使用，仅限本次使用。
      </div>
      <div>
        <span @click="closeDiscountShowToast">确定</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss" >
@import "../assets/app.scss";
@import "../assets/scss/discountShowToast.scss";
</style> >