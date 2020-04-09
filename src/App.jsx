import React from 'react'
import './App.css'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import AV from 'leancloud-storage'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import 'bootstrap/dist/css/bootstrap.min.css'
import Verify from './pages/Verify'
import Navbar from './components/Navbar'
import Categories from './pages/Categories'
import Expense from './pages/Expense'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import About from './pages/About'

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
      <Router hashType='hashbang'>
        <div>
          {(!AV.User.current() || AV.User.current().isAnonymous()) && (
            <div id='nm-acc-warn' className='text-center'>
                  Your data may be deleted, please{' '}
              <Link to='/logIn'>login or create an account</Link> in order to
                  save your data.
            </div>
          )}
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={LogIn} />
            <Route path='/verify' component={Verify} />
            <Route path='/categories' component={Categories} />
            <Route path='/expenses' component={Expense} />
            <Route path='/profile' component={Profile} />
            <Route path='/about' component={About} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}
