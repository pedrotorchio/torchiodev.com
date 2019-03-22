<template lang="pug">
    #demo-app-landing
        .content
            ul
                li( v-for = "customer in customers" )
                    demo-costumer-item.mdc-elevation--z1( :customer = "customer" @click.native="$emit('open', customer)" :class="[customer.getGenderLabel()]")
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
    article
        border-bottom: 4px solid rgba(black, .2)

                
        &.Male
            background: rgba($color--male, .5)
        &.Female
            background: rgba($color--female, .5)
        &.Unspecified
            background: rgba($color--unspecified, .5)
    


</style>


