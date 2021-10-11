import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function SignUp({ handleLogin }) {
    
    const { register, handleSubmit, formState: {errors} } = useForm();

    const [error, setError] = useState('')
    const [currentUser, setCurrentUser] = useState('')
    const history = useHistory()

    const onSubmit = (infoRegister) => {
    
        //<--- POST USER REQUEST START --->
        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(infoRegister),
            withCredentials: true
        }
        fetch("/users", config)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.status === 'created') {
                    handleLogin(data)
                    redirect()
                } else {
                    setError(data.errors)
                }
            })
            .catch(err => console.log(err))
            //<--- POST USER REQUEST END --->
    }

    const redirect = () => {
        history.push('/')
    }

    const handleErrors = () => {
        return (
          <div>
            <ul>
            {error.map(err => {
            return <p key={err} color='#ff7f50'>{err}</p>
              })}
            </ul>
          </div>
        )
    }
    
    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="mb-3" controlId="form_basic_username">
                        <input type="username" placeholder="Username" {...register("username", {required: true, message: 'Required'})}/>
                    </div>
                    <br />
                    <div className="mb-3" controlId="form_basic_password_sign_up">
                        <input type="password" placeholder="Password" {...register("password", {required: true})}/>
                    </div>
                    <br />
                    <div className="mb-3" controlId="form_basic_password_confirmation">
                        <input type="password" placeholder="Confirm Password" {...register("password_confirmation", {required: true})}/>
                    </div>
                </div>
                <br />
                <button variant="primary" type="submit">Sign Up</button>
                <br /><br />
                <Link to="/login">SignIn</Link>
            </form>
            <div>
                {error ? handleErrors() : null}
            </div>
        </ >
    );
}