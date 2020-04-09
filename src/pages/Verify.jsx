import React from 'react'
import AV from 'leancloud-storage'
import { Redirect } from 'react-router-dom'

export default class Verify extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      completed: false,
      selected: false,
      action: ''
    }
  }

  render () {
    return (
      this.state.selected
        ? (
          <div>
            <label htmlFor='email'>Email</label>
            <input id='email' type='email' onChange={event => this.setState({ email: event.target.value })} value={this.state.email} />
            <button onClick={async () => {
              try {
                switch (this.state.action) {
                  case 'verify':
                    await AV.User.requestEmailVerify(this.state.email)
                    break
                  case 'reset':
                    await AV.User.requestPasswordReset(this.state.email)
                    break
                  default:
                    throw new RangeError('Invalid action')
                }
                window.alert(`Verification email sent, please check your inbox for instructions for ${this.state.action}.`)
                this.setState({
                  completed: true
                })
              } catch (e) {
                window.alert(e)
                console.error(e)
              }
            }}
            >{this.state.action}
            </button>
            {this.state.completed && <Redirect to='/login' />}
          </div>
        )
        : (
          <div className='container'>
            <div className='d-flex flex-column align-items-center justify-content-center '>
              <br />
              <h1>What do you need help with?</h1>
              <br />
              <button onClick={() => this.setState({ selected: true, action: 'verify' })}>I havn't received the verification email</button>
              <br />
              <button onClick={() => this.setState({ selected: true, action: 'reset' })}>I forgot my password</button>
            </div>
          </div>
        )
    )
  }
}
