<template lang="pug">
    section#me-section.page-section
        a.btn( href="/my-resume.pdf" title="Resume updated on 13/MARCH/2019" target="_blank") 
            | Who Am I 
            span.small get my resume
        video( ref="video" autoplay muted loop playsinline @canplaythrough="play" @load="play" )
            source( src="/video/plasma-effect.mp4" type="video/mp4" )
</template>
<style lang="sass" scoped>
@import '~@/styles/config'
#me-section
    height: 200px
    background: black
.btn
    $color: $color--yellow
    cursor: pointer
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
    border: 5px solid $color
    color: $color
    text-shadow: 3px 0px 0px black

video
    position: absolute
    height: 100%
    object-fit: cover
    width: 100%
    filter: hue-rotate(30deg) blur(8px)
.small
    display: block
    font-size: 18px
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
