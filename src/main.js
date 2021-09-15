import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

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


//Bootstrap CSS:


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
