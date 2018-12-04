<!--<template>
 <div id="app" class="container">
    <img src="./assets/logo.png">
    <h2>APP</h2>
    <todo-bio></todo-bio>
  </div>
</template> -->
<template>
  <div id="app">
    <ul class="nav">
      <li><router-link :to="{ name: 'home' }">Home</router-link></li>
      <li><router-link :to="{ name: 'bioblocks' }">Bioblock</router-link></li>
      <li><router-link :to="{ name: 'about' }">About</router-link></li>
      <li><router-link :to="{ name: 'login' }">Login</router-link></li>
      <li><router-link :to="{ name: 'register' }">Register</router-link></li>
      <li><router-link :to="{ name: 'logout' }">Logout</router-link></li>
    </ul>
    <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>
<script>

//import TodoBio from './components/TodoBio';

export default {
  name: "App",
  components: {
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
 * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
 #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 24px;
    height: 100vh;
    text-align: center;
  }
  .flex-center {
    display: flex;
    justify-content: center;
  }
  .nav {
    display: flex;
    list-style: none;
    padding: 15px 0;
    margin: 0;
    justify-content: flex-end;
    background: #F5F8FA;
    border-bottom: 1px solid lightgrey;
    margin-bottom: 24px;
  }

  .nav a {
    color: #636b6f;
    padding: 0 25px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: .1rem;
    text-decoration: none;
    text-transform: uppercase;
  }
  /* Auth Pages*/
  .login-form {
    max-width: 240px;
    margin: auto;
  }
</style>