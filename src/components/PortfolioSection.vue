<template lang="pug">
    section#portfolio-section.page-section
        .inner-section.padded
            h2 Portfolio
            .content( :class="{ selected }")
                .half-side.description
                    span.tip Select a work from the grid
                    .details
                        .heading
                            .title-group
                                h3.title {{ selectedFallback.title  }}
                                h4.subtitle {{ selectedFallback.subtitle }}
                            span.date {{ selectedFallback.date }}
                        span.url {{ selectedFallback.url }}
                        ul.features
                            li( v-for="(feat, i) in selectedFallback.features" :key="i" ) {{ feat }}
                        ul.tags
                            li( v-for="(tag, i) in selectedFallback.tags" :key="i" ) {{ tag }}

                .half-side.grid
                    work-item( v-for="work in works" :key="work.title"
                        v-out-click
                        @click.native="select(work)"
                        @out-click.native="deselect(work)"
                        :work="work"
                        :class="{ toggled: isSelected(work) }" )
</template>
<script>
import works, { makeEmptyWork } from '@/assets/portfolio'
import WorkItem from './portfolio-section/WorkItem'

export default {
    components: { WorkItem },
    data: () => ({
        works,
        selected: null
    }),
    computed: {
        selectedFallback() {
            return this.selected || makeEmptyWork()
        }
    },
    methods: {
        select(work){
            this.selected = work
        },
        deselect(work){
            if (this.selected && this.selected.title == work.title)
                this.selected = null
        },
        isSelected(work) {
            return this.selected && this.selected.title == work.title
        }
    }
}
</script>
<style lang="sass" scoped>
@import '~@/styles/config'
@import url('https://fonts.googleapis.com/css?family=Dosis')

$height: ($size--max-width - $size--section-padding)/2
#portfolio-section    
    background: $color--maroon
.grid
    display: flex
    flex-wrap: wrap
    .work-item
        $side: $height/2
        flex: 1 0 $side
        width: $side
        // height: $side
        // max-width: $side
        // min-width: $side
.description
    overflow: hidden
    position: relative
.content
    display: flex
    color: white
    height: $height
        
    &.selected
        .tip
            transform: translateX(#{-$height}) translateY(-50%)
            opacity: 0
        .details
            transform: translateX(0)
            opacity: 1

.details
    transform: translateX(100px)
    opacity: 0

.heading
    display: flex
    justify-content: flex-start
    align-items: center
    padding: 1em 0
    font-weight: lighter
    font-family: 'Dosis', 'Open Sans', sans-serif
    .date
        flex: 0 0 auto
        text-align: right
        letter-spacing: .2em
    .title-group
        flex: 1 1 auto
        text-align: left
        font-size: 24px
        font-weight: inherit

        .title, .subtitle
            font-weight: inherit
            margin: 0
            display: inline-block
        .subtitle
            letter-spacing: .1em
        .title
            letter-spacing: .2em
            text-transform: uppercase
            margin-right: 1em
        
    
    
.tip, .details
    transition: .2s ease-out
    transition-property: opacity, transform
.tip
    opacity: 1
    text-align: center
    display: block
    font-weight: lighter
    letter-spacing: .4em
    position: absolute
    top: 50%
    left: 50%
    transform: translateY(-50%) translateX(-50%)
    white-space: nowrap


.half-side

    &:nth-of-type(2)
        padding-left: 0

h2
    font-weight: bold
    font-size: 32px
    font-family: impact, sans-serif
    color: white
    text-transform: uppercase
    letter-spacing: .4em
    text-shadow: 3px 0px 0 black
    margin: 0
</style>

