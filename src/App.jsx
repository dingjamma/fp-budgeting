import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AV from 'leancloud-storage'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import Verify from './pages/Verify'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    window.AV = AV
    AV.init(require('./av-config.json'))
    !AV.User.current() && AV.User.loginAnonymously().then(() => this.forceUpdate())
  }

  render () {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/logIn' component={LogIn} />
            <Route path='/verify' component={Verify} />
          </Switch>
          {/* <Footer/> */}
        </div>
      </Router>
    )
  }
}
