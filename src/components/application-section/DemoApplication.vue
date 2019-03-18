<script>
import customers from './CustomerStore.js'

import AppList from './components/DemoAppLanding'
import AppCreation from './components/DemoAppForm'
/******
 * 
 * 
 * PRECISA CRIAR A PÁGINA DE SATISFACTION
 * 
 * 
 */
import { makeCustomer } from './CustomerDataset.js';

export default {
    components: { AppList, AppCreation },
    data: () => ({
        customer: null
    }),
    computed: {
        allCustomers() {
            return customers.getDataset().sort((a,b) => b.id - a.id)
        },
        page() {
            const c = this.customer
            
            return (c == null ? 0 : ( !c.id ?  1 : 2 ))
        }
    },
    methods: {
        insertCustomer(customer) {
            customers.insertCustomer(customer)
            this.customer = Object.assign({}, customer)
        },
        openCreationForm() {
            this.customer = makeCustomer('', '', '')
        }
    }
}
</script>
<template lang="pug">
    #demo-application-body
        header.mdc-elevation--z2 My Customers
        app-list.body( v-if="page == 0 || page == 2" :customers="allCustomers" @create="openCreationForm" )
        app-creation.body( v-else-if="page == 1" @save = "insertCustomer(customer)" :customer="customer" )
        //- app-satisfaction.body( v-else :customer="customer" )

</template>

<style lang="sass" scoped>
@import './components/app-config'

#demo-application-body
    overflow: hidden
    font-size: 14px
    height: 100%

header
    $height: $header-height
    height: $height
    line-height: $height
    color: white
    text-align: center
    margin: 0
    background: $color--text-dark
    margin-bottom: $header-margin-bottom
.body
    height: calc(100% - #{$header-margin-bottom} - #{$header-height})
</style>

