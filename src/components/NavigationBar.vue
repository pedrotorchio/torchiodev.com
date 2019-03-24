<template lang="pug">
    nav#main-nav.page-section
        .inner-section    
            a( href="#corporate" )
                svg-loader#favicon( name="favicon" )
            ul
                li
                    a( href="#services" ) What I do
                li
                    a( href="#portfolio" ) What I've done
                li
                    a( href = "/my-resume.pdf" target="_blank" ) About Me
                li
                    a( href = "#contact" ) Contact
</template>
<script>
import '@/components/svg/favicon'
export default {}
</script>
<style lang="sass">
html
    scroll-behavior: smooth
</style>

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
#favicon
    
    height: 80px
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
