<template lang="pug">
    article#demo-pie-chart
        .tooltip
        svg( viewport="" :width="width" :height="height")
          g.chart-group( :transform="`translate(${width/2}, ${height/2})`")
            
</template>
<style lang="sass" scoped>
.tooltip
  top: 0
  left: 0
  display: none
  position: absolute
  text-align: center
  line-height: 2em
  padding: .25em
  margin-top: -20px
  font-size: 18px
  background: #ddd
  pointer-events: none
svg
  cursor: default
</style>

<script>
import {
  getGenderUidByLabel,
  getGenderLabelAndColor
} from "../CustomerDataset";

import { arc as d3Arc, pie as d3Pie } from "d3-shape";
import { select as d3Select } from "d3-selection";
import { interpolate as d3Interpolate } from "d3-interpolate";
import { easeQuadOut as d3Easing } from "d3-ease";

import "d3-transition";

const selectors = {
  centerG: "#demo-pie-chart .chart-group",
  arcGs: ".arc-g",
  tooltip: "#demo-pie-chart .tooltip"
};
export default {
  props: {
    customers: Array,
    size: Number
  },
  computed: {
    groupedGenders() {
      return this.customers.reduce(
        (partitions, customer) => {
          partitions[customer.gender].count++;
          return partitions;
        },
        [
          { gender: 0, count: 0 },
          { gender: 1, count: 0 },
          { gender: 2, count: 0 }
        ]
      );
    },
    arcGenerator() {
      return d3Arc()
        .outerRadius(this.radius)
        .innerRadius(50);
    },
    pieGenerator() {
      return d3Pie()
        .value(d => d.count)
        .sort(d => d.gender);
    },
    width() {
      return this.size;
    },
    height() {
      return this.size;
    },
    radius() {
      return this.size / 3;
    }
  },
  methods: {
    applyTransition(selection) {
      selection = selection
        .transition()
        .ease(d3Easing)
        .duration(d => (d.endAngle - d.startAngle) * 200)
        .delay((d, i) => i * 150);

      return selection;
    },
    animateText(text, isInitial = false) {
      text.style("opacity", 0);
      this.applyTransition(text)
        .attr("transform", d => `translate(${this.arcGenerator.centroid(d)})`)
        .style("opacity", 1);
    },
    animatePath(paths, isInitial = false) {
      this.applyTransition(paths).attrTween("d", b => {
        const i = d3Interpolate(
          { startAngle: b.startAngle, endAngle: b.startAngle },
          b
        );
        return t => this.arcGenerator(i(t));
      });
    },
    enterData(arcs) {
    
      const // Create new Gs and Paths and color them
        enterGs = arcs.enter().append("g")
          .classed('new', true)
          .classed(selectors.arcGs, true)
          .each(function(d) {
            this.classList.add(`${getGenderLabelAndColor(d.data.gender).label}-${d.data.gender}`)
            this.classList.add(`count-${d.data.count}`)
          })
          .on('mouseover', d => {
            d3Select(selectors.tooltip)
              .text(`${d.value} ${getGenderLabelAndColor(d.data.gender).label}`)
              .style('display', 'block')
          })
          .on('mouseout', d => {
            d3Select(selectors.tooltip)
              .style('display', 'none')
              .text('')
          }),
        enterPaths = enterGs
          .append("path")
          .style("fill", c => getGenderLabelAndColor(c.data.gender).color),
          
        enterLabel = enterGs
          .append("text")
          .attr("transform", d => `translate(${this.arcGenerator.centroid(d)})`)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central")
          .attr("fill", "white")
          .attr("font-size", "18px")
          .text(
            d => `${getGenderLabelAndColor(d.data.gender).label.charAt(0)}`
          ),
        allPaths = enterPaths
          .merge(arcs.selectAll('path'))


      // animate value
      this.animatePath(allPaths);
    },
    updateData(arcs) {
      
      arcs.classed('old', true)
      arcs.classed('new', false)
    },
    exitData(arcs) {
      arcs.remove();
    },
    joinDataAndArcs() {
        const data = this.pieGenerator(this.groupedGenders);

        const chartGroup = d3Select(selectors.centerG),
        arcs = chartGroup
            .selectAll(selectors.arcGs)
            .data(data, d => d.data.gender);

        return arcs;
    },
    updateChart() {
        const arcs = this.joinDataAndArcs();

        this.updateData(arcs);
        this.enterData(arcs);
        this.exitData(arcs.exit());
    },
  },
  mounted() {
    this.updateChart()
  },
  watch: {
    groupedGenders: {
      deep: true,
      handler(val) {
        this.updateChart();
      }
    }
  }
};
</script>
