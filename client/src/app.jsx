import React from 'react';
import axios from 'axios'
// import DatePicker from 'react-date-picker';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';


const LineChart = require("react-chartjs").Line;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
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

    onChange = date => this.setState({ date })

    render() {
        return (
            <div>
                <div>
                    <DateRangePicker
                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    />
                </div>
                <div>
                    <LineChart data={this.state.data} width="600" height="250"/>
                </div>

                
            </div>
            
        )
    }
}


export default App