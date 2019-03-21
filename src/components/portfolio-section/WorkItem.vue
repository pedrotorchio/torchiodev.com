<template lang="pug">
    .work-item
        h4
        img( :src="work.getImgSrc()" )
</template>
<script>
export default {
    props: {
        work: Object
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
    
    &:hover
        z-index: 999
    &.toggled
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
    z-index: 99


@for $i from 1 through 8
    $adjustment: 80deg * $i
    $color: adjust-hue(hsl(0, 50%, 50%), $adjustment)
    .work-item:nth-of-type(#{$i})::before
        background-color: rgba($color, .5)
</style>
