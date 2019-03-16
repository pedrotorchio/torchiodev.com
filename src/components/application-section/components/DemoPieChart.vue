<template lang="pug">
    article#demo-pie-chart
        svg( viewport="" :width="width" :height="height")
            g( ref="chart-group" :transform="`translate(${width/2}, ${height/2})`")
</template>

<script>
import { getGenderUidByLabel, getGenderLabelAndColor } from '../CustomerDataset'

import { arc as d3Arc, pie as d3Pie } from 'd3-shape'
import { select as d3Select } from 'd3-selection'
import { interpolate as d3Interpolate } from 'd3-interpolate'
import { easeElasticOut as d3Easing } from 'd3-ease'

import 'd3-transition'


export default {
    props: {
        customers: Array,
        size: Number
    },
    computed: {
        groupedGenders() {
            return this.customers
            .reduce((partitions, customer) => {

                partitions[customer.gender].count++;
                return partitions

            }, [{ gender: 0, count: 0 }, { gender: 1, count: 0 }, { gender: 2, count: 0 }])
        },
        arcGenerator(){
            return d3Arc()
                .outerRadius(this.radius)
                .innerRadius(50)
        },
        pieGenerator() {
            return d3Pie()
                .value(d => d.count)
        },
        width() {
            return this.size
        },
        height() {
            return this.size
        },
        radius() {
            return this.size / 3
        }
    },
    methods: {
        updateChart() {
            const 
                chartGroup = d3Select(this.$refs["chart-group"]),
                arcs = chartGroup.selectAll('.arc')
                    .data(this.pieGenerator(this.groupedGenders))

                    .enter().append("g")
                    .attr("class", "arc")
                    .each(function(d) {
                        this.classList.add(`${getGenderLabelAndColor(d.data.gender).label}-${d.data.gender}`)
                        this.classList.add(`count-${d.data.count}`)
                    })

            arcs
                .append("path")
                // .attr("d", this.arcGenerator)
                .style("fill", c => getGenderLabelAndColor(c.data.gender).color )

                .transition()
                        .ease(d3Easing)
                        .duration(2000)
                    .attrTween("d", b => {
                        const i = d3Interpolate({ startAngle: 0, endAngle: 0 }, b);
                        return t => this.arcGenerator(i(t))
                    })
                .transition()
                        .ease(d3Easing)
                        .delay((d,i) => 2000 + i * 50)
                        .duration(750)
                    .attrTween("d", b => {
                        var i = d3Interpolate({ innerRadius: 0 }, b);
                        return t => this.arcGenerator(i(t))
                    });
                
                
            arcs
                .append("text")
                .attr("transform", d => `translate(${this.arcGenerator.centroid(d)})`)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")
                .attr("fill", "white")     
                .attr("font-size", "24px")
                .text(d => getGenderLabelAndColor(d.data.gender).label.charAt(0));
        }
    },
    mounted() {
        this.updateChart()
    },
    watch: {
        customers() {
            this.updateChart()
        }
    }
}
</script>
