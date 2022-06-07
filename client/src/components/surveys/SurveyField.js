import React from "react";

const SurveyField = (props) => {
  const showError = () => {
    if (props.meta.touched === true) {
      return props.meta.error;
    }
    return "";
  };
  return (
    <div>
      <label>{props.label}</label>
      <input {...props.input} />
      <p style={{ color: "red", marginTop: "0px" }}>{showError()}</p>
    </div>
  );
};

export default SurveyField;
