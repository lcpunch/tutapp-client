import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/programs">Programs</Link>
          <Link to="/signout">Sign Out</Link>
        </div>
      );
    } else {
      return(
        <div>
          <Link to="/signin">Sign In</Link>
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
              <img src="https://brew.sh/assets/img/homebrew-256x256.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
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
