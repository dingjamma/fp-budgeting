import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AV from 'leancloud-storage'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import 'bootstrap/dist/css/bootstrap.min.css'
import Verify from './pages/Verify'
import Navbar from './components/Navbar'
import Categories from './pages/Categories'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    AV.init(require('./av-config.json'))
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
            <Route path='/categories' component={Categories} />
          </Switch>
          {/* <Footer/> */}
        </div>
      </Router>
    )
  }
}
