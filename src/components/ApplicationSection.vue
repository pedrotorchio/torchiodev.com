<template lang="pug">
    section#application-section.page-section.padded
        .app-section
            .screen-1.mdc-elevation--z2
            .screen-2.mdc-elevation--z2
            .phone
        .title-group
        
            h2.block-title
                span.line.big Transform
                span.line.big Your Work
                span.line.big Routine.
                span.line.medium Make Life Easier.
            p.title-text
                | It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
</template>
<style lang="sass" scoped>
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
</style>
