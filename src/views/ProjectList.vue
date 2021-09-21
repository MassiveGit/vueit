<template>
    <div class="projects">
        <h1>Project List</h1>
        <Project v-for="project in projects" :key="project.id" :project="project"></Project>
        <addProject @project-added="updateProjectList"></addProject>
    </div>
</template>

<script>
import Project from '@/components/Project.vue';
import addProject from '@/components/addProject.vue';
import ApiInteractions from '@/services/ApiInteractions.js';


export default {
    title: "Vueit - Projects",
    components: {
        Project,
        addProject
    },
    data() {
        return {
            projects: []
        }
    },
    methods: {
        updateProjectList(newProject) {
            this.projects.push(newProject);
            console.log(this.projects)
        }

    },
    created() {
        ApiInteractions
            .getProjects()
            .then(response => {
                this.projects = response.data.projects
            })
            .catch(error => {
                console.log('Error fetching projects: ' + error.response)
            })
    }

}
</script>

<style scoped>

</style>