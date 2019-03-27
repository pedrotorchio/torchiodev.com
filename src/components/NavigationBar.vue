<template lang="pug">
    nav#main-nav.page-section
        .inner-section    
            a( href="#corporate" )
                svg-loader#logo( name="logo-vazada" )
            ul( :class="{ shown }" )
                li
                    a( href="#services" @click="shown = false" ) What I do
                li
                    a( href="#portfolio" @click="shown = false" ) What I've done
                li
                    a( href = "/my-resume.pdf" target="_blank" @click="shown = false" ) About Me
                li
                    a( href = "#contact" @click="shown = false" ) Contact

            .toggle( @click="toggle" )
                span Menu 
                svg-loader#favicon( name="favicon" )
            
</template>
<script>
import '@/components/svg/logo-vazada'
import '@/components/svg/favicon'
export default {
    data: () => ({
        shown: false
    }),
    methods: {
        toggle() {
            this.shown = !this.shown
        }
    }
}
</script>
<style lang="sass">
html
    scroll-behavior: smooth
</style>

<style lang="sass" scoped>
@import "~@/styles/config"
@import '~media-query-mixins/_mixins.scss'


$item-height: 2em
$font-size: 18px

nav#main-nav
    z-index: 99999999
    text-transform: uppercase
    font-size: $font-size
    position: fixed
    font-weight: lighter
    width: 100%
$size--header-padding: 1em
.inner-section
    display: flex
    align-items: center
    padding: 1em
    height: $size--header-height
#logo
    
    height: 80px
    display: block


ul
    display: block
    position: fixed
    right: .8*$size--header-height
    top: .8*$size--header-height
    background: rgba($color--text-dark, .8)
    color: white
    transition-property: transform, opacity
    transition-duration: .4s
    transition-timing-function:ease-out
    transform-origin: top right
    transform: scale(0)
    opacity: 0
    &.shown
        transform: scale(1)
        opacity: 1

    +lg
        position: initial
        left: initial
        top: initial
        background: none
        color: $color--text-dark
        margin-left: 50px
        transform: none !important


li
    display: block
    padding: 1em
    letter-spacing: .2em
    +lg
        display: inline-block

    a
        display: block
        height: $item-height
        line-height: $item-height

        &:hover
            color: $color--yellow
            +lg
                color: $color--maroon
.toggle
    display: flex
    align-items: center

    position: fixed
    right: $size--header-padding
    top: $size--header-padding

    #favicon 
        $height: calc(#{$size--header-height} - #{2*$size--header-padding})
        height: $height
        width: auto
    span
        margin-right: 1em        
    +lg
        display: none 
</style>
