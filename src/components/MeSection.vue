<template lang="pug">
    section#me-section.page-section
        a.btn Who Am I
        video( autoplay )
            source( src="/video/programming.mp4" type="video/mp4" )
</template>
<style lang="sass" scoped>
@import '~@/styles/config'
#me-section
    height: 800px
.btn
    cursor: pointer
    color: $color--yellow
    display: block
    color: #ffff63
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
    border: 5px solid $color--yellow
    text-shadow: 3px 0px 0px black
    &:hover
        color: $color--maroon
        border-color: $color--maroon
video
    position: absolute
    height: 100%
    object-fit: cover
    width: 100%
</style>
