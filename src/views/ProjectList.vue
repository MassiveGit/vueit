<template>
    <div class="projects">
        <h1>Projects Page</h1>
        <Project v-for="project in projects" :key="project.id" :project="project"></Project>
    </div>
</template>

<script>
import Project from '@/components/Project.vue';
import ApiInteractions from '@/services/ApiInteractions.js';


export default {
    components: {
        Project
    },
    data() {
        return {
            projects: []
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