/*
 * @Author: your name
 * @Date: 2021-07-13 13:50:27
 * @LastEditTime: 2021-07-21 21:15:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /online-advisory/Users/zhengrui/Desktop/jike/src/router/index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "String10to64",
    component: ()=>import(/* webpackChunkName: "String10to64" */ '../page/0708'),
  },
  {
    path: "/saveGrayImg",
    name: "SaveGrayImg",
    component: ()=>import(/* webpackChunkName: "SaveGrayImg" */ '../page/0710'),
  },
  {
    path: "/kth",
    name: "Kth",
    component: ()=>import(/* webpackChunkName: "Kth" */ '../page/0715'),
  },
  {
    path: "/tmpl",
    name: "Tmpl",
    component: ()=>import(/* webpackChunkName: "Tmpl" */ '../page/0717'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
