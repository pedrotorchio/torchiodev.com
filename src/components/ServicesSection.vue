<template lang="pug">
    section#services-section.page-section
        ul.services
            li( v-for="(service, i) in services")
                service( :service="service" :toggled="toggledService == i" :invert="i > 1" 
                @toggle="open(i)"
                @hover="open(i)" 
                @close="close(i)" )
</template>
<script>
import services from '@/assets/services'
import Service from './services-section/Service'

export default {
    components: { Service },
    data: () => ({
        services,
        toggledService: -1
    }),
    methods: {
        open(i) {
            this.toggledService = i
        },
        close(i) {
            if (this.toggledService == i)
                this.toggledService = -1
        }
    }
}
</script>
<style lang="sass" scoped>
ul.services
    z-index: 9999
    display: flex
    justify-content: space-around
</style>
