import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const reducer = (state, action) => {
  if (action.type === "PASSWORD_INPUT_CHANGE") {
    return {
      enteredPassword: action.value,
      passwordIsValid: action.value.trim().length > 6,
    };
  }

  if (action.type === "PASSWORD_VALIDATE_CHANGE") {
    return {
      enteredPassword: state.enteredPassword,
      passwordIsValid: action.value,
    };
  }
};

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollegeName, setEnteredCollegeName] = useState("");
  const [collegeNameisValid, setCollegeNameIsvalid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    enteredPassword: "",
    passwordIsValid: null,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        enteredEmail.includes("@") &&
          state.enteredPassword.trim().length > 6 &&
          enteredCollegeName.trim().length > 4
      );
      console.log("Running...");
    }, 1000);

    return () => {
      console.log("cleanup");
      clearTimeout(identifier);
    };
  }, [enteredEmail, state.enteredPassword, enteredCollegeName]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    dispatch({ type: "PASSWORD_INPUT_CHANGE", value: event.target.value });
    //setEnteredPassword(event.target.value);
  };

  const collegeChangeHandler = (event) => {
    setEnteredCollegeName(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatch({
      type: "PASSWORD_VALIDATE_CHANGE",
      value: state.enteredPassword.trim().length > 6,
    });
  };

  const validateCollegeHandler = () => {
    setCollegeNameIsvalid(enteredCollegeName.trim().length > 4);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, state.enteredPassword, enteredCollegeName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            state.passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={state.enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeNameisValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="collegeName">College Name</label>
          <input
            type="text"
            id="email"
            value={enteredCollegeName}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
            required
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
