import React from 'react'
import Chart from '../components/Chart'

export default class Home extends React.PureComponent {
  constructor () {
    super()
    this.state = {
      chartData: {}
    }
  }

  render () {
    return (
      <div className='container'>
        <h1> Welcome !!! </h1>
        <Chart chartData={this.state.chartData} legendPosition='bottom' />
      </div>
    )
  }
}
