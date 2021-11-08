import React, { Component } from "react";
import Header from "../components/Header";
import Landing from "../components/Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "../components/surveys/SurveyNew";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux"; // allows us to call action creators
import * as actions from "../actions/index"; // get all actions from action creators
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/surveys/new" component={SurveyNew} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route exact path="/" component={Landing} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
// 1st arg is map state to props
// 2nd arg is passing all the actions to App as props
