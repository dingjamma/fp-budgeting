import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import AV from 'leancloud-storage';
//import Chart from "react-google-charts";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoading: true,
      chartData: {
        labels: [],
        datasets: []
      },
    };
    this.user = AV.User.current()
  }

  componentDidMount () {
    this.fetchCategories()
  }

  fetchCategories = async () => {
    // this.setState({ isLoading: true })
    try {
      var query = new AV.Query('Categories')
      query.equalTo('user', this.user.id)
      await query.first().then(queryResult => {
        //Define New Arrays
        let newLabels = []
        let newData = []
        let theCategories = []
        //If Query is Valid
        if (queryResult !== undefined) {
          //Grab Categories
          theCategories = queryResult.attributes.userCategories
          //Iterate and Format for Chart Data
          for (let i = 0; i < theCategories.length; i++) {
            newLabels = [...newLabels, theCategories[i].Category]
            //newData = [...newData, theCategories[i].Budget]
          }
        }
        console.log(newData)
        //Update State
        this.setState({
          userCategories: theCategories,
          chartData: {
            labels: newLabels,
            datasets: [
              {
                label: 'Category',
                data: [[600,800], [500,900]],
                backgroundColor: [
                  'rgba(255,99,132,0.6)',
                  'rgba(54,162,235,0.6)',
                  'rgba(255,206,86,0.6)',
                  'rgba(75,192,192,0.6)'
                ]
              }
            ]
          }
        })
      })
    } catch (error) {
      console.log(JSON.stringify(error))
    } finally {
      this.setState({ isLoading: false })
    }
  }


  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
  };
  render() {
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
          width={100}
          height={50}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Monthly Expense status",
              fontSize: 25,
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
            },
          }}
        />
      </div>
    );
  }
}

export default Chart;
