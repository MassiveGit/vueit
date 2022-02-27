import Vue from 'vue'
import router from './router'
import VueRouter from "vue-router";  //bit redundent importing this here and in the router.js file, but I have to do Vue.use(VueRouter)
import App from './App.vue'
import store from './store' //Vuex store

//Bootstrap CSS:
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


//Set title of each distinct page:
import titleMixin from "./mixins/titleMixin";

Vue.mixin(titleMixin)

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

/**
 * Vue Directives
 */
//Allows clicking outside of an element to act as an event on it.
Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});

//Allows shifting focus to an element
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


