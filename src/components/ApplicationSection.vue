<template lang="pug">
    section#application-section.page-section.padded
        .app-section
            .screen-1.mdc-elevation--z2
                #pie-chart.screen-half
                    demo-pie-chart( :size="250" :customers="dataset" )
                    h3 Gender
                #bar-chart.screen-half
            .screen-2.mdc-elevation--z2
            .phone
                img( src="@/assets/imgs/application/phone-big.png" )
                .phone-screen
                    demo-application
            .tip
                svg-loader( name="tip-arrow" )
                h3.textual-tip Try this demo

        .title-group
            h2.block-title
                span.line.big Transform
                span.line.big Your Work
                span.line.big Routine.
                span.line.medium Make Life Easier.
            p.title-text
                | It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
</template>
<script>
import '@/components/svg/tip-arrow'
import DemoApplication from './application-section/DemoApplication'
import GenderChartMixin from './application-section/GenderChart.mixin'

import customers from './application-section/CustomerStore'

export default {
    components: { DemoApplication },
    mixins: [ GenderChartMixin ],
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
    display: flex
    align-items: center

.app-section
    flex: 1 1 auto
.title-group
    flex: 0 1 auto
    
.screen-1, .screen-2
    margin: 50px auto
    $w: 500px
    width: $w
    height: $w * .5
    background: white
.title-text
    width: 450px
.phone
    position: absolute
    bottom: 0
    z-index: 99
.phone-screen
    height: 233px
    width: 134px
    background: white
    position: absolute
    z-index: 99
    bottom: 124px
    left: 121.5px
    overflow: hidden    

.tip
    position: absolute
    z-index: 999
    left: 330px
    bottom: 20px

    svg
        height: 50px

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
    h3
        position: absolute
        bottom: 0
        left: 0
        margin: .5em
.screen-half
    display: block
    position: relative
    width: 50%
</style>
