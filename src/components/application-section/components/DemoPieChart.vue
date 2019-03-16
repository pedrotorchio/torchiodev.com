<template lang="pug">
    article#demo-pie-chart
        svg( viewport="" :width="width" :height="height")
            g( ref="chart-group" :transform="`translate(${width/2}, ${height/2})`")
</template>

<script>
import { getGenderUidByLabel, getGenderLabelAndColor } from '../CustomerDataset'

import { arc as d3Arc, pie as d3Pie } from 'd3-shape'
import { select as d3Select } from 'd3-selection'

export default {
    props: {
        customers: Array,
        size: Number
    },
    computed: {
        arcGenerator(){
            return d3Arc()
                .outerRadius(this.radius)
                .innerRadius(0)
        },
        pieGenerator() {
            return d3Pie()
                .sort(null)
                .value(d => d.gender)
        },
        width() {
            return this.radius
        },
        height() {
            return this.radius
        },
        radius() {
            return this.size
        }
    },
    mounted() {
        const 
            chartGroup = d3Select(this.$refs["chart-group"]),
            arcs = chartGroup.selectAll('.arc')
                .data(this.pieGenerator(this.customers))
                .enter().append("g")
                .attr("class", "arc")

            arcs
                .append("path")
                .attr("d", this.arcGenerator)
                .style("fill", c => getGenderLabelAndColor(c.value).color )
            // arcs
            //     .appnd("text")
            //     .attr("transform", d => `translate`)
        
    }
}
</script>
