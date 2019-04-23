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
                    
            .img-group
                img.img-pc( src="@/assets/imgs/corporate/woman-pc-2.png" )
                
</template>
<script>
import '@/components/svg/logo-vazada'
import { observeElementInViewport } from 'observe-element-in-viewport'

export default {
    mounted() {
        const   imgGroup = document.querySelector('.img-group')
        observeElementInViewport(
            imgGroup, //target
            ()=>imgGroup.classList.add('shown'), ()=>{},
            { target: null /* window viewport */ }
        )
    }
}
</script>
<style lang="sass" scoped>
@import '~@/styles/config'
@import '~media-query-mixins/_mixins.scss'
@import '~animate-scss'

#corporate
    $bg-blue: #f2f6ff
    background: radial-gradient(circle 60vw at left top, white 0%, #{$bg-blue} 100%)
.inner-section
    height: 900px
    max-height: 95vh
    +rMd
        height: 800px
    display: flex
    align-items: stretch
    padding-top: $size--header-height
.title-group
    margin-top: 100px
    +rMd
        margin-top: 0
    .title-text, .block-title
        // width: 550px // approximated and expanded width of the word 'CUSTOMERS' ((9 letters + 1) * font-size/2)

.logo-container
    position: relative
    height: 100%

.img-group
    position: absolute
    bottom: 0
    right: 0
    height: 1px
    width: 1px

    img
        transform: translateX(-1000px)
        bottom: 0
        right: 0
        z-index: 1
        max-height: 400px

        +rMd
            max-height: 30vh

    
    &.shown
        +slideInRight($function: ease-out)

        img
            transform: none
</style>


