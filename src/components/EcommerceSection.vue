<script>
import { observeElementInViewport } from 'observe-element-in-viewport'

export default {
    mounted() {
        const   imgSection = document.querySelector('.img-section'),
                img = imgSection.querySelector('img');
                
        observeElementInViewport(
            imgSection, //target
            ()=>img.classList.add('shown'), ()=>{},
            { target: null /* window viewport */ }
        )
    }
}
</script>

<template lang="pug">
    section#ecommerce-section.page-section.padded
        .inner-section.two-sides.reverse
            .img-section.half-side
                    img( src="@/assets/imgs/ecommerce/clothes-display.png")
                    .btn.mdc-elevation--z2 Purchase
            .title-group.half-side
                .limited-width
                    h2.block-title
                        span.line.small Have
                        span.line.big The Most
                        span.line.big Profitable
                        span.line.big Showcase
                    p.title-text
                        | Automatic, quick, 24/7/365.
                        br
                        u E-commerce
                        |  provides targeted marketing
                        |  and convenience to sell goods or services 
                        | without middleman or geographical constraints.
</template>
<style lang="sass" scoped>
@import '~@/styles/config'
@import '~animate-scss'


.img-section
    position: relative

    img
        margin: 0 auto
        display: block
        z-index: 9
        width: 100%
        height: auto
        transform: translateX(-1000px)

        &.shown
            transform: none
            +slideInLeft($function: ease-out)

    .btn
        width: 250px
        line-height: 1.5em
        text-align: center
        margin: 0 auto
        margin-top: 1em
        font-size: 36px
        font-weight: lighter
        text-transform: uppercase
        background: $color--maroon
        color: white


h2.service-title
    color: $color--text-dark
    font-size: 400px
    margin: 0
    left: 100%
    top: 50%
    transform: translateY(-50%) translateX(-50%) //animate translateX
    z-index: 5
    position: absolute

</style>
