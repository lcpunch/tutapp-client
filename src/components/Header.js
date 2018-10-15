import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link className="mr-sm-4" to="/programs">Programmes</Link>
          <Link className="mr-sm-4" to="/tutorats">Mes tutorats</Link>
          <Link className="mr-sm-2" to="/signout">Sign Out</Link>
        </div>
      );
    } else {
      return(
        <div>
          <Link className="nav-item" to="/signin">Sign In</Link>
        </div>
      );
    }
  }

  render() {
    return(
      <div>
        <nav className="navbar navbar-light bg-light">
          <Link to="/">
            <span className="navbar-brand">
              <img src="https://www.svgrepo.com/show/6289/book-with-apple.svg" width="30" height="30" className="d-inline-block align-top" alt=""/>
              Tutapp
            </span>
          </Link>
          {this.renderLinks()}
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
