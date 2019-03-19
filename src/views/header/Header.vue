<!--suppress ALL -->
<template>
  <ion-header id="nav">
    <ion-toolbar>
      <img class="nasaIcon" alt="NASA logo" src="../../assets/logo.png">
      <ion-buttons class="menu">
        <ion-button @click="goNextPage('home')">Home</ion-button>
        <ion-button @click="goNextPage('about')">About</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script>
  export default {
    name: 'header',
    data () {
      return {}
    },
    methods: {
      goNextPage (page) {
        this.$router.push({ name: page })
      }
    }
  }
</script>

<style lang="scss">

  #nav {
    display: flex;
    justify-content: center;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
  .menu{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .nasaIcon {
    height: 50px;
    width: auto;
  }
</style>
