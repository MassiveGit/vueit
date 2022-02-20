import axios from "axios";

function getAccessToken() {
    console.log("HEY IM A MESSAGE THAT GOT CALLED GUISE. GUISE SRSLY");
    let user = JSON.parse(localStorage.getItem('user'));
    console.log("getAT called");
    if (user && user.access_token) {
        // Apparently Node.js Express back-end doesn't use Authorization Bearer.
        return user.access_token;
    } else {
        console.log("user not logged in");
        return {};
    }
}

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