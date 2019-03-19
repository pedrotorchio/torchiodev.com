<template lang="pug">
    article#demo-line-chart
        svg( :width="width" :height="height")
            g.chart-group( :transform="`translate(${padding/2}, ${padding/2})`")

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
        width: Number,
        padding: {
            type: Number,
            default: 0
        }
    },
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
            const
                initial = generateArray(0, progressions[0].length)
            
            return progressions
                .reduce((sumArr, p) => sumArr.map((v, i) => p[i] + v), initial)
                .map(sum => Math.floor(sum / progressions.length))
        },
        getEvenSatisfactionProgressions(progressions) {
            
            return progressions.map(p => this.getEvenSatisfactionProgression(p, this.dataBreadth))
        },
        getEvenSatisfactionProgression(original, aimLength) {
            const 
                originalLength = original.length,
                unitBreadth = Math.floor(aimLength / originalLength),
                remainder = aimLength % originalLength
            
            let newProgression = []

            function generateUnit(value, offset = 0) {
                return generateArray(value, unitBreadth + offset)
            }
            for (let i = 0 ; i < originalLength - 1 ; i++) {
                const unit = generateUnit(original[i])
                
                newProgression = newProgression.concat(unit)
                
            }
            const unit = generateUnit(original[originalLength - 1], remainder)
            newProgression = newProgression.concat(unit)

            return newProgression
        },
        makeLine(name, points, style) {
            const container = d3Select("#demo-line-chart svg g.chart-group")
                .append('g')
                .attr('class', `line ${name}`);
            style = {
                color: style.color,
                stroke: style.stroke || 1,
                r: 2,
                values:  Boolean(style.values)
            }
            container
                .selectAll('path')
                .data(points)
                .enter()
                .append('path')
                .attr('fill', 'none')
                .attr('stroke', style.color)
                .attr('stroke-width', style.stroke)
                .attr('d', this.lineGenerator(points));
            container
                .append('g')
                .attr('class', 'entries')
                .selectAll('circle')
                .data(points)
                .enter()
                .append('circle')
                .attr('class', 'avg-entry')
                .attr('r', style.r)
                .style('fill', style.color)
                .attr('cx', (d, i) => this.xScale(i))
                .attr('cy', this.yScale);
            if (style.values) {
                container
                    .selectAll('.entries text')
                    .data(points)
                    .enter()
                    .append('text')
                    .text(d=>d)
                    .attr('font-size', '12')
                    .attr('fill', style.color)
                    .attr('stroke', 'white')
                    .attr('stroke-width', .5)
                    .attr('font-weight', 'bold')
                    .attr('class', 'avg-entry-value')
                    .attr('x', (d, i) => this.xScale(i) - 20)
                    .attr('y', d => this.yScale(d) - 5);
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
                stroke: 2,
                values: true
            })
        },
        remove() {
            d3Select('#demo-line-chart svg g.chart-group').selectAll('*').remove()
        }
    },
    mounted() {
        this.draw()
        
    },
    watch: {
        customers: {
            deep: true,
            handler() {
                this.remove()
                this.draw()
            }
        },
    }
    
}
</script>