<template lang="pug">
    section#application-section.page-section.padded
        .inner-section
            .app-section.half-side
                .limited-width
                    .screen-1.mdc-elevation--z2
                        #pie-chart.screen-half
                            demo-pie-chart( :size="250" :customers="dataset" )
                            h3 Gender
                        #bar-chart.screen-half
                            demo-bar-chart( :size="250" :customers="dataset" )
                            h3 Age

                    .screen-2.mdc-elevation--z2
                        demo-line-chart( :customers="dataset" :height="200" :width="500" :padding="10" )
                        h3 Lastest Satisfaction Averages
                    .phone.img-group
                        img( src="@/assets/imgs/application/phone-big.png" )
                        .phone-screen
                            demo-application
                    .tip
                        svg-loader( name="tip-arrow" )
                        h3.textual-tip Try this demo

            .title-group.half-side
                h2.block-title
                    span.line.big Transform
                    span.line.big Your Work
                    span.line.big Routine.
                    span.line.medium Make Life Easier.
                p.title-text
                    u Easy to access, no installation required. 
                    |  Users can easily access the application from any computer or mobile phone in the world.
</template>
<script>
import '@/components/svg/tip-arrow'
import DemoApplication from './application-section/DemoApplication'
import GenderChartMixin from './application-section/GenderChart.mixin'
import AgeChartMixin from './application-section/AgeChart.mixin'
import SatisfactionChartMixin from './application-section/SatisfactionChart.mixin'

import customers from './application-section/CustomerStore'

export default {
    components: { DemoApplication },
    mixins: [ GenderChartMixin, AgeChartMixin, SatisfactionChartMixin ],
    data: () => ({
        customers
    }),
    computed: {
        dataset() {
            return customers.getDataset()
        }
    }
}
</script>

<style lang="sass" scoped>
@import "~@/styles/config"
#application-section
    $bg-blue: #f2f6ff
    background: radial-gradient(circle 60vw at left bottom, white 0%, #{$bg-blue} 100%)
.inner-section
    display: flex
    align-items: center

    
.screen-1, .screen-2
    position: relative
    margin: 50px auto
    $w: 500px
    width: $w
    height: $w * .5
    background: white

=phone-elevation($color)
    filter: drop-shadow(7px 17px 6px #{$color})
.phone
    +phone-elevation(#ccccccaa)
    position: absolute
    bottom: 0
    left: 0
    z-index: 99

    img
        position: absolute
        bottom: 0
        left: 0

.phone-screen
    height: 234px
    width: 135.4px
    box-shadow: inset 0 0 3px 0 #000000
    background: white
    position: absolute
    z-index: 99
    bottom: 120px
    left: 121.5px
    overflow: hidden    

.tip
    +phone-elevation(#000000aa)
    position: absolute
    z-index: 999
    left: 240px
    bottom: 20px

    svg
        height: 50px
        fill: $color--text-dark

    .textual-tip
        position: absolute
        font-weight: lighter
        width: 130px
        bottom: 0
        margin: 0
        color: rgba($color--text-dark, .8)
        left: 50px
.screen-1
    display: flex
    

.screen-1, .screen-2
    h3
        position: absolute
        bottom: 0
        left: 0
        margin: .5em
.screen-2 h3
    right: 0
    left: auto
.screen-half
    display: block
    position: relative
    width: 50%
</style>
