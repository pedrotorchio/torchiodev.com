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
$font-size: 18px

nav#main-nav
    z-index: 99999999999999999
    text-transform: uppercase
    font-size: $font-size
    display: flex
    align-items: center
    padding: 1em
    position: fixed
    height: $size--header-height
    box-sizing: border-box
    margin: 0 auto
    width: 100%
    max-width: 1200px
    left: 50%
    transform: translateX(-50%)
    font-weight: lighter
#logo
    width: 200px
    display: block
    
ul
    display: block
    margin-left: 50px
li
    display: inline-block
    padding: 1em

    a
        display: block
        height: $item-height
        line-height: $item-height
        
</style>
