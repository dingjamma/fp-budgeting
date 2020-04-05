import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
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
    if (!AV.User.current()) {
      AV.User.loginAnonymously()
    } else {
      AV.User.current().fetch()
    }
  }

  render () {
    return (
      <Router>
        <div>
          {(!AV.User.current() || AV.User.current().isAnonymous()) && <div id='nm-acc-warn'>Your data may be deleted, please <Link to='/logIn'>login or create an account</Link> in order to save your data.</div>}
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
