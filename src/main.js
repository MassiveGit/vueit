import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

//Bootstrap CSS:
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import titleMixin from "./mixins/titleMixin";


Vue.mixin(titleMixin)

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Route Component Imports
import Projects from "./views/ProjectList";
import Tasks from "./views/TaskList";


/**
 * Vue Directives (could create an external directives file
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




// Route definitions - could split this out into another file and import it here. Do that next time.
const routes = [
  { path: '/projects', name: "projects", component: Projects },
  { path: '/tasks/:projectId', name: "tasks", component: Tasks, props: true }
]

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')




