import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);
  return <span className={`alert alert-${type}`}>{msg}</span>;
};

export default Alert;
