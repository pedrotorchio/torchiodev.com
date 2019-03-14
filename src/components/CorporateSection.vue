<template lang="pug">
    section#corporate-section.page-section.padded
        .title-group
            h2.block-title
                span.line.small Let
                span.line.big Customers
                span.line.big Find You
                span.line.medium Wherever they are
            p.title-text
                | Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                | Lorem Ipsum has been the industry's standard dummy text
        .img-group
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
    $lightness: lightness($color--main-light)
    $diff: 95% - $lightness
    $bg-blue: #f2f6ff
    background: radial-gradient(circle 60vw at left top, white 0%, #{$bg-blue} 100%)
#corporate-section
    height: 900px
    max-height: 100vh
    padding-top: $size--header-height
.title-group
    margin-top: 100px

    .title-text
        width: 550px // approximated and expanded width of the word 'CUSTOMERS' ((9 letters + 1) * font-size/2)
.img-group
    position: absolute
    bottom: 0
    right: 0

    $offset: 192px
    .img-girl
        margin-right: -$offset
    .img-pc
        margin-right: -$offset
</style>


