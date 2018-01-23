import React, {Component} from 'react';
import { scaleLinear} from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-collection';

export default class BarChart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.createBarChar();
    }

    componentDidUpdate() {
        this.createBarChar();
    }

    createBarChar = () => {
        const node = this.node;
        const dateMax = max(this.props.data);
        const yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, this.props.size[1]]);

        select(node)
            .selectAll('rect')
            .data(this.props.data)
            .enter()
            .append('rect');

        select(node)
            .selectAll('rect')
            .data(this.props.data)
            .exit()
            .remove();

        select(node)
            .selectAll('rect')
            .data(this.props.data)
            .style('fill','#fe9992')
            .attr('x',(d,i) => i * 25)
            .attr('y', d => this.props.size[1] - yScale)
            .attr('height',d => yScale(d))
            .attr('width',25);
    }

    render() {
        return <svg ref={node => this.node = node} width={500} height={500}></svg>
    }
}