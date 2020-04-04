import React from 'react'
import AV from 'leancloud-storage'
import Chart from '../components/Chart'


export default class Home extends React.PureComponent {
  constructor(){
    super();
    this.state = {
      chartData:{}
    }
  }
  render () {
    const user = AV.User.current()
    return (
      <div className="container">
        <h1> Welcome !!! </h1>
        <Chart  chartData={this.state.chartData} legendPosition="bottom"></Chart>
        {user && `Signed in as ${user.getUsername()}`}
        {user && <button onClick={() => AV.User.logOut().then(() => this.forceUpdate())}>Sign out</button>}
      </div>
    )
  }
}
