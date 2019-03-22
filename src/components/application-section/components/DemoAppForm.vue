<template lang="pug">
    #demo-app-form
        .content
            form
                label( for="demo-full-name" ) Full Name
                    input#demo-full-name( type="text" placeholder="Full Name" name="full-name" v-model="customer.name" )

                label Gender
                .gender-fields
                    
                    label.fake-radio.male( for="demo-gender-male" :class=`{ selected: customer.gender == '1' }` )
                        | M
                        input#demo-gender-male( type="radio" name="gender" v-model.number="customer.gender" value="1" )

                    label.fake-radio.female( for="demo-gender-female" :class=`{ selected: customer.gender == '2' }` )
                        | F
                        input#demo-gender-female( type="radio" name="gender" v-model.number="customer.gender" value="2" )

                    label.fake-radio.unspecified( for="demo-gender-unspecified" :class=`{ selected: customer.gender == '0' }` )
                        | Unspecified
                        input#demo-gender-unspecified( type="radio" name="gender" v-model.number="customer.gender" value="0" )

                label( for="#demo-age" ) Age
                    input#demo-age( type="number" name="age" v-model.number="customer.age" min="10" max="100" step="5")
        .actions
            button.mdc-elevation--z2.green( :disabled="!done" @click="$emit('save', customer)" ) Save

        //- label( for="demo-satisfaction" ) Satisfaction Level
        //- input#demo-satisfaction( type="range" min="0" max="100" step="5" placeholder="Full Name" )
</template>
<script>
import { makeCustomer } from '../CustomerDataset.js';

export default {
    data: () => ({
        customer: makeCustomer('', '', '')
    }),
    computed: {
        done() {
            const c = this.customer
            return Boolean(c.age) && Boolean(c.gender || c.gender === 0) && Boolean(c.name)
        }
    }
}
</script>
<style lang="sass" src="./_button.sass" scoped></style>
<style lang="sass" src="./_app-body.sass" scoped></style>
<style lang="sass" scoped>
@import '~@/styles/config'
form
    font-size: 12px
    color: #072c5d
    font-weight: lighter
    padding: 1em 5px
    input
        -webkit--appearance: none
        box-sizing: border-box
        width: 100%
        outline: none
        border: none
        padding: 2px 10px
        background: transparent
        border-bottom: 1px solid lightgrey
        margin-bottom: 1em
        &::placeholder
            color: rgba($color--text-dark, .5)

.fake-radio
    $height: 32px
    margin: 0
    height: $height
    line-height: $height

    text-align: center
    cursor: pointer
    font-size: 10px
    font-weight: bold    

    input
        display: none


.gender-fields
    display: flex
    flex-wrap: wrap
    align-items: center
    border: none
    padding: 10px 0

    .fake-radio
        flex: 0 0 auto
        opacity: .3
        transition: opacity .2s ease-out

        &:hover, &.selected
            opacity: .8
    .male, .female
        width: 50%
    .male
        background-color: #ffc107
    .female
        background-color: #FF5722

    .unspecified
        width: 100%
        background-color: #81c200

button
    font-size: 18px
    transition: background-color .2s ease-out
button[disabled="disabled"]
    background-color: #cccccc
</style>
