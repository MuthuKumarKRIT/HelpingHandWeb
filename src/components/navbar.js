import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class NavbarL extends Component {
    render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/homel" className="navbar-brand">Helping Hand</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/donate" className="nav-link">Donate</Link>
          </li>
          <li className="navbar-item">
          <Link to="/logout" className="nav-link">Logout</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}