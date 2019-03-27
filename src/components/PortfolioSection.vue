<template lang="pug">
    section#portfolio.page-section
        .inner-section.padded
            h2 Portfolio
            .content( :class="{ selected, 'show-tip': showTip }")
                .half-side.description
                    p.tip 
                        | Hover and click to watch the use and
                        br
                        | see details of any work in the grid
                    .details
                        .heading
                            .title-group
                                h3.title {{ selectedFallback.title  }}
                                h4.subtitle( :class="{ separator: selectedFallback.subtitle }" ) {{ selectedFallback.subtitle }}
                            span.date {{ selectedFallback.date }}
                        a.url( :href="selectedFallback.url" target="_blank" @click.stop="" ) {{ selectedFallback.url }}
                        ul.features
                            li( v-for="(feat, i) in selectedFallback.features" :key="i" ) {{ feat }}
                        ul.tags
                            li( v-for="(tag, i) in selectedFallback.tags" :key="i" ) {{ `#${tag}` }}

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
        selected: null,
        showTip__: true
    }),
    computed: {
        selectedFallback() {
            return this.selected || makeEmptyWork()
        },
        showTip() {
            return !Boolean(this.selected) && Boolean(this.showTip__)
        }
    },
    methods: {
        select(work){
            if (this.selected) {
                this.showTip__ = false
                this.selected = null
                setTimeout(() => {
                    this.selected = work
                    this.showTip__ = true
                }, 50)
            } else {
                this.selected = work
                this.showTip__ = true
            }
                
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


$height: ($size--max-width - $size--section-padding)/2
#portfolio    
    background: $color--text-dark
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

%tip-hidden
    transform: translateX(#{-$height}) translateY(-50%)
    opacity: 0
.tip
    @extend %tip-hidden
    text-align: center
    display: block
    letter-spacing: .4em
    position: absolute
    white-space: nowrap
    top: 50%
    left: 50%

.show-tip .tip
    transform: translateY(-50%) translateX(-50%)
    opacity: 1
.description
    overflow: hidden
    position: relative
.content
    display: flex
    color: white
    height: $height
        
    &.show-tip
    &.selected
        .details
            transform: translateX(0)
            opacity: 1
        .tip
            @extend %tip-hidden

.details
    transform: translateX(100px)
    opacity: 0
    font-weight: lighter
    padding: 50px 25px


.heading
    display: flex
    justify-content: flex-start
    align-items: flex-start
    // font-family: 'Dosis', 'Open Sans', sans-serif
    margin-bottom: 1em
    font-size: 24px

    .date
        font-size: 16px
        flex: 0 0 auto
        text-align: right
        letter-spacing: .2em
    .title-group
        flex: 1 1 auto
        text-align: left

        .title, .subtitle
            font-weight: inherit
            margin: 0
            display: block
            text-shadow: 3px 0 0 black

        .subtitle
            letter-spacing: .1em
            // &.separator::before
            //     content: '\2014'
            //     margin: 0 1em
        .title
            letter-spacing: .2em
            text-transform: uppercase
            text-shadow: $shadow--netflix
.url
    font-size: 18px
    color: white
    &:hover
        color: yellow
.features
    font-size: 18px
    list-style-type: circle
    list-style-position: inside
    padding-left: 2em
    li
        margin: 1em 0
        
.tags
    font-size: 14px
    width: 60%
    margin: 0 auto
    text-align: center
    li
        display: inline-block
        white-space: nowrap
        margin: .5em
        
.tip, .details
    transition: .2s ease-out
    transition-property: opacity, transform


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
    text-shadow: $shadow--netflix
    margin: 0
</style>

