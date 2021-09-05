<template>
  <div id="app">
    <p>
      <router-link to="/">Go Home</router-link>
      <router-link to="/projects">View Projects</router-link>
      <router-link to="/tasks">View Tasks</router-link>
    </p>
    <router-view></router-view>

  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a {
  padding: 0 10px;
}

.router-link-active {
  color: red;
}
</style>
