import React from 'react'
import 'react-dropdown/style.css'
import { Link } from 'react-router-dom'
import AV from 'leancloud-storage'

function Navbar () {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-dark'>
      <div className='container'>
        <a className='nav-link text-white text-uppercase ml-5' href='#'> <i className='fas fa-file-invoice-dollar fa-3x' /> <span className='sr-only'>(current)</span></a>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>

        <div className=' menu collapse navbar-collapse ' id='navbarNav'>
          <ul className='navbar-nav ml-auto'>

            <li className='nav-item active'>
              <Link to='/' className='nav-link text-white text-uppercase ml-5'>  <i className='fas fa-home' /> <span className='sr-only'>(current)</span></Link>
            </li>
            {!AV.User.current() || AV.User.current().isAnonymous()
              ? (

                <li className='nav-item active'>
                  <Link to='/login' className='nav-link text-white text-uppercase ml-5'>Login/Registration</Link>
                </li>
              )
              : (
                <li className='nav-item active text-white'>
                  {AV.User.current().getUsername()}
                  <button className='btn btn-secondary' onClick={() => AV.User.loginAnonymously().then(() => window.location.reload())}>Sign out</button>
                </li>
              )}

            <li className='nav-item active'>
              <Link to='/' className='nav-link text-white text-uppercase ml-5'> Budget </Link>
            </li>
            <li className='nav-item active'>
              <div className='dropdown'>
                <button className='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                        Expense Tracker
                </button>
                <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                  <a className='dropdown-item' href='#'>Add Category</a>
                  <a className='dropdown-item' href='#'>Current Status</a>
                </div>
              </div>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
