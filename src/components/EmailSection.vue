<script>
import contact from '@/assets/contact'
export default {
    data: () => ({
        email: contact.email
    })
}
</script>

<template lang="pug">
    section#contact
        span Pedro Torchio
        span From Brazil
        span Living in Melbourne, Australia
        span.email {{ email }}
</template>
<style lang="sass" scoped>
@import '~media-query-mixins/_mixins.scss'

#contact
    display: flex
    +rMd
        flex-direction: column
        min-height: 8em
    justify-content: space-around
    background-color: black
    color: white
    font-weight: lighter  
    text-align: center
    letter-spacing: 0.25em
    padding: 10px
    font-size: 14px
    +xl
        font-size: 18px

    span
        user-select: all
        cursor: text

    .email
        text-transform: uppercase
</style>