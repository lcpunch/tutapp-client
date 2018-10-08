import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

class Header extends Component {
  render() {
    return(
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>
            <Link to="/">
              <span class="navbar-brand">
                <img src="https://brew.sh/assets/img/homebrew-256x256.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
                BeerIsGood
              </span>
            </Link>
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink><Link to="/signin">Sign In</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to="/signout">Sign Out</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to="/courses">Courses</Link></NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Header;
