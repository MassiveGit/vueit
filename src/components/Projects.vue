<template>
  <div class="projects">
    <h1>My Projects</h1>
    <a href="#"
       class="projectLinks"
       @click="updateSelected(project)"
       v-for="(project, index) in projects"
       :key="index">
          {{project.name}}
    </a>
    <p v-if="showDescription == true">{{this.selectedProject.description}}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'projects',

  data() {
    return {
      selectedProject: {},
      showDescription: false,
      projects: []
    }

  },
  methods: {

    updateSelected (selectedItem) {
      this.selectedProject = selectedItem;
      this.showDescription = true;
    }

  },

  async created() {
    try {
      const response = await axios.get('http://localhost:3000/projects');
      console.log(response.data);
      this.projects = response.data.projects;
      console.log(this.projects);
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 10px 0 0;
}
li {
  display: inline-block;
  margin: 0 30px;
}
a {
  color: #42b983;
}
.projectLinks {
  padding: 0 15px;

  }
</style>
