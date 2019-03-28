<template lang="pug">
    article#demo-line-chart
        svg( :width="width" :height="height")
            g.chart-group( :transform="`translate(${padding/2}, ${padding/2})`")
                g.line( v-for="(name, i) in ['female', 'male', 'unspecified', 'average']" :class="[ name ]" :key="i" )
                    path
                
</template>
<script>
import { line as d3Line } from 'd3-shape'
import { scaleLinear as d3LinearScale } from 'd3-scale'
import { select as d3Select } from 'd3-selection'
import { getGenderLabelAndColor, getGenderUidByLabel } from '../CustomerDataset'

function generateArray(value, count) {
    let array = []
    for(let j = 0 ; j < count ; j ++)
        array.push(value)

    return array;
}
export default {
    props: {
        customers: Array,
        height: Number,
        padding: {
            type: Number,
            default: 0
        }
    },
    data: () => ({
        width: 0
    }),
    computed: {
        generalAverageSatisfactionProgression() {
            return this.getProgression(this.customers)
        },
        maleAverageSatisfactionProgression() {
            const set = this.customers.filter(c=>c.gender == getGenderUidByLabel('Male'))
            return this.getProgression(set)
        },
        femaleAverageSatisfactionProgression() {
            const set = this.customers.filter(c=>c.gender == getGenderUidByLabel('Female'))
            return this.getProgression(set)
        },
        unspecifiedAverageSatisfactionProgression() {
            const set = this.customers.filter(c=>c.gender == getGenderUidByLabel('Unspecified'))
            return this.getProgression(set)
        },
        dataBreadth() {
            const 
                satisfaction = this.getSatisfactionProgressionsFromCustomers(this.customers),
                maxEntryCount = this.getMaximumNumberOfEntries(satisfaction)

            return maxEntryCount
        },
        xScale() {  
            return d3LinearScale([0, this.dataBreadth - 1],[0, this.width - this.padding])
        },
        yScale() {
            return d3LinearScale([0,100],[this.height - this.padding,0])
        },
        lineGenerator() {
            return d3Line()
                .x((d,i) => this.xScale(i))
                .y(this.yScale)
        }
    },
    methods: {
        getProgression(set) {
            
            const 
                satisfaction = this.getSatisfactionProgressionsFromCustomers(set),
                evenProgressions = this.getEvenSatisfactionProgressions(satisfaction);
            
            return this.getAverageProgression(evenProgressions)
        },
        getSatisfactionProgressionsFromCustomers(set) {
            return set.map(c => c.satisfactionProgress)
        },
        getMaximumNumberOfEntries(progressions) {
            return progressions.reduce( (max, p) => p.length > max ? p.length : max, 0)
        },
        getAverageProgression(progressions) {
            if (progressions.length == 0)
                return []

            const
                initial = generateArray(0, progressions[0].length)
            
            return progressions
                .reduce((sumArr, p) => sumArr.map((v, i) => p[i] + v), initial)
                .map(sum => Math.floor(sum / progressions.length))
        },
        getEvenSatisfactionProgressions(progressions) {
            
            return progressions
                .filter(p => p && p.length > 0)
                .map(p => this.getEvenSatisfactionProgression(p, this.dataBreadth))
        },
        getEvenSatisfactionProgression(original, aimLength) {
            let copy = original.slice()

            const 
                originalLength = original.length,
                diffLength = aimLength - originalLength,
                value = original[originalLength-1]

            for (let i = 0 ; i < diffLength ; i++) {
                copy.push(value)
            }

            return copy
        },
        makeLine(name, points, style) {
            style = {
                color: style.color,
                stroke: style.stroke || 1,
                r: 2,
                values:  Boolean(style.values)
            }

            const 
                path = d3Select(`#demo-line-chart svg g.chart-group .line.${name} path`)
                    .transition()
                    .duration(200)
                    .attr('d', this.lineGenerator(points))
                    .attr('fill', 'none')
                    .attr('stroke', style.color)
                    .attr('stroke-width', style.stroke),
                circles = d3Select(`#demo-line-chart svg g.chart-group .line.${name}`)
                    .selectAll('circle')
                    .data(points)
            // circles
            //     .transition().duration(200)
            //     .attr('cx', (d, i) => this.xScale(i))
            //     .attr('cy', this.yScale);
            circles
                .enter()
                .append('circle')
                .attr('r', style.r)
                .style('fill', style.color)
                .merge(circles)
                .transition().duration(200)
                .attr('cx', (d, i) => this.xScale(i))
                .attr('cy', this.yScale);


            if (style.values) {
                const 
                    xAxisStyle = {
                        size: 12,
                    },
                    xAxisPosition = (d, i) => {
                        let value = this.xScale(i)
                        if (i === points.length - 1)
                            value -= xAxisStyle.size
                        return value
                    }


                const texts = d3Select(`#demo-line-chart svg g.chart-group .line.${name}`)
                    .selectAll('text')
                    .data(points);
                
                // texts
                //     .transition().duration(200)
                //     .attr('x', xAxisPosition)
                //     .attr('y', this.height - xAxisStyle.size);
                texts
                    .enter()
                    .append('text')
                    .text(d=>d)
                    .attr('font-size', xAxisStyle.size)
                    .attr('fill', style.color)
                    .attr('font-weight', 'bold')
                    // .attr('stroke', 'white')
                    // .attr('stroke-width', .5)
                    .attr('font-weight', 'bold')
                    .merge(texts)
                    .transition().duration(200)
                    .attr('x', xAxisPosition)
                    .attr('y', this.height - xAxisStyle.size);
            }
        },
        draw() {
            this.makeLine('female', this.femaleAverageSatisfactionProgression, {
                color: getGenderLabelAndColor(getGenderUidByLabel('Female')).color
            })
            this.makeLine('male', this.maleAverageSatisfactionProgression, {
                color: getGenderLabelAndColor(getGenderUidByLabel('Male')).color
            })
            this.makeLine('unspecified', this.unspecifiedAverageSatisfactionProgression, {
                color: getGenderLabelAndColor(getGenderUidByLabel('Unspecified')).color
            })

            this.makeLine('average', this.generalAverageSatisfactionProgression, {
                color: 'purple',
                stroke: 2.5,
                values: true
            })
        },
        remove() {
            d3Select('#demo-line-chart svg g.chart-group').selectAll('*').remove()
        }
    },
    mounted() {
        this.width = this.$el.clientWidth;
        this.draw()
        
    },
    watch: {
        customers: {
            deep: true,
            handler() {
                // this.remove()
                this.draw()
            }
        },
    }
    
}
</script>
<style lang="sass" scoped>
#demo-line-chart
    svg
        display: block
        margin: 0 auto
#demo-line-chart svg::v-deep circle.pulse
    animation-name: pulse
    animation-duration: 1s
    animation-timing-function: ease-in-out
    animation-iteration-count: infinite
    animation-direction: alternate
        
@keyframes pulse
  0%
    r: 6
  100%
    r: 8
</style>
