<template lang="pug">
    section#corporate-section.page-section
</template>
<script>
export default {}
</script>
<style lang="sass" scoped>
@import '~@/styles/config'

#corporate-section
    $lightness: lightness($color--main-light)
    $diff: 95% - $lightness
    $bg-blue: #f2f6ff
    background: radial-gradient(circle 60vw at left top, white 0%, #{$bg-blue} 100%)
    background-position: left top
#corporate-section
    height: 900px
    max-height: 100vh
    padding-top: $size--header-height
    
</style>


