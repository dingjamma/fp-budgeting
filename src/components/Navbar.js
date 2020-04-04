import React from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import logIn from '../pages/LogIn'
import Home from '../pages/Home';
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="container">
            <a className="nav-link text-white text-uppercase ml-5" href="#"> <i class="fas fa-file-invoice-dollar fa-3x"></i> <span class="sr-only">(current)</span></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className=" menu collapse navbar-collapse " id="navbarNav">
                  <ul className="navbar-nav ml-auto">
                    
                   <Link to="/">
                      <li className="nav-item active">
                         <a className="nav-link text-white text-uppercase ml-5" href="#">  <i class="fas fa-home"></i> <span class="sr-only">(current)</span></a>
                      </li>
                    </Link>

                    <Link to="/logIn">
                    <li className="nav-item active">
                         <a className="nav-link text-white text-uppercase ml-5" href="#"> Login/Registration <span class="sr-only">(current)</span></a>
                      </li>
                    </Link>

                    <Link to="/">
                    <li className="nav-item active">
                         <a className="nav-link text-white text-uppercase ml-5" href="#"> Budget </a>
                      </li>
                    </Link>

                  </ul>
          </div>
          
           <div class="dropdown">
                      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Expense Tracker
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Add Category</a>
                        <a class="dropdown-item" href="#">Current Status</a>
                      </div>
                  </div>
          </div>
        </nav>
    );
}

export default Navbar;