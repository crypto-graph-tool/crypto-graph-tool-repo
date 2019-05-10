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
            start: '2019-04-01',
            end: '2019-05-05',
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
        axios.post('/getPrices', {
            start: start,
            end: end
        }).
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
        this.getPrices('2019-04-01','2019-05-05')
    }

    formatStartEnd() {
        let fullStartDate = JSON.stringify(new Date(this.state.startDate))
        let fullEndDate = JSON.stringify(new Date(this.state.endDate))
        var startDate = fullStartDate.substr(1,fullStartDate.indexOf('T')-1);
        var endDate = fullEndDate.substr(1,fullEndDate.indexOf('T')-1);
        this.setState({
            start: startDate,
            end: endDate
        })
        this.getPrices(this.state.start, this.state.end)
        
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
                        isOutsideRange={() => false}
                    />
                </div>
                <div>
                    <button onClick={this.formatStartEnd.bind(this)}>Update</button>
                </div>
                <div>
                    <LineChart data={this.state.data} width="1400" height="500"/>
                </div>

                
            </div>
            
        )
    }
}


export default App