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
        <Navbar color="light" light expand="md">
          <Link to="/">
            <span className="navbar-brand">
              <img src="https://brew.sh/assets/img/homebrew-256x256.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
              BeerIsGood
            </span>
          </Link>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/signin">Sign In</Link>
            </NavItem>
            <NavItem>
              <Link to="/signout">Sign Out</Link>
            </NavItem>
            <NavItem>
              <Link to="/courses">Courses</Link>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Header;
