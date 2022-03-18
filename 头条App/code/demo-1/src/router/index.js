import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/Home.vue";
import User from "../views/User/User.vue";

//安装插件
Vue.use(VueRouter);

//路由规则数组
const routes = [
    { path: "/", redirect: "/home" },
    { path: "/home", component: Home },

    { path: "/user", component: User },
];

//实例路由对象
const router = new VueRouter({
    routes,
});

export default router;