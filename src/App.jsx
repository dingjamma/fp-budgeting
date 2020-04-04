import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AV from 'leancloud-storage'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import Footer from './pages/Footer'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import Verify from './pages/Verify'

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
         <Route exact path="/" component={Home} />
         <Route path="/logIn" component={LogIn} />
         <Route path="/verify" component={Verify} />
       </Switch>
       {/* <Footer/> */}
      </div>
  </Router>
);
  }
}
