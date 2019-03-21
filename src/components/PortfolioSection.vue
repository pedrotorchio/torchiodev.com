<template lang="pug">
    section#portfolio-section.page-section
        .inner-section.padded
            h2 Portfolio
            .content( :class="{ selected }")
                .half-side.description
                    span.tip Select a work from the grid

                .half-side.grid
                    work-item( v-for="work in works" :key="work.title"
                    @click.native="selected=work"
                    :work="work"
                    :class="{ toggled: selected.title == work.title }" )
</template>
<script>
import works from '@/assets/portfolio'
import WorkItem from './portfolio-section/WorkItem'

export default {
    components: { WorkItem },
    data: () => ({
        works,
        selected: {
            
        }
    })
}
</script>
<style lang="sass" scoped>
@import '~@/styles/config'

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

.content
    display: flex
    color: white
    height: $height
        
    &.selected
        .tip
            display: none
.tip
    line-height: $height
    text-align: center
    display: block
    font-weight: lighter
    letter-spacing: .4em

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

