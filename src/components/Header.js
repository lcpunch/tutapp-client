import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem } from 'reactstrap';

class Header extends Component {
  render() {
    return(
      <div>
        <div>
          <Link to="/">
            <span className="navbar-brand">
              <img src="https://brew.sh/assets/img/homebrew-256x256.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
              BeerIsGood
            </span>
          </Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/signout">Sign Out</Link>
          <Link to="/courses">Courses</Link>
        </div>
      </div>
    );
  }
}

export default Header;
