<template lang="pug">
    section#corporate-section.page-section.padded
        .inner-section
            .title-group.big-side
                .small-side
                    h2.block-title
                        span.line.small Let
                        span.line.big Customers
                        span.line.big Find You
                        span.line.medium Wherever they are
                    p.title-text
                        | Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        | Lorem Ipsum has been the industry's standard dummy text
            .img-group.small-side
                img.img-pc( src="@/assets/imgs/corporate/pc-big.png" )
                img.img-girl( src="@/assets/imgs/corporate/girl-big.png" )
                img.img-sofa( src="@/assets/imgs/corporate/sofa-big.png" )
</template>
<script>
export default {}
</script>
<style lang="sass" scoped>
@import '~@/styles/config'

#corporate-section
    $bg-blue: #f2f6ff
    background: radial-gradient(circle 60vw at left top, white 0%, #{$bg-blue} 100%)
.inner-section
    height: 900px
    max-height: 100vh
    padding-top: $size--header-height
.title-group
    margin-top: 100px
    
    .title-text, .block-title
        // width: 550px // approximated and expanded width of the word 'CUSTOMERS' ((9 letters + 1) * font-size/2)

.img-group
    position: absolute
    bottom: 0
    right: 0

    img
        bottom: 0
    .img-sofa
        right: 0
    .img-girl
        right: 104px
    .img-pc
        right: 330px
</style>


