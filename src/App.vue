<template>
  <div id="app">
    <p>
      <router-link to="/projects">View Projects</router-link>
      <router-link :to="{name: 'login'}">Login</router-link>
      <router-link :to="{name: 'register'}">Register</router-link>
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
  background-color: lightgray;
}

a {
  padding: 0 10px;
}

.router-link-active {
  color: red;
}
</style>
