import React from 'react'
import AV from 'leancloud-storage'
import Footer from './Footer'
import BarChart from '../components/BarChart'
import Carosel from '../components/Carousel'

export default class Home extends React.PureComponent {
  render () {
    return (
      <div>
        <div className='container d-flex flex-column align-items-center home'>
          <br />
          <br />
          <h1> Welcome to SmartCents </h1>
          <h4> Track your monthly expense </h4>
          <br />
          {!AV.User.current() || AV.User.current().isAnonymous() ? (
            <Carosel />
          ) : (
            <BarChart />
          )}
        </div>
        <Footer />
      </div>
    )
  }
}
