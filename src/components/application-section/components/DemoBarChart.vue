<template lang="pug">
    article#demo-bar-chart( :style="{ padding: `${padding}px 0`, paddingRight: `${padding}px` }" )
        .chart-group( :style="{ height: `${maxSize}px` }" )
            .average
                span.min Min: {{ageExtent[0]}}
                span.max Max: {{ageExtent[1]}}
                span.average-age( :style="{ left: `${xScale(averageAge)}%` }") Avg: {{averageAge}}
            ul.bars
                li.young(  )
                    span( v-if = "youngPartition.length > 0") {{youngPartition.length}}
                li.adults(  )
                    span( v-if = "adultPartition.length > 0") {{adultPartition.length}}
                li.older(  )
                    span( v-if = "olderPartition.length > 0") {{olderPartition.length}}
            ul.domain
                li.young < 30
                li.adults 30 - 50
                li.older > 50

</template>
<style lang="sass" scoped>
@import './app-config'
#demo-bar-chart
    box-sizing: border-box
.chart-group
    position: relative
    display: block
    margin: 0 auto
$color: $color--average
ul
    display: flex
    justify-content: space-between
    align-items: flex-end
    width: 100%
li
    flex: 0 0 25%
    text-align: center
    color: $color

.bars li
    background: $color
    overflow: hidden
    padding-top: 1px
    transition: height .2s ease-out
    will-change: height
    
    span
        color: white
        line-height: 1
        text-shadow: 1px 0px 2px $color

.domain, .bars
    position: absolute

$domain-height: 16px

.bars
    height: calc(100% - #{$domain-height * 2})
    bottom: $domain-height
.domain, .average
    line-height: $domain-height
    font-size: 14px
.domain
    bottom: 0
.average
    text-align: center
    span
        margin: 0 5px
</style>

<script>
import { scaleLinear as d3LinearScale } from 'd3-scale'
import { extent as d3Extent } from 'd3-array'
import { select as d3Select } from 'd3-selection'
import { interpolate as d3Interpolate } from "d3-interpolate";

import DemoAppChart from './DemoAppChart.mixin'

export default {
    extends: DemoAppChart,
    props: {
        customers: Array
    },
    data: () => ({
        size: 0
    }),
    computed: {
        averageAge() {
            return Math.floor(this.customers.reduce((sum, c) => sum + c.age, 0) / this.customersCount)
        },
        padding() {
            return ( this.size - this.maxSize ) / 2
        },
        maxSize() {
            return this.size * 2 / 3
        },
        customersCount() {
            return this.customers.length
        },
        youngPartition() {
            return this.customers.filter(c => c.age < 30)
        },
        adultPartition() {
            return this.customers.filter(c => c.age >= 30 && c.age <= 50)
        },
        olderPartition() {
            return this.customers.filter(c => c.age > 50)
        },
        ageExtent() {
            return d3Extent(this.customers, c => c.age)
        },
        xScale() {
            return d3LinearScale(this.ageExtent, [0, 100])
        },
        scale() {
            return d3LinearScale([0, this.customersCount], [0, 100])
        }
    },
    methods: {
        updateChart() {
            const bars = d3Select('#demo-bar-chart .chart-group .bars')
                .selectAll('li')
                .data([ this.youngPartition, this.adultPartition, this.olderPartition ])
            const vm = this
            this.applyTransition(bars)
                // .style('height', d => `${this.scale(d.length)}px`)
                .styleTween('height', function(d) {
                    
                    this._current = this._current || d.length;
                    const i = d3Interpolate(this._current, d.length);
                    this._current = i(0);
                    return t => `${vm.scale(i(t))}px`
                })
        }
    },
    mounted() {
        this.size = this.$el.clientWidth;
        this.updateChart()
    },
    watch: {
        customers: {
            deep: true,
            handler() {
                this.updateChart()
            }
        }

    }

}
</script>
