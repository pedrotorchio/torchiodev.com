<template lang="pug">
    .work-item
        app-video( :src="videoUrl" :autoplay="false" )
        img( :src="work.getImgSrc()" )
</template>
<script>
import AppVideo from '../AppVideo'
export default {
    components: { AppVideo },
    props: {
        work: Object
    },
    computed: {
        videoUrl() {
            return `/video/portfolio/${this.work.imgsFolder}.mp4`
        }
    }
}
</script>

<style lang="sass" scoped>
$transition-duration: (1s, .2s)
$transition-timing: ease-out
.work-item
    position: relative
    cursor: pointer
    user-select: none

    z-index: 9
    
    &::before
        z-index: 99
    &:hover
        z-index: 99
        &::before
            z-index: 999
    &.toggled
        z-index: 999
        &::before
            z-index: 9999   
    &:hover, &.toggled
        
        img
            box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)
        img, &::before
            transition-duration: nth($transition-duration, 1)
            transform: scale(1.1)

        &::before
            opacity: 0

    h4, img
        position: absolute

    img
        box-shadow: 0 0 0 0 rgba(black, 0)
    img, &::before
        transition-property: transform, opacity, box-shadow
        transition-duration: nth($transition-duration, 2)
        transition-timing-function: $transition-timing
        height: 100%
        width: 100%
        object-fit: cover

    &.toggled img
        transform: scale(1.2)
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)

.work-item::before
    content: ''
    position: absolute
    display: block
    background-color: rgba(black, .5)
    opacity: 1

$colors: (#ffc107, #3f51b5, #009688, #ff5722, #9c27b0, #f44336, #00bcd4)
@for $i from 1 through length($colors)
    $color: nth($colors, $i)
    .work-item:nth-of-type(#{$i})::before
        background-color: rgba($color, .5)
</style>
