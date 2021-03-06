import React from 'react'
import AV from 'leancloud-storage'
import { Redirect, Link } from 'react-router-dom'
import { Label } from 'reactstrap'

export default class LogIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      createAccount: false,
      completed: false
    }
    if (AV.User.current() && !AV.User.current().isAnonymous()) {
      this.state.completed = true
    }
  }

  render () {
    return (
      <div className='container size'>
        <div className='login-form d-flex flex-column'>
          <h1 className='text-center'> Registration / Login</h1>
          <Label htmlFor='btn'>
            <button
              id='btn'
              className='btn-lg btn-dark btn-block'
              onClick={() =>
                this.setState({ createAccount: !this.state.createAccount })}
            >
              {this.state.createAccount
                ? 'Log in to an existing account'
                : 'Create a new account'}
            </button>
          </Label>
          <br />
          <Label htmlFor='email'>
            <input
              id='email'
              type='email'
              placeholder='Enter Your email'
              onChange={event => this.setState({ email: event.target.value })}
              value={this.state.email}
            />
          </Label>
          <br />
          <Label htmlFor='password'>
            <input
              id='password'
              type='password'
              placeholder='Enter Your password'
              onChange={event =>
                this.setState({ password: event.target.value })}
              value={this.state.password}
            />
          </Label>
          <br />
          <Label className='btn2'>
            <button
              id='btn2'
              className='btn-lg btn-dark btn-block'
              onClick={async () => {
                try {
                  if (this.state.createAccount) {
                    let user = AV.User.current()
                    if (!user || !user.isAnonymous()) {
                      user = new AV.User()
                    }
                    user.setUsername(this.state.email)
                    user.setEmail(this.state.email)
                    user.setPassword(this.state.password)
                    await user.signUp()
                  } else {
                    await AV.User.logIn(this.state.email, this.state.password)
                  }
                  window.location.reload()
                } catch (e) {
                  window.alert(e)
                  console.error(e)
                }
              }}
            >
              {this.state.createAccount ? 'Register' : 'Log in'}
            </button>
          </Label>
          {/* <div className='text-center pt-3'>
            Or Continue with your social media account
          </div>
          <FacebookLoginButton /> */}
          <br />
          <Link to='/verify'>Problems logging in?</Link>
          {this.state.completed && <Redirect to='/' />}
        </div>
      </div>
    )
  }
}
