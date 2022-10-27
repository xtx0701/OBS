<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const userNameInputValue = ref<string>(null);
const passwordInputValue = ref<string>(null);
const login = async () => {
  const results = await axios.post(
    "http://39.108.154.43:8000/backstage/userLogin",
    {
      username: userNameInputValue.value,
      password: passwordInputValue.value,
    }
  );
  if (results.status === 200) router.push({ path: "/indexPage/payMessage" });
  else alert("登陆失败");
};
</script>

<template>
  <section>
    <div class="loginPageBox">
      <div class="loginInputBox">
        <div><span>OBS 管理后台</span></div>
        <div>
          <div>
            <input
              type="text"
              class="loginInput"
              placeholder="用户名"
              v-model="userNameInputValue"
              autocomplete="off"
            />
          </div>
          <div>
            <input
              type="password"
              class="loginInput"
              placeholder="密码"
              v-model="passwordInputValue"
              autocomplete="new-password"
            />
          </div>
        </div>
        <div>
          <span class="loginButton" @click="login">登陆</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.loginPageBox {
  width: 100vw;
  min-width: 1200px;
  height: 100vh;
  background-image: url("../assets/image/loginPageBackgroundImage.jpeg");
  background-size: cover;
}

.loginInputBox {
  background-color: #ffffff;
  position: absolute;
  border-radius: 2rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60rem;
  height: 40rem;
  display: flex;
  flex-direction: column;
}

.loginInputBox > div:nth-child(1) {
  width: 100%;
  height: 8rem;
  border-radius: 2rem;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  font-weight: bolder;
}

.loginInputBox > div:nth-child(2) {
  width: 100%;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
}

.loginInputBox > div:nth-child(2) > div {
  width: 80%;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7rem;
}

.loginInput {
  width: 45rem;
  height: 5rem;
  border: none;
  outline: none;
  margin-left: 1rem;
  background-color: #ecf1f4;
  font-size: 1.5rem;
  padding-left: 2rem;
  font-weight: bolder;
}

.loginInputBox > div:nth-child(3) {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginButton {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 5rem;
  border-radius: 1rem;
  color: white;
  background-color: #3d2d90;
}
</style>
