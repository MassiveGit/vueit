import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
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


}