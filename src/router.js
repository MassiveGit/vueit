import Projects from "@/views/ProjectList";
import Tasks from "@/views/TaskList";
import Register from "@/views/Register";
import Login from "@/views/Login";
import Logout from "@/views/Logout";
import VueRouter from "vue-router";
import store from "@/store";

/**
 * Route definitions
 */
const routes = [
    { path: '/', redirect: {name: 'login'}}, //Default page should be login for now.
    { path: '/projects', name: "projects", component: Projects, meta: {protected: true}},
    { path: '/tasks/:projectId', name: "tasks", component: Tasks, props: true, meta: {protected: true}},
    { path: '/register', name: "register", component: Register },
    { path: '/login', name: "login", component: Login },
    { path: '/logout', name: "logout", component: Logout, meta: {protected: true}},
]

//Instantiate router, but also export it, so it can be used inside the ApiInteractions interceptor
const router = new VueRouter({
    routes,
    mode: 'history'
});

/**
 *  Navigation Guard to redirect user to login page if not logged in.
 *  Could have used "if name !== 'login/register' instead of adding a meta tag to routes, but this is good opportunity to see meta usefullness.
 *
 */
router.beforeEach(async (to, from, next) => {
    if(!store.state.isAuthenticated){
        if (localStorage.getItem('user')) {
            console.log("Found JWT in local Storage - user is logged in");
            store.commit("setIsAuthenticated", true); //If user has JWT, then make sure the store reflects that. This solves the issue of user closing and reopening tab
        }
        else {
            console.log("No JWT Found. No session available");
        }
    }
    if (to.meta.protected){
        if (store.state.isAuthenticated) {
            next();
        } else {
            next('/');
        }
    } else {
        next();
    }
})

export default router;
