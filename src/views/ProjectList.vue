<template>
    <div class="projects">
        <h1>Projects</h1>
      <div class="dragArea">
        <draggable v-model="projects" v-bind="dragOptions" animation="200" group="projects" @change="updateListOrder">
          <Project v-for="(project, index) in projects" :key="project.id" :project="project" @delete-project="removeProjectFromList(index)"></Project>
        </draggable>
      </div>
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
    computed: {
      projects: {
          get() {
              return this.$store.state.projects;
          },
          set(value){
              return this.$store.commit('setProjects', value);
          }

      },
      dragOptions() {
        return {
          group: {
            name: 'g1'
          },
          scrollSensitivity: 1000,
          forceFallback: true
        };
      }
    },
    methods: {
        createProject(newProject) {
            console.log(newProject)
        },
        updateListOrder(){
            //Calling this.projects.map still works after moving from internal state to Vuex store, because it invokes the computed value's setter (without having to use this.projects = ...)
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
                this.$store.commit('setProjects', response.data.projects.sort((a,b) => a.order_id-b.order_id));
            })
            .catch(error => {
                console.log('Error fetching projects: ' + error.response)
            })
    }

}
</script>

<style scoped>

.dragArea {
  overflow-y: auto;
  height: 87vh;
}

</style>