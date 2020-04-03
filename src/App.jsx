import React from 'react'
import './App.css'
import { HashRouter, Switch, Route, Link } from 'react-router-dom'
import AV from 'leancloud-storage'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import Verify from './pages/Verify'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    AV.init(require('./av-config.json'))
  }

  render () {
    return (
      <HashRouter hashType='hashbang'>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/login'>Log in</Link>
        </nav>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/login' exact>
            <LogIn />
          </Route>
          <Route path='/verify' exact>
            <Verify />
          </Route>
        </Switch>
      </HashRouter>
    )
  }
}
