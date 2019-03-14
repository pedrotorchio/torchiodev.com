<template lang="pug">
    nav#main-nav
        router-link( to = "/" )
            svg-loader#logo( name="logo-vazado" )
        ul
            li
                router-link( to = "/about" ) About
            li
                router-link( to = "/about#contact" ) Contact
</template>
<script>
import '@/components/svg/logo-vazado'
export default {}
</script>

<style lang="sass" scoped>
@import "~@/styles/config"


$item-height: 2em
$font-size: 24px

nav#main-nav
    z-index: 55
    text-transform: uppercase
    font-size: $font-size
    display: flex
    align-items: center
    padding: 1em
    position: fixed
    height: $size--header-height
    box-sizing: border-box
#logo
    width: 200px
    display: block
    
ul
    display: block
    margin-left: 50px
li
    display: inline-block

    a
        display: block
        height: $item-height
        line-height: $item-height
        padding: 1em
</style>
