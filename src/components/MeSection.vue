<template lang="pug">
    section#me-section.page-section
        .container
            a.btn( href="/my-resume.pdf" title="Resume updated on 13/MARCH/2019" target="_blank") 
                | Who Am I 
                span.small get my resume
            h3.email PEDRO@TORCHIODEV.COM
        video( ref="video" autoplay muted loop playsinline @canplaythrough="play" @load="play" )
            source( src="/video/plasma-effect.mp4" type="video/mp4" )
</template>
<style lang="sass" scoped>
@import '~@/styles/config'
#me-section
    height: 400px
    background: black
$color: $color--yellow
.container
    color: $color
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    z-index: 999
    position: absolute
    cursor: initial


.btn, h3
    color: inherit
    cursor: pointer
    display: block
    width: 500px
    letter-spacing: .3em
    font-weight: bold
    padding: 5px
    text-transform: uppercase
    text-align: center
    text-shadow: 3px 0px 0px black
h3
    font-weight: 100
.btn
    border: 5px solid $color
    font-size: 48px
    font-family: impact

video
    position: absolute
    height: 100%
    object-fit: cover
    width: 100%
    filter: hue-rotate(30deg) blur(8px)
.small
    display: block
    font-size: 18px
.email
    user-select: all
    cursor: text
</style>
<script>
export default {
    methods: {
        play() {
            if (this.$refs['video'].playbackRate)
                this.$refs['video'].playbackRate = .6
            this.$refs['video'].play()
        }
    }
}
</script>
