import React from 'react'
import AV from 'leancloud-storage'

export default class Home extends React.PureComponent {
  render () {
    const user = AV.User.current()
    return (
      <div className='container'>
        <h1> Welcome !!! </h1>
        {user && !user.isAnonymous() && `Signed in as ${user.getUsername()}`}
        {user && !user.isAnonymous() && <button onClick={() => AV.User.loginAnonymously().then(() => this.forceUpdate())}>Sign out</button>}
      </div>
    )
  }
}
