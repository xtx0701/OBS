<template>
  <section  >
    <div class="indexProgressBarBox" >
      <div class="title" >
        <span>安装激活</span>
        <span><img src="../assets/image/close.png"  alt="" @click="closeProgressBar" ></span>
      </div>
      <div class="content" ><span>{{text}}</span></div>
      <div class="progress" >
        <div><span :style="{animationDuration: time}" :class="[{pause:myProps.isChange}]" ></span></div>
      </div>
      <div><span>确定</span></div>
    </div>
  </section>
</template>

<script lang="ts" setup >
import {defineEmits,defineProps,onMounted,ref} from "vue";
  const myEmits=defineEmits(["closeProgressBar"]);
  const myProps=defineProps({
    text:{
      type:String,
      default:""
    },
    time:{
      type:String,
      default:"0s"
    },
    isChange:{
      type:Boolean,
      default:false
    },
    textArr:{
      type:Array,
      default:[""]
    }
  })
  const text=ref("");
  text.value=!myProps.isChange?myProps.text:myProps.textArr[0] as string;
  const textShow=()=>{
    const timerOne=setTimeout(()=>{
      text.value=myProps.textArr[1] as string;
      clearTimeout(timerOne);
    },1000)
    const timerTwo=setTimeout(()=>{
      text.value=myProps.textArr[2] as string;
      clearTimeout(timerTwo);
    },2000)
    const timerThree=setTimeout(()=>{
      text.value=myProps.textArr[3] as string;
      clearTimeout(timerThree);
    },4000)
    const timerFour=setTimeout(()=>{
      text.value=myProps.textArr[4] as string;
      clearTimeout(timerFour);
    },5000)
    const timerFive=setTimeout(()=>{
      text.value=myProps.textArr[5] as string;
      clearTimeout(timerFive);
    },7000)
    const timerSix=setTimeout(()=>{
      text.value=myProps.textArr[6] as string;
      clearTimeout(timerSix);
    },11000)
  }
  onMounted(()=>{
    if(myProps.isChange) textShow();
  })

  const closeProgressBar=()=>{
    myEmits("closeProgressBar");
  }
</script>

<style scoped lang="scss">
@import "../assets/app.scss";
@import "../assets/scss/indexProgressBar.scss"
</style>
