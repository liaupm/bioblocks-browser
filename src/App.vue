<template>
  <div id="app" class="container">
    <!-- <img src="./assets/logo.png">-->
    <h2>APP</h2>
    <todo-bio></todo-bio>
  </div>
</template>

<script>

import TodoBio from './components/TodoBio';

export default {
  name: "App",
  components: {
    TodoBio,
  }
}
</script>

<style>
 /*#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}*/
.container{
  max-width: 300px;
  margin: 0 auto;
}
</style>