import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //Auth Related
        isAuthenticated: false,
        unauthorisedMessage: null,

        //Identity Related
        username: null,

        //Task Related
        projects: null,
        selectedProject: null,
        selectedTask: null,
        tasks: null,
    },
    mutations: {
        setIsAuthenticated (state, isAuthenticated) {
          state.isAuthenticated =  isAuthenticated;
        },

        setUnauthorisedMessage (state, unauthorisedMessage) {
            state.unauthorisedMessage =  unauthorisedMessage;
        },

        setUsername (state, username) {
            state.username = username;
        },

        setProjects (state, projects) {
            state.projects = projects;
        },

        setTasks (state, tasks) {
            state.tasks = tasks;
        },

        addProject (state, project) {
            state.projects.push(project);
        },

        reorderProjects (state, projects) {
            state.projects = projects;
        },

        setSelectedProject (state, project) {
            state.selectedProject = project;
        }

    },
    getters: {
        getProjectById: (state) => (id) => {
            return state.projects.find(project => project.id === id);
        }
    }
})