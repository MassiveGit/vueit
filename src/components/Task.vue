<template>
    <div class="task">
        <p>{{task.name}}</p>
        <p>{{task.description}}</p>
    </div>
</template>

<script>
export default {
  name: 'tasks',
    props: {
        task: Object
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
