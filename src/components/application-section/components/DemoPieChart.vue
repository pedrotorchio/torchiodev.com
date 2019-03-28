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
  display: block
  margin: 0 auto
</style>

<script>
import {
  getGenderUidByLabel,
  getGenderLabelAndColor
} from "../CustomerDataset";

import { arc as d3Arc, pie as d3Pie } from "d3-shape";
import { select as d3Select } from "d3-selection";
import { interpolate as d3Interpolate } from "d3-interpolate";

import DemoAppChart from './DemoAppChart.mixin'

export default {
  extends: DemoAppChart,
  props: {
    customers: Array
  },
  data: () => ({
    size: 0
  }),
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
    
    animateText(text, isInitial = false) {
        const vm = this;
        this.applyTransition(text)
        .attrTween("transform", function(d) {
            this._current = this._current || d;
            const i = d3Interpolate(this._current, d);
            this._current = i(0);
            return t => {
              var pos = vm.arcGenerator.centroid(i(t));
              return "translate("+ pos +")";
            }
          })
    },
    animatePath(paths, isInitial = false) {
      const vm = this;

      this.applyTransition(paths)
        .attrTween("d", function(b) {
          this._current = this._current || { startAngle: b.startAngle, endAngle: b.startAngle };
          const i = d3Interpolate(
            this._current,
            b
          );
          this._current = i(0)
        return t => vm.arcGenerator(i(t));
      });
    },
    enterData(arcs) {
    
      const g = arcs
        .append('g')
        .classed('arc', true)
        .each(function(d) {
          this.classList.add(`${getGenderLabelAndColor(d.data.gender).label}-${d.data.gender}`)
          this.classList.add(`count-${d.data.count}`)
        })
      const paths = g
        .append('path')
        .style("fill", c => getGenderLabelAndColor(c.data.gender).color)
        .on('mouseover', d => {
          d3Select('.tooltip')
            .text(`${d.value} ${getGenderLabelAndColor(d.data.gender).label}`)
            .style('display', 'block')
        })
        .on('mouseout', d => {
          d3Select('.tooltip')
            .style('display', 'none')
            .text('')
        })

          
      g
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("fill", "white")
        .attr("font-size", "18px")
        .text(
          d => `${getGenderLabelAndColor(d.data.gender).label.charAt(0)}`
        )

    },
    updateData(arcs, texts) {      
      this.animatePath(arcs)
      this.animateText(texts)
    },
    exitData(arcs) {
      arcs.remove();
    },
    joinDataAndArcs() {
        const data = this.pieGenerator(this.groupedGenders);
        const base = d3Select('#demo-pie-chart svg g.chart-group')
        return {
          arcs: base
            .selectAll(`.arc path`)
            .data(data),
          textSelect: base
            .selectAll(`.arc text`)
            .data(data)
        }
    },
    updateChart() {
        const {arcs, textSelect} = this.joinDataAndArcs();

        this.updateData(arcs, textSelect);
        this.enterData(arcs.enter());
        this.exitData(arcs.exit());

    },
  },
  mounted() {
    this.size = this.$el.clientWidth;
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
