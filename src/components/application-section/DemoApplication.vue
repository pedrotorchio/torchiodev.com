<script>
import customers from './CustomerStore.js'
import DemoCostumerItem from './components/DemoCustomerItem'

export default {
    components: { DemoCostumerItem },

    data: () => ({
        page: 0
    }),
    computed: {
        allCustomers() {
            return customers.getDataset()
        }
    }
}
</script>
<template lang="pug">
    #demo-application-body
        header.mdc-elevation--z2 My Customers
        .content
            ul
                li( v-for = "customer in allCustomers" )
                    demo-costumer-item.mdc-elevation--z1( :customer = "customer" )

        button.mdc-elevation--z2 +
        


</template>

<style lang="sass" scoped>
@import '~@/styles/config'

#demo-application-body
    overflow: hidden
    font-size: 14px
    height: 100%

$header-height: 28px
$ul-margin-top: 14px
$header-margin-bottom: 4px

button, header
    $height: $header-height
    height: $height
    line-height: $height
    color: white
    text-align: center
    margin: 0
header

    background: $color--text-dark
    margin-bottom: $header-margin-bottom
button
    display: block
    font-weight: bold
    background: $color--maroon
    font-size: 36px
    width: 100%
    cursor: pointer

.content
    overflow-y: auto
    overflow-x: hidden
    $space: $header-margin-bottom
    height: calc(100% - #{$space} - #{$header-height * 2})

    &::-webkit-scrollbar
        width: 0em
        height: 0em
    
    &::-webkit-scrollbar-track
        -webkit-box-shadow: none

    &::-webkit-scrollbar-thumb
        background-color: $color--text-dark
        outline: none
ul
    margin-bottom: $header-margin-bottom
    margin-top: $header-margin-bottom
li
    display: block

    &:nth-child(odd) .customer
        background: rgba(lighten($color--text-dark, 50), .5)
    &:nth-child(even) .customer
        background: rgba(lighten($color--maroon, 20), .5)
</style>

