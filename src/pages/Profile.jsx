import React from 'react'
import AV from 'leancloud-storage'

export default class Profile extends React.Component {
  constructor (props) {
    super(props)
    const user = AV.User.current()
    this.state = {
      user,
      username: user.getUsername(),
      email: user.getEmail(),
      currentPassword: '',
      newPassword: '',
      pending: false
    }
  }

  handleSave () {
    this.setState({ pending: true }, async () => {
      try {
        const user = this.state.user
        await user.fetch()
        user.setUsername(this.state.username)
        user.setEmail(this.state.email)
        await user.save()
        window.alert('Profile saved')
        window.location.reload()
      } catch (e) { window.alert(e) } finally { this.setState({ pending: false }) }
    })
  }

  handlePasswordReset () {
    this.setState({ pending: true }, async () => {
      try {
        const user = this.state.user
        await AV.User.requestPasswordReset(user.getEmail())
        window.alert('Verification email sent, please check your inbox for instructions for reset.')
      } catch (e) { window.alert(e) } finally { this.setState({ pending: false }) }
    })
  }

  render () {
    return (
      <div>
        <div className='container'>
          <div className='d-flex flex-column align-items-center w-75 size'>
            <br />
            <h1>User Profile</h1>
            <br />
            {/* <h2>Basic Information</h2> */}
            <form className='profile'>
              <div className='form-group'>
                <label htmlFor='username' className='font-weight-bold'>Name : </label>

                <input id='username' className='form-control' value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
              </div>

              <div className='form-group'>
                <label htmlFor='email' className='font-weight-bold'>Email : </label>

                <input id='email' className='form-control' value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
              </div>

              <div className='form-group'>
                <button className='btn btn-success' onClick={this.handlePasswordReset.bind(this)}>Reset Password</button>
              </div>
              <div className='form-group'>
                <button className='btn btn-primary' onClick={this.handleSave.bind(this)}>Save</button>
              </div>
            </form>

          </div>
        </div>

      </div>
    )
  }
}
