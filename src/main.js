import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store' //Vuex store

//Bootstrap CSS:
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


//Set title of each distinct page:
import titleMixin from "./mixins/titleMixin";


// Route Component Imports:
import Projects from "./views/ProjectList";
import Register from "./views/Register";
import Login from "./views/Login";
import Tasks from "./views/TaskList";


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

/**
 * Route definitions
 */
const routes = [
  { path: '/', redirect: {name: 'login'}}, //Default page should be login for now.
  { path: '/projects', name: "projects", component: Projects },
  { path: '/tasks/:projectId', name: "tasks", component: Tasks, props: true },
  { path: '/register', name: "register", component: Register },
  { path: '/login', name: "login", component: Login },
  { path: '/logout', name: "logout", component: Login },
]

const router = new VueRouter({
  routes,
  mode: 'history'
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


