<template lang="pug">
    section#corporate-section.page-section
        h2.block-letters
            span.line.small Let
            span.line.big Customers
            span.line.big Find You
            span.line.medium Wherever they are
        p.title-text
            | Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            | Lorem Ipsum has been the industry's standard dummy text
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
#corporate-section
    height: 900px
    max-height: 100vh
    padding-top: $size--header-height
.title-text
    width: 550px // largura aproximada e aumentada da palavra CUSTOMERS ((9 letras + 1) * font-size/2)
</style>


