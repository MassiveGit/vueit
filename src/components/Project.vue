<template>
      <router-link  tag="div" class="project" :to="{ name: 'tasks', params: {projectId: project.id}}">{{project.name}}</router-link>
    <!-- <p v-if="showDescription == true">{{this.selectedProject.description}}</p> -->
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
.project {
  background-color: blueviolet;
  color: black;
  font-size: x-large;
  border-radius: 25px;
  border-color: black;
  border-style: solid;
  margin: 5px auto;
  padding: 15px;
  width: 50%;
}

.project:hover {
  background-color: #42b983;
}

.project:active {
      background-color: #49c992;
}
</style>
