import React from 'react'
import './App.css'
import { HashRouter, Switch, Route, Link } from 'react-router-dom'
import AV from 'leancloud-storage'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import Todo from './pages/Todo'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    AV.init(require('./av-config.json'))
  }

  render () {
    return (
      <Navbar/>
      // <HashRouter hashType='hashbang'>
      //   <nav>
      //     <Link to='/'>Home</Link>
      //     <Link to='/login'>Log in</Link>
      //     <Link to='/todo'>Todo</Link>
      //   <Switch>
      //     <Route path='/' exact>
      //       <Home />
      //     </Route>
      //     <Route path='/login' exact>
      //       <LogIn />
      //     </Route>

      //     <Route path='/todo' exact>
      //       <Todo />
      //     </Route>
      //   </Switch>
      // </HashRouter>
    )
  }
}
