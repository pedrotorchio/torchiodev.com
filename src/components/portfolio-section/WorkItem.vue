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
    
    &:hover, &.toggled
        box-shadow: 0 0 10px rgba(black, .5)
        z-index: 999
        img, &::before
            transition-duration: nth($transition-duration, 1)
            transform: scale(1.2)

        &::before
            opacity: 0

    h4, img
        position: absolute

    img, &::before
        transition-property: transform, opacity
        transition-duration: nth($transition-duration, 2)
        transition-timing-function: $transition-timing
        height: 100%
        width: 100%
        object-fit: cover

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
