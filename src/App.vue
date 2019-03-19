<!--suppress ALL -->
<template>
  <ion-app id="app">
    <ion-content>
      <ion-vue-router/>
    </ion-content>
  </ion-app>
</template>

<script>
  import Header from './views/header/Header'

  export default {
    name: 'App',
    components: {
      Header
    },
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss">
  .flexColumn{
    display: flex;
    flex-direction: column;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: black;
  }
</style>
