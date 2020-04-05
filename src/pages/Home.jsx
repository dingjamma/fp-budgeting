import React from 'react'
import AV from 'leancloud-storage'

export default class Home extends React.PureComponent {
  render () {
    const user = AV.User.current()
    return (
      <div className='container'>
        <h1> Welcome !!! </h1>
        {user && `Signed in as ${user.getUsername()}`}
        {user && <button onClick={() => AV.User.logOut().then(() => this.forceUpdate())}>Sign out</button>}
      </div>
    )
  }
}
