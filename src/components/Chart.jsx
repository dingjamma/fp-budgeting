import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component{
    constructor(props){
        super(props);
        this.state={
            chartData:{
                labels: ['Food', 'Transport', 'Shopping', 'Recreation'],
                datasets:[
                    {
                        label: 'Category',
                        data:[
                            800, 200, 500, 300 
                        ],
                        backgroundColor:[
                            'rgba(255,99,132,0.6)',
                            'rgba(54,162,235,0.6)',
                            'rgba(255,206,86,0.6)',
                            'rgba(75,192,192,0.6)'
                        ]
                    }
                ]
            }
        }
    }

    static defaultProps = {
        displayTitle : true,
        displayLegend : true,
        legendPosition: 'right'
    }
    render(){
        return(
            <div className="chart">
                <Bar
                    data={this.state.chartData}
                    width={100}
                    height={50}
                    options={{
                        title:{
                            display:this.props.displayTitle,
                            text: 'Monthly Expense status',
                            fontSize: 25
                        },
                        legend:{
                            display:this.props.displayLegend,
                            position:this.props.legendPosition
                        }
                    }}/>
            </div>
        )
    }
}

export default Chart;