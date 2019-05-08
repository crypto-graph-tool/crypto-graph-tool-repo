import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
const LineChart = require("react-chartjs").Line;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "Bitcoin",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [65, 590, 800, 810, 15600, 5500, 16000]
                    }
                ]
            },
            chartOptions: {
                
            }
        }
    }

    getPrices(start,end) {
        axios.post('/getPrices').
        then(result => {
            this.setState({
                data: {
                    labels: result.data[0],
                    datasets: [
                        {
                            label: "Bitcoin",
                            fillColor: "rgba(220,220,220,0.2)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: result.data[1]
                        }
                    ]
                },
                chartOptions: {
                    
                }
            })
        })
    }

    componentDidMount() {
        this.getPrices('2019-01-01', '2019-05-01')

    }

    render() {
        return (
            <div>
                <LineChart data={this.state.data} width="600" height="250"/>
            </div>
            
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app'));