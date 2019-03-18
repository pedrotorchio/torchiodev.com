<template lang="pug">
    #demo-app-landing
        .content
            ul
                li( v-for = "customer in customers" )
                    demo-costumer-item.mdc-elevation--z1( :customer = "customer" )
        button.mdc-elevation--z2( @click="$emit('create')") +
</template>
<script>
import DemoCostumerItem from './DemoCustomerItem'

export default {
    components: { DemoCostumerItem },
    props: {
        customers: Array
    }
}
</script>
<style lang="sass" src="./_button.sass" scoped></style>
<style lang="sass" src="./_app-body.sass" scoped></style>
<style lang="sass" scoped>
@import './app-config'

li
    &:nth-child(odd) article
        background-color: $color--orange
    &:nth-child(even) article
        background-color: $color--blue

</style>


