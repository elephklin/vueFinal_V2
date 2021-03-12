<template>
  <div id="app">
    <Header />
    <AlertMessage />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import AlertMessage from './components/AlertMessage.vue'

export default {
  name: 'App',

  components: {
    Header,
    Footer,
    AlertMessage
  }
}
</script>

<style lang="scss">
  @import "./assets/SCSS/all.scss";
</style>
