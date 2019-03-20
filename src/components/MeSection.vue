<template lang="pug">
    section#me-section.page-section
        a.btn Who Am I
        video( ref="video" autoplay muted loop playsinline @canplaythrough="play" @load="play" )
            source( src="/video/plasma-effect.mp4" type="video/mp4" )
</template>
<style lang="sass" scoped>
@import '~@/styles/config'
#me-section
    height: 400px
    background: black
.btn
    $glow-color: rgba($color--orange, .8)
    cursor: pointer
    color: $color--orange
    display: block
    position: absolute
    width: 500px
    letter-spacing: .3em
    font-weight: bold
    padding: 5px
    top: 50%
    text-transform: uppercase
    font-size: 48px
    text-align: center
    left: 50%
    -webkit-transform: translate(-50%, -50%)
    transform: translate(-50%, -50%)
    z-index: 999
    border: 5px solid $color--orange
    text-shadow: 3px 0px 0px black
    box-shadow: 0 0 20px 3px $glow-color
    filter: drop-shadow(0px 0px 20px #{$glow-color})

video
    position: absolute
    height: 100%
    object-fit: cover
    width: 100%
</style>
<script>
export default {
    methods: {
        play() {
            this.$refs['video'].play()
        }
    }
}
</script>
