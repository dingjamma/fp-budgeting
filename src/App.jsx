import React from 'react'
import './App.css'
import { HashRouter, Switch, Route, Link } from 'react-router-dom'
import Home from './pages/Home'

export default class App extends React.Component {
  render () {
    return (
      <HashRouter>
        <nav>
          <Link to='/'>Home</Link>
        </nav>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
        </Switch>
      </HashRouter>
    )
  }
}
