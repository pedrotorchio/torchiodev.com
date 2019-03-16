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
        enterData(arcs) {
            const
                // Gs 
                enterArcs = arcs.enter()
                    .append("g")
                    .each(function(d) {
                        this.classList.add(`arc`)
                        this.classList.add(`${getGenderLabelAndColor(d.data.gender).label}-${d.data.gender}`)
                        this.classList.add(`count-${d.data.count}`)
                    }),

                // PATHs
                enterPaths = enterArcs                
                    .append("path")
                    .style("fill", c => getGenderLabelAndColor(c.data.gender).color ),

                // TEXTs
                enterTexts = enterArcs
                    .append("text")
                    .attr("transform", d => `translate(${this.arcGenerator.centroid(d)})`)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")
                    .attr("fill", "white")     
                    .attr("font-size", "24px")
                    .text(d => getGenderLabelAndColor(d.data.gender).label.charAt(0));
                
                // ANIMATION
                enterPaths
                    .transition()
                            .ease(d3Easing)
                            .duration(d => (d.endAngle - d.startAngle) * 1500)
                            .delay((d,i) => i * 150)
                        .attrTween("d", b => {
                            const i = d3Interpolate({ startAngle: b.startAngle, endAngle: b.startAngle }, b);
                            return t => this.arcGenerator(i(t))
                        })

                return enterArcs
        },
        updateChart() {
            console.log(this.pieGenerator(this.groupedGenders));
            const 
                chartGroup = d3Select(this.$refs["chart-group"]),
                arcs = chartGroup.selectAll('.arc')
                    .data(this.pieGenerator(this.groupedGenders), d => d.data.gender),
                
                enterArcs = this.enterData(arcs)
        }
    },
    mounted() {
        this.updateChart()
    },
    watch: {
        groupedGenders: {
            deep: true,
            handler() {
                console.log("changed")
                this.updateChart()
            }
        }
    }
}
</script>
