import React from 'react'
import 'react-dropdown/style.css'
import { Link } from 'react-router-dom'

/*
 *
 * DO NOT USE, FOR REFERENCE ONLY
 * WILL BE DELETED IN FUTURE COMMITS
 * (In case missed something during merge)
 *
 */

export default function Navbar () {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-dark'>
      <div className='container'>
        <a className='nav-link text-white text-uppercase ml-5' href='/'>
          {' '}
          <i className='fas fa-file-invoice-dollar fa-3x' />{' '}
          <span className='sr-only'>(current)</span>
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div className=' menu collapse navbar-collapse ' id='navbarNav'>
          <ul className='navbar-nav ml-auto'>
            <Link to='/'>
              <li className='nav-item active'>
                <span className='nav-link text-white text-uppercase ml-5'>
                  <i className='fas fa-home' />
                  <span className='sr-only'>(current)</span>
                </span>
              </li>
            </Link>

            <Link to='/logIn'>
              <li className='nav-item active'>
                <span className='nav-link text-white text-uppercase ml-5'>
                  Login/Registration
                </span>
              </li>
            </Link>

            <Link to='/'>
              <li className='nav-item active'>
                <span className='nav-link text-white text-uppercase ml-5'>
                  {' '}
                  Budget{' '}
                </span>
              </li>
            </Link>
            <li className='nav-item active'>
              <div className='dropdown'>
                <button
                  className='btn btn-secondary dropdown-toggle'
                  type='button'
                  id='dropdownMenuButton'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  Expense Tracker
                </button>
                <div
                  className='dropdown-menu'
                  aria-labelledby='dropdownMenuButton'
                >
                  <Link to='/categories'>
                    <span className='dropdown-item'>Manage Categories</span>
                  </Link>
                  <a className='dropdown-item' href='/'>
                    Current Status
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
