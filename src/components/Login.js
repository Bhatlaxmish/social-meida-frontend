// import React from 'react'
import React, { useEffect, useState, useContext } from 'react';
import Input from './Input'
import { useForm } from './Formhook';
import classes from "./Login.module.css";
import { useNavigate, NavLink } from "react-router-dom";
import { Authcontext } from "./Authcontext";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from './validators';

export default function Login() {
  const auth = useContext(Authcontext);
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );
  const SubmitHandler = event => {
    event.preventDefault();
    // console.log(formState.inputs);
    // console.log(formState.inputs.username.value);
    fetch("http://localhost:8080/users/login", {
      method: "POST",
      body: JSON.stringify({


        email: formState.inputs.email.value,
        password: formState.inputs.password.value,


      }),
      headers: {
        'authorization': `Bearer ${localStorage.getItem("token")}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      
     
    }).then(res => res.json())
      .then(
        (data) => {
          auth.login();
          alert("succesfully signed in");
auth.myid(data.data.user._id);
localStorage.setItem("token",data.token);

          navigate("/");

        })
      .catch(err => alert("enter valid credentials"));

  };

  return (
    <div className={classes.logingo}>
      <form className={classes.login} onSubmit={SubmitHandler}>
        <div className={classes.labellogin}>
          Login
        </div>
        <Input
          id="email"
          element="input"
          type="text"
          label="Email"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid email."
          onInput={inputHandler}
          initialValue={" "}
          initialValid={formState.inputs.email.isValid}
        />

        <Input
          id="password"
          element="input"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid email."
          onInput={inputHandler}
          initialValue={""}
          initialValid={formState.inputs.password.isValid}
        />
        <NavLink to="/forgotpassword">

          <div className={classes.forgotpassword}>
            forgot password?..
          </div>
        </NavLink>

        <button className={classes.loginbutton}>Login</button>
        <NavLink to="/signup">

          <div className={classes.donthaveacount}>
            dont have an account..?Sign up here
          </div>
        </NavLink>


        <div>
          <NavLink to="/signup">

            <button className={`${classes.loginbutton} ${classes.move}`}>Sign up</button>
          </NavLink>

        </div>
      </form>
    </div>
  )
}
