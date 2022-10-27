import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/loginPage", name: "loginPage", component: () => import("../views/loginPage.vue")
    },
    {
      path: "/indexPage", name: "indexPage", component: () => import("../views/indexPage.vue"), meta: { needUserInfo: true }, children: [
        { path: "payMessage", name: "user", component: () => import("../components/payMessage.vue") },
        { path: "setupPay", name: "userMessage", component: () => import("../components/setupPay.vue") }
      ],
      // beforeEnter: ((to, from, next) => {
      //   if (to.meta.needUserInfo && from.fullPath === "/loginPage") {
      //     if (localStorage.getItem("userInfo")) next();
      //     else next({ path: "/" });
      //   } else next();
      // })
    },
    { path: "/", redirect: "/loginPage" },
    { path: "/:notFound(.*)", redirect: "/" }
  ]
})



export default router
