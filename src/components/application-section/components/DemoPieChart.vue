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
                .innerRadius(0)
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
    mounted() {
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
                .attr("d", this.arcGenerator)
                .style("fill", c => getGenderLabelAndColor(c.data.gender).color )
                
                
            arcs.append("text")
                .attr("transform", d => {
                    d.innerRadius = 0;
                    d.outerRadius = this.radius;
                    return "translate(" + this.arcGenerator.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .attr("fill", "white")     
            .attr("font-size", "24px")
            .attr("text-shadow", "1px 0 10px black")
            .text(d => getGenderLabelAndColor(d.data.gender).label.charAt(0));
        
    }
}
</script>
