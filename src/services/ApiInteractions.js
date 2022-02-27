import axios from "axios";
import store from "../store";
import router from '../router';

const apiClientUnprotected = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
       'Content-Type': 'application/json'
    }
})


// Add the user's JWT to all requests that require auth
apiClient.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            config.headers.Authorization = `Bearer ${user.access_token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

//Check if auth failed/expired etc. and clear token + redirect to login page.
apiClient.interceptors.response.use(function (response) {
    return response
}, function (error) {
    console.log("Error response returned from SERVER");
    console.log(error.response);
    if (error.response.status === 401) {
        //Logout user if exists
        console.log("user currently in localstorage: " + localStorage.getItem('user'));
        localStorage.removeItem('user');
        store.commit("setIsAuthenticated", false);
        store.commit("setUnauthorisedMessage", error.response.data);
        console.log("Is user logged in? : " + store.state.isAuthenticated);

        router.push({ name: 'login'}); //may be redundant in some cases because of navigation guard
        //Could add logic here to provide user timeout/other warning message, but not 100% necessary
    }
    return Promise.reject(error)
})

const basePath = '/projects';

export default {
    getProjects() {
        return apiClient.get(basePath);
    },

    postProject(body) {
        return apiClient.post(basePath, body);
    },

    updateProjectsOrder(body) {
        return apiClient.put(basePath, body);
    },

    deleteProject(projectID) {
        return apiClient.delete(basePath + `/${projectID}`);
    },

    getTasksInProject(projectID) {
        return apiClient.get(basePath + `/${projectID}/tasks`);
    },

    async postTask(projectID, body) {
        return await apiClient.post(basePath + `/${projectID}/tasks`, body);
    },

    patchTask(projectID, taskID, body) {
        return apiClient.patch(basePath + `/${projectID}/tasks/${taskID}`, body);
    },

    updateTasksOrder(projectID, body) {
        return apiClient.put(basePath + `/${projectID}/tasks`, body);
    },

    deleteTask(projectID, taskID) {
        return apiClient.delete(basePath + `/${projectID}/tasks/${taskID}`);
    },


    /**
     *  USER CRUD
     */
    async postSignup(body) {
        return await apiClientUnprotected.post(`/auth/signup`, body);
    },

    async postSignin(body) {
        return await apiClientUnprotected.post(`/auth/signin`, body);
    },


}