import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Log in with google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="2">Credits: {this.props.auth.credits}</li>,
          <li key="3">
            <a href="/api/logout">Log out</a>
          </li>,
        ];
    }
  }
  homeRoute() {
    if (this.props.auth) {
      return "/surveys";
    }
    return "/";
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.homeRoute()}
            className="left brand-logo"
            style={{ marginLeft: 10 }}
          >
            Feedy
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Header);
