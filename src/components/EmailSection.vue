<template lang="pug">
    section#contact
        span Pedro Torchio
        span From Brazil
        span Living in Melbourne, Australia
        span PEDRO@TORCHIODEV.COM
</template>
<style lang="sass" scoped>
@import '~media-query-mixins/_mixins.scss'

#contact
    display: flex
    justify-content: space-around
    background-color: black
    color: white
    font-weight: lighter  
    text-align: center
    letter-spacing: 0.25em
    padding: 10px
    font-size: 14px
    +lg
        font-size: 18px

    span
        user-select: all
        cursor: text
</style>

