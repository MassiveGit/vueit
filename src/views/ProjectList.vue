<template>
    <div class="projects">
        <h1>Project List</h1>
        <draggable v-model="projects" animation="200" group="projects">
            <Project v-for="(project, index) in projects" :key="project.id" :project="project" @delete-project="removeProjectFromList(index)"></Project>
        </draggable>

        <addProject @project-added="updateProjectList"></addProject>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import Project from '@/components/Project.vue';
import addProject from '@/components/addProject.vue';
import ApiInteractions from '@/services/ApiInteractions.js';


export default {
    title: "Vueit - Projects",
    components: {
        Project,
        addProject,
        draggable
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
        },
        removeProjectFromList(index){
            this.projects.splice(index, 1);
        },

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