<script setup lang="ts" >
</script>

<template>
  <section>
    <div class="payMessageBox">
      <ul class="payMessageHandleBar">
        <li>订单号: <input type="text" /></li>
        <li>交易id: <input type="text" /></li>
        <li>
          <span>
            <img src="../../src/assets/image/seek.png" alt="查找" /> 查找</span
          >
          <span>
            <img src="../../src/assets/image/reset.png" alt="重置" /> 重置</span
          >
        </li>
      </ul>
      <ul class="payMessageDataBox">
        <li>订单号</li>
        <li>金额</li>
        <li>创建日期</li>
        <li>支付</li>
        <li>产品</li>
        <li>机器id</li>
        <li>交易id</li>
        <li>付款时间</li>
      </ul>
      <ul class="payMessageDataBox">
        <li>2022101420372199783</li>
        <li>45</li>
        <li>2022/10/14 下午8:37:24</li>
        <li><span>否</span></li>
        <li>标准版原价</li>
        <li>57d15791-b3ec-4404-8cc3-b3e2a212df1d</li>
        <li>交易id</li>
        <li>付款时间</li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss" >
@import "../../src/assets/app.scss";
@import "../../src/assets/scss/payMessage.scss";
</style>
