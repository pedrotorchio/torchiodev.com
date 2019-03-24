<template lang="pug">
    #demo-app-satisfaction
        .content
            ul.satisfaction-entries
                li(v-for="(entry, i) in progress")
                    span {{ progress.length - i }} 
                    | {{ entry }}
        .actions
            button.mdc-elevation--z2.go( @click="insert" :style="{ background: color }") +
            input( type="number" name="newSatisfaction" v-model.number="newSatisfaction" min="0" max="100" step="5")
        
</template>
<script>
import { select as d3Select } from 'd3-selection'

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
        },
        currEntryIndex() {
            return this.customer.satisfactionProgress.length - 1
        },
        selections() {
            const 
                gender = this.customer.getGenderLabel().toLowerCase(),
                index = this.currEntryIndex,
                group = d3Select(`#demo-line-chart .line.${gender}`),
                line = group.select('path'),
                allCircles = group.selectAll('circle'),
                averageGroup = d3Select(`#demo-line-chart .line.average`)

            return { gender, index, group, line, allCircles, averageGroup }
        },
        color() {
            return this.customer.getGenderColor()
        }
    },
    methods: {
        insert() {
            const 
                progress = this.customer.satisfactionProgress,
                length = progress.length,
                last = progress[length-1];

            if (last != this.newSatisfaction && this.currEntryIndex < 20)
                this.$emit('new-entry', this.newSatisfaction)
        },
        bringToFront(group) {
            group.each( function(g) {
                this.parentNode.appendChild(this)
            })
        },
    },
    watch: {

        currEntryIndex: {
            immediate: true,
            handler() {
                const 
                    { allCircles, index } = this.selections,
                    circle = allCircles.filter((d,i)=>i===index);

                allCircles
                    .classed('pulse', false)
                circle
                    .classed('pulse', true)
            }
        }
    },
    mounted() {
        this.bringToFront(this.selections.group)
    },
    beforeDestroy() {
        const { allCircles } = this.selections
        allCircles.classed('pulse', false)
        this.bringToFront(this.selections.averageGroup)
    }
}
</script>
<style lang="sass" src="./_button.sass" scoped></style>
<style lang="sass" src="./_app-body.sass" scoped></style>
<style lang="sass" scoped>
@import './app-config'

.satisfaction-entries li
    color: white
    font-weight: lighter
    text-align: center
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3)
    line-height: 2em
    height: 2em
    letter-spacing: .2em
    position: relative
    
    span
        position: absolute
        left: 0
        font-size: 12px
        text-shadow: none
        padding-left: .5em
    
    &:nth-child(odd)
        background-color: rgba($color--male, .5)
    &:nth-child(even)
        background-color: rgba($color--female, .5)
</style>
