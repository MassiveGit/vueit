<template>
  <div class="project">
    <router-link :to="{ name: 'tasks', params: {projectId: project.id}}">{{project.name}}</router-link>
    <!-- <p v-if="showDescription == true">{{this.selectedProject.description}}</p> -->
  </div>
</template>

<script>
export default {
  name: 'project',
  props: {
    project: Object
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
