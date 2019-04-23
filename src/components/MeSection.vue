<template lang="pug">
    section#me-section.page-section
        .container
            a.btn( :href="`/${resume}`" :title="`Resume updated on ${resumeDate}`" target="_blank" @click="whoAmIClick") 
                | Who Am I 
                span.small get my resume
            h3.email {{ email }}
        app-video( src="/video/plasma-effect.mp4" loop :rate=".7" )
</template>
<style lang="sass" scoped>
@import '~@/styles/config'
@import '~media-query-mixins/_mixins.scss'
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
    width: 500px
    +rMd
        width: 100%


.btn, h3
    color: inherit
    cursor: pointer
    display: block
    width: 100%
    max-width: 100%
    margin: 0 auto
    box-sizing: border-box
    
    letter-spacing: .2em
    font-weight: bold
    padding: 5px
    text-transform: uppercase
    text-align: center
    text-shadow: 3px 0px 0px black
h3
    font-weight: 100
    font-size: 18px
    +rMd
        font-size: 16px
.btn
    border: 5px solid $color
    font-size: 48px
    font-family: impact

.video
    position: absolute
    height: 100%
    object-fit: cover
    width: 100%
    filter: hue-rotate(30deg) blur(10px)
.small
    display: block
    font-size: 18px
.email
    user-select: all
    cursor: text
</style>
<script>
import AnalyticsMixin from './Analytics.mixin'
import AppVideo from './AppVideo'
import contact from '@/assets/contact'
export default {
    mixins: [ AnalyticsMixin ],
    components: { AppVideo },
    data: () => ({
        email: contact.email,
        resume: contact.resumeFile,
        resumeDate: contact.resumeDate
    })
}
</script>
