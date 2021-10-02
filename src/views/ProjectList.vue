<template>
    <div class="projects">
        <h1>Project List</h1>
        <draggable v-model="projects" animation="200" group="projects" @change="updateListOrder" @onEnd="onEnd">
            <Project v-for="(project, index) in projects" :key="project.id" :project="project" @delete-project="removeProjectFromList(index)"></Project>
        </draggable>

        <addProject @project-added="createProject"></addProject>
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
        createProject(newProject) {

            //this.projects.push(newProject);
            console.log(newProject)
        },
        onEnd() {
          console.log("onend called");
        },
        updateListOrder(){
            console.log('updateListOrder called');
            this.projects.map((project, index) => {
              project.order_id = index + 1;
            })

            ApiInteractions
            .updateProjectsOrder(this.projects)
            .then(response => {
                console.log(response);
            })

        },
        removeProjectFromList(index){
            this.projects.splice(index, 1);
        },

    },
    created() {
        ApiInteractions
            .getProjects()
            .then(response => {
                this.projects = response.data.projects.sort((a,b) => a.order_id-b.order_id);
            })
            .catch(error => {
                console.log('Error fetching projects: ' + error.response)
            })
    }

}
</script>

<style scoped>

</style>