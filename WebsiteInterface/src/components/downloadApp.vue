<script setup lang="ts" >
import { ref, reactive, computed, onMounted, defineEmits } from "vue";
import axios from "axios";

import PayImage from "./payImage.vue";
import DiscountShowToast from "./discountShowToast.vue";
import IndexProgressBar from "../components/indexProgressBar.vue";

const isShowProgressBar=ref<boolean>(false);
const isChoseDownload = ref<boolean>(false);
const choseClassification = ref<number>(4);
const isDiscount = ref<boolean>(false);
const isDiscountToastShow = ref<boolean>(false);
const isPay = ref<boolean>(false); //是否展示收款码
const userPay = ref<boolean>(false); //用户是否已支付
const wechatNum = ref<string>("");

interface payMessage {
  data: { name: string; amount: number; imageUrl: string; num: number }[];
  textArr:string[]
}

onMounted(async () => {
  const result = await axios.get(
    "http://39.108.154.43:8000/backstage/getSetupMessage"
  );
  wechatNum.value = result.data.results[0].wechatNum;
  payMessage.data = JSON.parse(result.data.results[0].payData);
});

const myEmits = defineEmits(["closeDownloadAppPage"]);

const payMessage = reactive<payMessage>({
  data: [{ name: "", amount: 0, imageUrl: "", num: 0 }],
  textArr:["正在寻找最快的下载路径","正在获取OBS Studio版本信息","正在获取OBS Studio完整索引","正在寻找最快的下载路线","开始下载OBS Studio资源","下载中请稍后","一切准备就绪"]
});

const payNum = computed(() => {
  const { data } = payMessage;
  if (choseClassification.value !== 0) return [data[2], data[3]];
  else return [data[0], data[1]];
});

const choseDownload = (event: any): void => {
  isShowProgressBar.value=true;
  const timer=setTimeout(()=>{
    if(isShowProgressBar.value){
      if (event.target.dataset.num !== "4") isChoseDownload.value = true;
      else isChoseDownload.value = false;
      choseClassification.value = Number(event.target.dataset.num);
      isShowProgressBar.value=false;
    }
    clearTimeout(timer);
  },12000)
};

const closeProgressBar=()=>{
  isShowProgressBar.value=false;
}

const changePayImageAge = () => {
  isPay.value = !isPay.value;
};

const closeDiscountShowToast = () => {
  isDiscountToastShow.value = false;
  isDiscount.value = true;
  isPay.value = true;
};

const closeDownloadApp = () => {
  if (userPay.value) return myEmits("closeDownloadAppPage");
  if (!isDiscount.value && choseClassification.value !== 4)
    return (isDiscountToastShow.value = true);
  myEmits("closeDownloadAppPage");
};

// 关闭优惠劵选项
const changUserPayAge = () => {
  userPay.value = true;
};
</script>


<template>
  <section class="downloadAppBackground">
    <IndexProgressBar 
    v-if="isShowProgressBar" 
    @closeProgressBar="closeProgressBar"  
    text="正在获取OBS Studio版本信息"
    time="12s"
    isChange
    :textArr=payMessage.textArr
    />
    <pay-image
      v-if="isPay"
      @changePayImageAge="changePayImageAge"
      @changUserPayAge="changUserPayAge"
      :payNum="payNum"
      :isDiscount="isDiscount"
      :wechatNum="wechatNum"
    />
    <discount-show-toast
      v-if="isDiscountToastShow"
      @closeDiscountShowToast="closeDiscountShowToast"
      :payNum="payNum"
    />
    <div class="downloadAppBox">
      <div class="downloadAppBoxTitle">
        <span
          ><img
            src="../../src/assets/image/minilogo.png"
            alt="OBS Studio官方正版安装中心"
        /></span>
        <span>OBS Studio安装助手 </span>
        <span>
          <img
            src="../assets/image/close.png"
            alt="关闭按钮"
            @click="closeDownloadApp"
        /></span>
      </div>
      <div>
        <span>已下载98万次</span>
        <img
          src="../assets/image/downloadBoxTitle.png"
          alt="banner"
          v-if="choseClassification === 4 || choseClassification === 0"
        />
        <img
          src="../assets/image/downloadBoxTitle1.png"
          alt="banner"
          v-if="choseClassification === 1"
        />
        <img
          src="../assets/image/downloadBoxTitle2.png"
          alt="banner"
          v-if="choseClassification === 2"
        />
      </div>
      <div class="downloadAppContent">
        <div
          class="leftImage"
          v-if="choseClassification === 4 || choseClassification === 0"
        >
          <img src="../assets/image/downloadLeftLogo.png" alt="" />
        </div>
        <div class="leftImage" v-if="choseClassification === 1">
          <img src="../assets/image/downloadLeftLogo1.png" alt="" />
        </div>
        <div class="leftImage" v-if="choseClassification === 2">
          <img src="../assets/image/downloadLeftLogo2.png" alt="" />
        </div>

        <div class="rightDownload" v-if="!isChoseDownload">
          <div class="noDownload">
            <div>
              <span>软件介绍:</span>
              <p>
                OBS
                Studio是一款用于实时流媒体和屏幕录制的软件，为了高效捕获，台成，编码，记录和流传输视频内容而设计，支持所有流媒体平台
              </p>
            </div>
            <div>
              <p>
                OBS Studio
                可用于直播带货、无人直播、游戏直播、课程直播、娱乐直播、户外直播、绿布抠图等多种直播场景、功能丰富强大，软件经百度杀毒中心验证，无病毒，无广告，绿色安全，永久使用，请放心下载
              </p>
              <div>
                <span>版本:</span><br />
                <select>
                  <option>OBS Studio 2022官方中文版</option>
                </select>
              </div>
            </div>
            <div @click="choseDownload($event)">
              <div data-num="0">安装标准版</div>
              <div data-num="1">美颜版安装 <span>真人出镜推荐</span></div>
              <div data-num="2">多推流版安装<span>多平台开播推荐</span></div>
            </div>
          </div>
        </div>

        <div class="rightDownload" v-if="isChoseDownload">
          <div class="download">
            <p>软件安装包已准备就绪，付款后即可立刻安装，感谢您的支持!</p>
            <p>安装前您需要先购买会员已激活软件</p>
            <p>
              购买后即可永久使用，不想电脑，不限安装次数，并且可以永久免费更新！同时我们免费提供技术支持，协助您解决安装可能遇到的各种问题
            </p>
            <div>
              <p>
                应付金额：<span>￥{{ payNum[0].amount }}.00</span>
              </p>
              <p>本次优惠价 <span>&nbsp;&nbsp;原价298&nbsp;&nbsp;</span></p>
            </div>
            <div>
              <span @click="changePayImageAge">立刻购买</span>
              <span>继续安装</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped lang="scss" >
@import "../assets/app.scss";
@import "../assets/scss/downloadApp.scss";
</style>
