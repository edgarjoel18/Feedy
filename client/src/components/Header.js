import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

// connect this header to the redux store
class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return [
          <li key={1}>
            <Payments />
          </li>,
          <li key={3} style={{ margin: "0 10px" }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key={2}>
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >
            Feedy
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

// create the map state to props
// this is the state from the redux store
function mapStateToProps(state) {
  return { auth: state.auth }; // this will be passed to the Header component as props
}
export default connect(mapStateToProps)(Header);
