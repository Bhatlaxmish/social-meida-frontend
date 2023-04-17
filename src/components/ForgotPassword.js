import React,{useState} from 'react';
import Input from './Input';
import { useForm } from './Formhook';
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from './validators';

export default function ForgotPassword() {

    const [display,setdisplay]=useState(false);
const navigate=useNavigate();
    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const SubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
        // console.log(formState.inputs.username.value);
        fetch("http://localhost:8080/users/forgotpassword", {
            method: "POST",
            body: JSON.stringify({
                email: formState.inputs.email.value,
            }),
            headers: {
                'Content-Type': "application/json"

            }
        }).then(res => res.json())
            .then(
                () => {
                   
                    alert("email sent successfully");
                   setdisplay(true);

                })
            .catch(err => alert("enter valid email"));
  
    };
  return (
    <div>
          <form className={classes.login} onSubmit={SubmitHandler}>
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
              <button className={classes.loginbutton}>send</button>
              {
                display&&<div className={classes.checkemail}>
                    check your email to reset password
                </div>
              }
      </form>
    </div>
  )
}
