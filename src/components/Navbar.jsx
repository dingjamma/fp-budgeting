import React from 'react'
import 'react-dropdown/style.css'
import { Link } from 'react-router-dom'
import AV from 'leancloud-storage'

function Navbar () {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container'>
        <Link className='nav-link text-white text-uppercase ml-5' to='/'>
          {' '}
          {/* <i className='fas fa-file-invoice-dollar fa-3x' />{' '} */}
          <h1 className='siteName'>SmartCents</h1>
          <span className='sr-only'>(current)</span>
        </Link>

        <button
          className='navbar-toggler text-white m-auto'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item active m-auto'>
              <Link to='/' className='nav-link text-white text-uppercase ml-5'>
                {' '}
                <i className='fas fa-home' />{' '}
                <span className='sr-only'>(current)</span>
              </Link>
            </li>
            {!AV.User.current() || AV.User.current().isAnonymous() ? (
              <li className='nav-item active m-auto'>
                <Link
                  to='/login'
                  className='nav-link text-white text-uppercase ml-5'
                >
                  Login/Registration
                </Link>
              </li>
            ) : (
              <li className='nav-item active text-white m-auto'>
                <Link to='/profile' className='text-white'>{AV.User.current().getUsername()}</Link>
                <button
                  className='btn btn-secondary'
                  onClick={() =>
                    AV.User.loginAnonymously().then(() =>
                      window.location.reload())}
                >
                  Sign out
                </button>
              </li>
            )}

            <li className='nav-item dropdown active m-auto'>
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 Expense Tracker
                </a>

                <div
                  className='dropdown-menu'
                  aria-labelledby='dropdownMenuButton'
                >
                  <Link to='/about'>
                    <span className='dropdown-item'>About Us</span>
                  </Link>
                  <Link to='/categories'>
                    <span className='dropdown-item'>Manage Categories</span>
                  </Link>
                  <Link to='/expenses'>
                    <span className='dropdown-item'>Manage Expense</span>
                  </Link>
                </div>
              {/* </div> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar