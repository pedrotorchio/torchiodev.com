<template lang="pug">
    nav#main-nav.page-section
        .inner-section    
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
    position: fixed
    font-weight: lighter
    width: 100%
.inner-section
    display: flex
    align-items: center
    padding: 1em
    height: $size--header-height
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
