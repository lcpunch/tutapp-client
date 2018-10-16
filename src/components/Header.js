import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <ul className="navbar-nav">
          <li className="nav-item"><Link className="nav-link" to="/programs">Programmes</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/tutorats">Mes tutorats</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/calendars">Mes horaires</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/signout">Sign Out</Link></li>
        </ul>

      );
    } else {
      return(
        <ul className="navbar-nav">
          <li className="nav-item"><Link className="nav-item" to="/signin">Sign In</Link></li>
        </ul>
      );
    }
  }

  render() {
    return(
      <div>
        {/* <nav className="navbar navbar-light bg-light">
          <Link to="/">
            <span className="navbar-brand">
              <img src="https://www.svgrepo.com/show/6289/book-with-apple.svg" width="30" height="30" className="d-inline-block align-top" alt=""/>
              Tutapp
            </span>
          </Link>
          {this.renderLinks()}
        </nav> */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            <img src="https://www.svgrepo.com/show/6289/book-with-apple.svg" width="30" height="30" className="d-inline-block align-top" alt=""/>
            Tutapp
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
          {this.renderLinks()}
          </div>
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
