<template lang="pug">
    section#ecommerce-section.page-section.padded
        .img-section
            //- h2.service-title ECOMMERCE
            img( src="@/assets/imgs/ecommerce/clothes-display.png")
            .btn.mdc-elevation--z2 Purchase
        .title-group
            h2.block-title
                span.line.small Have
                span.line.big The Most
                span.line.big Profitable
                span.line.big Showcase
            p.title-text
                | It has survived not only five centuries, 
                | but also the leap into electronic typesetting
                | remaining essentially unchanged.
</template>
<style lang="sass" scoped>
@import '~@/styles/config'

#ecommerce-section
    display: flex
    align-items: center
.title-text
    width: 500px

.title-group
    flex: 0 0 auto
.img-section
    flex: 1 1 auto
    margin-right: $size--section-padding
    position: relative

    img
        margin: 0 auto
        display: block
        z-index: 9
        height: 400px
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
