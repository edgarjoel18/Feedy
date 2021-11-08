import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import formFields from "./formFields";
import * as actions from "../../actions/index";
import { withRouter } from "react-router-dom";

const SurveyReview = ({ onCancel, formValues, submitForm, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>SurveyReview</h5>
      {reviewFields}
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
      <button
        className="green btn-flat right"
        onClick={() => submitForm(formValues, history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values,
  }; // this object is the props that will be added to the SurveyReview component
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));
