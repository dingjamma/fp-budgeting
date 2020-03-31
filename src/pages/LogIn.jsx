import React from 'react'
import AV from 'leancloud-storage'
import { Redirect } from 'react-router-dom'

export default class LogIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      createAccount: false,
      completed: false
    }
  }

  render () {
    return (
      <div>
        <button onClick={() => this.setState({ createAccount: !this.state.createAccount })}>{this.state.createAccount ? 'Log in to an existing account' : 'Create a new account'}</button>
        <label htmlFor='email'>Email</label>
        <input id='email' type='email' onChange={event => this.setState({ email: event.target.value })} value={this.state.email} />
        <label htmlFor='password'>Password</label>
        <input id='password' type='password' onChange={event => this.setState({ password: event.target.value })} value={this.state.password} />
        <button onClick={async () => {
          try {
            if (this.state.createAccount) {
              const user = new AV.User()
              user.setUsername(this.state.email)
              user.setEmail(this.state.email)
              user.setPassword(this.state.password)
              await user.signUp()
            } else {
              await AV.User.logIn(this.state.email, this.state.password)
            }
            this.setState({
              completed: true
            })
          } catch (e) {
            window.alert(e)
            console.error(e)
          }
        }}
        >{this.state.createAccount ? 'Register' : 'Log in'}
        </button>
        {this.state.completed && <Redirect to='/' />}
      </div>
    )
  }
}
