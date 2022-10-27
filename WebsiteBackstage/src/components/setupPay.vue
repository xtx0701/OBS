<script setup lang="ts" >
import { reactive, onMounted, ref } from "vue";
import axios from "axios";

interface setupMessageData<T> {
  data: { name: string; imageUrl: string; amount: number }[];
}
const choseImageInput = ref<any>(null);
const setWechatInput = ref<string>(null);

const setupMessageData = reactive<setupMessageData<number>>({
  data: [{ name: "", imageUrl: "", amount: 0 }],
});
onMounted(() => {
  getSetupMessage();
});

const getSetupMessage = async (): Promise<void> => {
  const result = await axios.get(
    "http://39.108.154.43:8000/backstage/getSetupMessage"
  );
  setupMessageData.data = JSON.parse(result.data.results[0].payData);
  setWechatInput.value = result.data.results[0].wechatNum;
};

const changeSetupMessageNum = async (): Promise<void> => {
  const result: any = await axios.post(
    "http://39.108.154.43:8000/backstage/changeSetupMessageNum",
    {
      str: JSON.stringify(setupMessageData.data),
    }
  );
  if (result.status === 200) getSetupMessage();
  else return alert("失败");
  alert("成功");
};

const choseImage = (event: any): void => {
  const reader = new FileReader();
  const num = 3 - Number(event.currentTarget.dataset.num);
  const file =
    choseImageInput.value[Number(event.currentTarget.dataset.num)].files[0];
  if (file) reader.readAsDataURL(file);
  reader.onload = async () => {
    console.log(num, event);
    setupMessageData.data[num].imageUrl = reader.result as string;
  };
};

const changeWechatNum = async (): Promise<void> => {
  const result = await axios.post(
    "http://39.108.154.43:8000/backstage/changeWechatNum",
    {
      wechatNum: setWechatInput.value,
    }
  );
  if (result.status === 200)
    setWechatInput.value = result.data.results[0].wechatNum;
  else return alert("失败");
  alert("成功");
};
</script>


<template>
  <section>
    <div class="setupPayBox">
      <div>金额设置</div>
      <div>
        <div
          class="setupPayHandleBox"
          v-for="item in setupMessageData.data"
          :key="item.name"
        >
          <div>
            <p>{{ item.name }}</p>
            <div>
              <input type="text" v-model="item.amount" />
            </div>
            <p><span @click="changeSetupMessageNum">修改</span></p>
          </div>
          <div>
            <p>二维码</p>
            <div>
              <input
                type="file"
                ref="choseImageInput"
                class="coverInput"
                @change="choseImage"
                :data-num="item.num"
              />
              <img :src="item.imageUrl" :alt="item.name" />
            </div>
            <p>
              <span @click="changeSetupMessageNum">上传</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="wechatSetup">
      当前微信号：<input type="text" v-model="setWechatInput" />
      <span @click="changeWechatNum">修改</span>
    </div>
  </section>
</template>

<style scoped lang="scss" >
@import "../../src/assets/app.scss";
@import "../../src/assets/scss/setupPay.scss";
</style>