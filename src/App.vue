<!--<template>
 <div id="app" class="container">
    <img src="./assets/logo.png">
    <h2>APP</h2>
    <todo-bio></todo-bio>
  </div>
</template> -->
<template>
  <div id="app">

      <!--<a class="nav-logo" hre>
        <img src="./assets/lia.png">
      </a> -->
    <div class="nav">
    <ul>
      <li><router-link :to="{ name: 'home' }">Home</router-link></li>
      <!--<li><router-link :to="{ name: 'bioblocks' }">Bioblock</router-link></li>-->
      <!--<li><router-link :to="{ name: 'about' }">About</router-link></li>-->
      <li><router-link :to="{ name: 'login' }">Login</router-link></li>
      <li><router-link :to="{ name: 'register' }">Register</router-link></li>
      <li><router-link :to="{ name: 'logout' }">Logout</router-link></li>
    </ul>
    </div>
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
    /*font-size: 24px;*/
    height: 100vh;
    text-align: center;
  }
  .flex-center {
    display: flex;
    justify-content: center;
  }
  .nav {
    
  }
  .nav ul{
    display: flex;
    list-style: none;
    padding: 15px 0;
    margin: 0;
    justify-content: flex-end;
    background: #ffffff;
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
  .form-log-reg{
      padding-top: 20px;
      padding-left: 60px;
  }
   .form-log-reg a{
    margin: 0;
    padding: 0;
    border: 0;
    color: #606266;
    font-size: inherit;
    line-height: inherit;
    text-decoration: none;
  }
    .form-log-reg a:hover{
    text-decoration: underline;
  }

  /*logo*/
  .nav-logo{
    display: inline-block;
    margin-left: -36rem;
    width: 70px;
  }
   .nav-logo img{
    display: block;
    width: 200%;
    height: auto;
    margin-left: -36rem;
  }
  /* Auth Pages*/
  .login-form {
    max-width: 240px;
    margin: auto;

  }
  .login-border{
    background-color: #f1f1f1;
    border: 1px solid #CCC;
    position: relative;
    border-radius: .4em;
    width: 300px;
    padding-top: 3px;
  }
  .login-width{
    width: 230px;
    margin: 0 auto;
    display: block;
  }
  .form-margin{
    margin-bottom: 11px
  }
  /*LandingPage.vue*/
  .landing-page{

  }
  .landing-page h1{
    color: #688a2e;
    font-size: 50px;
    line-height: 50px;
    max-width: 650px;
    font-weight: 400;
    margin: 0 auto;
    text-align: center;
    padding-top: 30px;
    padding-bottom: 20px;
  }
   .landing-text-big{
    max-width: 681px;
    opacity: .7;
    margin: 0 auto;
    display: block;
    text-align: center;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 20px;
    cursor: default;
  }
</style>