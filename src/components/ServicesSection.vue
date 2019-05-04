<template lang="pug">
    section#services.page-section
        .inner-section
            ul.services
                li( v-for="(service, i) in services" :key="i")
                    service-item( :service="service" :toggled="toggledService == i" :invert="i > 1"
                    @toggle="open(i)"
                    @close="close(i)" )
</template>
<script>
import services from '@/assets/services'
import ServiceItem from './services-section/ServiceItem'
import { rMd } from 'media-query-mixins/_mixins'

export default {
    components: { ServiceItem },
    data: () => ({
        services,
        toggledService: -1
    }),
    methods: {
        open(i) {
            rMd(()=>this.toggledService = i);
        },
        close(i) {
            rMd(()=>{
                if (this.toggledService == i)
                    this.toggledService = -1
            });
        }
    }
}
</script>
<style lang="sass" scoped>
@import '~media-query-mixins/_mixins.scss'

#services
    overflow: visible
ul.services
    display: flex
    justify-content: space-around
    li
        text-align: center
        position: relative
    +rSm
        flex-direction: column
        

</style>
