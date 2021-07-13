/*
 * @Author: your name
 * @Date: 2021-07-13 13:44:26
 * @LastEditTime: 2021-07-13 13:49:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit;
 * @FilePath: /online-advisory/Users/zhengrui/Desktop/jike/src/main.js
 */
import Vue from 'vue';
import App from './App.vue';
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
