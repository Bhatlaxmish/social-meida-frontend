// import React from 'react'
import React, { useContext } from 'react';
// import Navbar from "./Navbar";
import Input from './Input'
import { useForm } from './Formhook';
import classes from "./Login.module.css";
import { Authcontext } from "./Authcontext";
// import {Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";



import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from './validators';

export default function Signup() {
    const auth = useContext(Authcontext);
    const navigate = useNavigate();


    // useEffect(() => {
    // <Navbar/>
    // }, [auth.isLoggedIn]);

    const [formState, inputHandler, setFormData] = useForm(
        {
            username: {
                value: ' ',
                isValid: false
            },
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            },
            passwordConfirm: {
                value: '',
                isValid: false
            }
        },
        false
    );
    const SubmitHandler = event => {
        event.preventDefault();
        // console.log(formState.inputs.username.value);
        fetch("http://localhost:8080/users/signup", {
            method: "POST",
            body: JSON.stringify({

                name: formState.inputs.username.value,
                email: formState.inputs.email.value,
                password: formState.inputs.password.value,
                passwordConfirm: formState.inputs.passwordConfirm.value

            }),
            headers: {
                'Content-Type': "application/json"

            },
            credentials: 'include'
        }).then(res => res.json())
            .then(
                () => {
                    auth.login();
                    alert("succesfully signed in");
                    // console.log(auth.isloggedin);

                    navigate("/");

                })
            .catch(err => alert("enter valid credentials "));
        // console.log(formState.inputs);
    };
    /* 
    name: formState.inputs.username.value,
            email:formState.inputs.email.value,
            password: formState.inputs.password.value,
            passwordConfirm:formState.inputs.passwordConfirm.value */

    return (
        <div className={classes.logingo}>
            <form className={classes.login} onSubmit={SubmitHandler}>
                <div className={classes.labellogin}>
                    Sign up
                </div>
                <Input
                    id="username"
                    element="input"
                    type="text"
                    label="name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid username."
                    onInput={inputHandler}
                    initialValue={" "}
                    initialValid={formState.inputs.email.isValid}
                />

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
                    errorText="Please enter a password."
                    onInput={inputHandler}
                    initialValue={""}
                    initialValid={formState.inputs.password.isValid}
                />
                <Input
                    id="passwordConfirm"
                    element="input"
                    label=" confirm Password"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter password."
                    onInput={inputHandler}
                    initialValue={""}
                    initialValid={formState.inputs.passwordConfirm.isValid}
                />

                <button className={classes.loginbutton}>Sign up</button>



            </form>
        </div>
    )
}
