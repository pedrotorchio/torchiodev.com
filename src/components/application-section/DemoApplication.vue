<script>
import customers from './CustomerStore.js'

import AppList from './components/DemoAppLanding'
import AppCreation from './components/DemoAppForm'
import AppSatisfaction from './components/DemoAppSatisfaction'
/******
 * 
 * 
 * PRECISA CRIAR A PÁGINA DE SATISFACTION
 * 
 * 
 */

export default {
    components: { AppList, AppCreation, AppSatisfaction },
    data: () => ({
        customer: null,
    }),
    computed: {
        title() {
            return this.page === 2 ? this.customer.name : "My Customers"
        },
        allCustomers() {
            return customers.getDataset().sort((a,b) => b.id - a.id)
        },
        page() {
            const c = this.customer
            
            return (c == null ? 0 : ( !c.id ?  1 : 2 ))
        },
        headerClasses() {
            let pageColor = 'landing'
            const c = this.customer
            if (c && (c.gender || c.gender == 0))
                pageColor = this.customer.getGenderLabel()

            return [ pageColor ]
        }
    },
    methods: {
        insertCustomer(customer) {
            customers.insertCustomer(customer)
            this.customer = customer
        },
        openSatisfactionForm(customer) {
            this.customer = customer
        },
        openCreationForm() {
            this.customer = {}
        },
        newSatisfactionEntry(value) {
            this.customer.satisfactionProgress.push(value)
        },
        toLanding() {
            this.customer = null
        }
    }
}
</script>
<template lang="pug">
    #demo-application-body
        header.mdc-elevation--z2( @click="toLanding" :class="headerClasses" ) {{ title }}
        app-list.body( v-if="page === 0" :customers="allCustomers" @create="openCreationForm" @open="openSatisfactionForm" )
        app-creation.body( v-else-if="page === 1" @save = "insertCustomer" @return="toLanding" )
        app-satisfaction.body( v-else-if="page === 2" :customer="customer" @new-entry="newSatisfactionEntry" @return="toLanding" )

</template>

<style lang="sass" scoped>
@import './components/app-config'

#demo-application-body
    overflow: hidden
    font-size: 14px
    height: 100%
    border: 1px solid #00000059
    box-sizing: border-box

header
    $height: $header-height
    height: $height
    line-height: $height
    color: white
    text-align: center
    margin: 0
    background: $color--text-dark
    margin-bottom: $header-margin-bottom
    cursor: pointer
    transition: background .2s ease-out
    $desaturation: 10%
    $opacity: .8
    &.Female
        background: rgba(desaturate($color--female, $desaturation), $opacity)
    &.Male
        background: rgba(desaturate($color--male, $desaturation), $opacity)
    &.Unspecified
        background: rgba(desaturate($color--unspecified, $desaturation), $opacity)
.body
    height: calc(100% - #{$header-margin-bottom} - #{$header-height})
    display: flex
    flex-direction: column
    align-items: stretch
    justify-content: flex-start
</style>

