import React from 'react'
//import Chart from '../components/Chart'
import Chart from "react-google-charts";
import AV from 'leancloud-storage';

export default class Home extends React.PureComponent {
  constructor () {
    super()
    this.state = {
     //Data: {[]}
    }
  }

  // componentDidMount () {
  //   this.fetchCategories()
  // }

  // fetchCategories = async () => {
  //   // this.setState({ isLoading: true })
  //   try {
  //     var query = new AV.Query('Categories')
  //     query.equalTo('user', this.user.id)
  //     await query.first().then(queryResult => {
  //       //Define New Arrays
  //       let newLabels = []
  //       let newData = []
  //       let theCategories = []
  //       //If Query is Valid
  //       if (queryResult !== undefined) {
  //         //Grab Categories
  //         theCategories = queryResult.attributes.userCategories
  //         //Iterate and Format for Chart Data
  //         for (let i = 0; i < theCategories.length; i++) {
  //           newLabels = [...newLabels, theCategories[i].Category]
  //           //newData = [...newData, theCategories[i].Budget]
  //         }
  //       }
  //       console.log(newData)
  //       //Update State
  //       this.setState({
  //         userCategories: theCategories,
  //         // Data: {[
  //         //   ['City', '2010 Population', '2000 Population'],
  //         //   ['New York City, NY', 8175000, 8008000],
  //         //   ['Los Angeles, CA', 3792000, 3694000],
  //         //   ['Chicago, IL', 2695000, 2896000],
  //         //   ['Houston, TX', 2099000, 1953000],
  //         //   ['Philadelphia, PA', 1526000, 1517000]
  //         // ]}
  //       })
  //     })
  //   } catch (error) {
  //     console.log(JSON.stringify(error))
  //   } finally {
  //     this.setState({ isLoading: false })
  //   }
  // }

  render () {
    return (
      <div className='container d-flex flex-column align-items-center'>
        <h1> Welcome !!! </h1>
        {/* <Chart chartData={this.state.chartData} legendPosition='bottom' /> */}

        {/* <div style={{ display: 'flex', maxWidth: 900 }}> */}
            <Chart
              width={600}
              height={400}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Category', 'Expense', 'Budget'],
                ['Food', 550, 600],
                ['Transport', 670, 900],
                ['Household', 1100, 1300],
                ['Recreation', 100, 300]
              ]}
              options={{
                title: 'Monthly Expense vs Budget Chart',
                fontSize:25,
                chartArea: { width: '100%' },
                hAxis: {
                  title: 'Expense',
                  minValue: 0,
                },
                vAxis: {
                  title: 'Budget',
                  minValue: 0
                },
              }}
              legendToggle
            />
            {/* </div> */}
      </div>
    )
  }
}
