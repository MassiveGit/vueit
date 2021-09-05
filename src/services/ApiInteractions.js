import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getProjects() {
        return apiClient.get('/projects');
    },

    postProject(body) {
        return apiClient.post('projects', body);
    },

    getTasksInProject(projectID) {
        return apiClient.get(`/projects/${projectID}/tasks`);
    },

    postTask(projectID, body) {
        return apiClient.post(`/projects/${projectID}/tasks`, body);
    },

    deleteTask(projectID, taskID) {
        return apiClient.delete(`/projects/${projectID}/tasks/${taskID}`);
    },


}