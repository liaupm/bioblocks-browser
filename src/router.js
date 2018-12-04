import Vue from "vue";
import Router from "vue-router";
//import Home from "./views/Home.vue";
//import App from "./App";
import LandingPage from "./components/marketing/LandingPage";
import About from "./components/marketing/About";
import TodoBio from "./components/TodoBio";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Logout from "./components/auth/Logout";

Vue.use(Router); //extend vuejs
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: LandingPage
    },
    {
      path: "/bioblocks",
      name: "bioblocks",
      component: TodoBio
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
    }
  ]
});
