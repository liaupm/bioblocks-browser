import Vue from "vue";
import VueRouter from "vue-router";
import Master from "./components/layouts/Master";
//import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";

Vue.config.productionTip = false;
Vue.use(VueRouter);
/*router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: "login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: "bioblocks"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});*/
new Vue({
  router: router,
  store: store,
  render: h => h(Master)
}).$mount("#app");
