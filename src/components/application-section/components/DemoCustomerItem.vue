<template lang="pug">
    article.customer
        | {{ customer.name }}
</template>
<script>
export default {
    props: {
        customer: Object
    }
}
</script>
<style lang="sass" scoped>
@import "~@/styles/config"

$item-height: 2em
.customer
    font-size: 14px
    height: $item-height
    line-height: $item-height
    padding: 0 .5em
    margin: .2em 0
    display: inline-block
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    max-width: 100%
    transition: .2s ease-out
    transition-property: outline, box-shadow
    will-change: outline
    cursor: pointer

    &:hover
        outline: 1px solid $color--text-dark
        


</style>

