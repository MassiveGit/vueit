import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

// Route Component Imports
import Home from "./views/Home";
import Projects from "./views/ProjectList";
import Tasks from "./views/TaskList";


// Route definitions - could split this out into another file and import it here. Do that next time.
const routes = [
  { path: "/", name: "home", component: Home },
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
