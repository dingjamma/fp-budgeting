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
        <h1>User Profile</h1>
        <h2>Basic Information</h2>
        <label htmlFor='username'>Name</label>
        <input id='username' value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
        <label htmlFor='email'>Email</label>
        <input id='email' value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
        <button onClick={this.handlePasswordReset.bind(this)}>Reset Password</button>
        <button onClick={this.handleSave.bind(this)}>Save</button>
      </div>
    )
  }
}
