import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        projects: null,
        selectedProject: null,
        selectedTask: null,
        tasks: null,
    },
    mutations: {
        setProjects (state, projects) {
            state.projects = projects;
        },

        addProject (state, project) {
            state.projects.push(project);
        },

        reorderProjects (state, projects) {
            state.projects = projects;
        },

    }
})