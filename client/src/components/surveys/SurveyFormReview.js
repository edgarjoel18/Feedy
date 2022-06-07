import React from "react";
import { connect } from "react-redux";
import FIELDS from "./formFields";
import _ from "lodash";
const SurveyFormReview = ({ onCancel, formValues }) => {
  const reviewFields = _.map(FIELDS, (field) => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>{formValues[field.name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h2>SurveyFormReview</h2>
      {reviewFields}
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    formValues: state.form.surveyForm.values,
  };
};

export default connect(mapStateToProps)(SurveyFormReview);
