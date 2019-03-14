<template lang="pug">
  div#app
    navigation-bar
    router-view
</template>
<script>
import NavigationBar from '@/components/NavigationBar'

export default {
  components: {
    NavigationBar
  }
}
</script>
<style src="normalize.css"></style>
<style lang="sass" src="@/styles/_global.sass"></style>
<style lang="sass">
@import "~@/styles/config"
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,700')

body
  color: $color--text-dark
  font-family: 'Open Sans', sans-serif
</style>

