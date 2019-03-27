<template lang="pug">
    .service( :class = "{ toggled, invert }" 
        v-out-click @click="$emit('toggle')" @out-click="$emit('close')" )
        .container
            h3 {{ service.title }}
            .bubble
                h4( v-html="service.getHtml('subtitle')" )
                p( v-html="service.getHtml('description')" )
</template>
<style lang="sass" scoped>
@import '~@/styles/config'
@import '~media-query-mixins/_mixins.scss'
.service
    $height: 100px
    position: relative
    height: $height
    line-height: $height
    cursor: pointer
    transition: color .2 ease-out
    min-width: 64px
    text-align: center
        
.container
    display: inline
.service, h3
    display: inline-block

h3, p, h4
    font-size: 18px
    line-height: 1.2em
    margin: 0
    font-weight: lighter
h4, p
    text-align: left
h4
    font-weight: bold
    font-size: 24px
    margin-bottom: .5em
    text-shadow: $shadow--netflix

p
    white-space: normal
    line-height: 1.5em
$border-radius: 20px
.bubble
    position: absolute
    left: calc(100% + 1em)
    top: 70%
    padding: 2em
    white-space: nowrap
    line-height: 1.2em
    border-radius: $border-radius
    border-top-left-radius: 0px
    background: #072c5dcf
    color: white
    max-width: 350px
    box-sizing: border-box
    +lg
        width: auto
        max-width: 600px
        min-width: 350px
    transform: scale(0)
    transform-origin: top left
    opacity: 0
    transition-property: transform, opacity
    transition-duration: .2s
    transition-timing-function: ease-out
.service.invert .bubble
    border-top-left-radius: $border-radius
    border-top-right-radius: 0px
    transform-origin: top right
    left: initial
    right: calc(100% + 1em)


.service.toggled, .container:hover
    color: $color--maroon
    .bubble
        transform: scale(1)
        opacity: 1
        z-index: 99999

</style>

<script>
import { Service } from '@/assets/services';

export default {
    props: {
        toggled: Boolean,
        service: Service,
        invert: {
            type: Boolean,
            default: false
        }
    },
}
</script>

