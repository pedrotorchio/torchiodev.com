<template lang="pug">
    #demo-app-satisfaction
        .content
            ul.satisfaction-entries
                li(v-for="(entry, i) in progress") {{entry}}
        .actions
            button.mdc-elevation--z2( @click="insert") +
            input( type="number" name="newSatisfaction" v-model.number="newSatisfaction" min="0" max="100" step="5")
        
</template>
<script>
export default {
    props: {
        customer: Object,
    },
    data: () => ({
        newSatisfaction: 50
    }),
    computed: {
        progress() {
            return this.customer.satisfactionProgress.slice().reverse()
        }
    },
    methods: {
        insert() {
            this.$emit('new-entry', this.newSatisfaction)
        }
    }
}
</script>
<style lang="sass" src="./_button.sass" scoped></style>
<style lang="sass" src="./_app-body.sass" scoped></style>
<style lang="sass" scoped>
@import './app-config'

</style>
