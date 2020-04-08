import React from 'react'
import AV from 'leancloud-storage';
import Footer from './Footer'
import BarChart from '../components/BarChart'

export default class Home extends React.PureComponent {

  render () {
    return (
      <div>
      <div className='container d-flex flex-column align-items-center home'>
        <br/><br/>
        <h1> Welcome !!! </h1>

        {!AV.User.current() || AV.User.current().isAnonymous() ? (
             <h1> Not Looged in</h1>
            ) : (
              <BarChart/>
            )}

       
        {/* <Chart chartData={this.state.chartData} legendPosition='bottom' /> */}
      </div>
      <Footer/> 
      </div>
    )
  }
}
