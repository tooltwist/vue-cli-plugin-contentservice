<template>
  <div id="app">
    <ContentServiceExample/>
  </div>
</template>

<script>
import ContentServiceExample from './pages/ContentServiceExample.vue'

export default {
  name: 'app',
  components: {
    ContentServiceExample
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
