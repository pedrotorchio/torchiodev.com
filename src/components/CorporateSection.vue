<template lang="pug">
    section#corporate.page-section.padded
        .inner-section
            .title-group

                .limited-width
                    h2.block-title
                        span.line.small Let
                        span.line.big Customers
                        span.line.big Find You
                        span.line.medium Wherever they are
                    p.title-text
                        | More than just marketing, an online presence allowes you to provide better customer service. 
                        br
                        u Be available full time.
                    
            .half-side.logo-container
                //- svg-loader#logo( name="logo-vazada" )
            .img-group
                img.img-pc( src="@/assets/imgs/corporate/woman-pc-2.png" )
                
</template>
<script>
import '@/components/svg/logo-vazada'
export default {}
</script>
<style lang="sass" scoped>
@import '~@/styles/config'

#corporate
    $bg-blue: #f2f6ff
    background: radial-gradient(circle 60vw at left top, white 0%, #{$bg-blue} 100%)
.inner-section
    height: 900px
    max-height: 100vh
    display: flex
    align-items: stretch
    padding-top: $size--header-height
.title-group
    margin-top: 100px
    
    .title-text, .block-title
        // width: 550px // approximated and expanded width of the word 'CUSTOMERS' ((9 letters + 1) * font-size/2)

$img-height: 400px

.logo-container
    position: relative
    height: 100%
    #logo
        width: calc(100% - #{$size--section-padding})
        position: absolute
        bottom: $img-height - $size--section-padding
        left: 50%
        transform: translateX(-50%)
        z-index: 5
.img-group
    position: absolute
    bottom: 0
    right: 0

    img
        bottom: 0
        right: 0
        z-index: 1
        max-height: $img-height
</style>


