<script lang="ts" setup >
import { onMounted, ref, reactive, watch, provide } from "vue";
import DownloadAppPage from "../components/downloadApp.vue";
import IndexProgressBar from "../components/indexProgressBar.vue";

type IInterfaceProperty = {
  downloadValue: string[];
  imageList: { url: string; name: string }[];
};
const interfaceProperty: IInterfaceProperty = reactive({
  downloadValue: ["官方中文版", "官方英文版", "中文美颜版", "多推流开播版"],
  imageList: [
    {
      url: new URL("../assets/image/li1.png", import.meta.url).href,
      name: "一键安装",
    },
    {
      url: new URL("../assets/image/li2.png", import.meta.url).href,
      name: "安全下载",
    },
    {
      url: new URL("../assets/image/li3.png", import.meta.url).href,
      name: "技术支持",
    },
    {
      url: new URL("../assets/image/li4.png", import.meta.url).href,
      name: "免费更新",
    },
  ],
});

const isShowProgressBar=ref<boolean>(false);
const isChoseDownload = ref<boolean>(false);
const controlTouchMove = watch([isShowProgressBar,isChoseDownload], ([progressValue,progressOldValue],[downloadValue, downloadOldValue]) => {
  if (progressValue||downloadValue) document.body.style.overflowY = "hidden";
  else document.body.style.overflowY = "scroll";
});

const changeIsChoseAge = (): void => {
  isShowProgressBar.value=true;
  const timer=setTimeout(()=>{
    if(isShowProgressBar.value){
      isChoseDownload.value = !isChoseDownload.value;
      isShowProgressBar.value=false;
    }
    clearTimeout(timer);
  },4000)
};

const closeProgressBar=():void=>{
  isShowProgressBar.value=false;
}

const closeDownloadAppPage = (): void => {
  isChoseDownload.value = false;
};
// 传递方法给付款码组件
provide("closeDownloadAppPage", closeDownloadAppPage);
</script>

<template>
  <section class="sectionBox">
    <IndexProgressBar 
    v-if="isShowProgressBar" 
    @closeProgressBar="closeProgressBar"  
    text="正在加载下载器，请稍后"
    time="4s"
    />
    <DownloadAppPage
      v-if="isChoseDownload"
      @closeDownloadAppPage="closeDownloadAppPage"
    />
    <div class="bannerBox" @click="changeIsChoseAge">
      <img src="../assets/image/banner.png" alt="banner" />
    </div>
    <div class="goodTopBox">
      <div class="goodsTitle">
        <div class="goodsContent">
          <div><span>OBS Studio</span></div>
          <div>
            <span
              >OBSStudio是一款视频直播录制软件，为用户提供了视频、文本、图像等的捕获录制功能。OBSStudio界面简洁，功能强大，支持自定义录屏、窗口录屏等多种模式。软件均经过百度杀毒中心认证,无病毒,安装后无广告,绿色,安全请放心下载</span
            >
          </div>
        </div>
      </div>
      <div class="userDownloadBox">
        <div class="userDownloadTitle">
          <div>
            <img src="../assets/image/logo.png" alt="logo" />
            <p>OBSStudio</p>
            <p>官方正版下载</p>
          </div>
        </div>
        <div class="userDownloadContent">
          <div
            class="content"
            v-for="item in interfaceProperty.downloadValue"
            :key="item"
            @click="changeIsChoseAge"
          >
            <div>
              <img src="../assets/image/minilogo.png" alt="logo" />
              <p>OBSStudio</p>
              <p>{{ item }}</p>
            </div>
            <div><span>立刻下载</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="companyProfileBox">
      <div><h3>品质服务，便捷办公</h3></div>
      <div>我们是一家专注于高效办公软件研发的公司</div>
    </div>
    <ul class="appProfileBox">
      <li v-for="item in interfaceProperty.imageList" :key="item.name">
        <img :src="item.url" :alt="item.name" />
      </li>
    </ul>
    <div class="footer">
      <p>
        湖南葵拉信息科技有限公司-本网站的图文和软件来自于网络，如有内容侵犯您的合法权益，请及时与我们联系，我们将第一时间删除,联系邮箱obs_help@126.com
        <br />
      </p>
    </div>
  </section>
</template>



<style scoped lang="scss">
@import "../assets/app.scss";
@import "../assets/scss/index.scss";
</style>
