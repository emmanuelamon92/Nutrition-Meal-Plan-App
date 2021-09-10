import React from "react";
import { Link, Route, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function SignUp() {
    
    const { register, handleSubmit, formState: {errors} } = useForm();

    const history = useHistory()

    // const onSubmit = (infoRegister, e) => {
    //     e.preventDefault()

    //     //<--- POST USER REQUEST START --->
    //     let config = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accepts': 'application/json'
    //         },
    //         body: JSON.stringify(infoRegister),
    //         withCredentials: true
    //     }
    //     console.log(infoRegister.password)
    //     fetch("/users", config)
    //         .then(res => res.json())
    //         .then(data => {
    //             //<-- POST TO SESSIONS START -->
    //             let config = {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Accepts': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     username: infoRegister.username,
    //                     password: infoRegister.password
    //                 })
    //             }
    //             fetch("/login", config)
    //                 .then(res => res.json())
    //                 .then(data => {console.log(data, 'Log in Successful')})
    //                 .catch(err => {console.log(err, "Not able to log in!")})
    //             history.push('/')
    //             //<-- POST TO SESSIONS START -->
    //         })
    //         .catch(err => console.log(err))
    //         //<--- POST USER REQUEST END --->
    // }

    const onSubmit = (infoRegister, e) => {
        e.preventDefault()

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
            .then(data => console.log(data))
            .catch(err => console.log(err))
        history.push('/')
            //<--- POST USER REQUEST END --->
    }

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="mb-3" controlId="form_basic_username">
                        <input type="username" placeholder="Username" {...register("username", {required: true, message: 'Required'})}/>
                        {/* {errors.username && errors.username.type === "required" && <span>This is required</span>} */}
                    </div>
                    <br />
                    <div className="mb-3" controlId="form_basic_password_sign_up">
                        <input type="password" placeholder="Password" {...register("password", {required: true})}/>
                        {/* {errors.password && errors.password.type === "required" && <span>This is required</span>} */}
                    </div>
                    <br />
                    <div className="mb-3" controlId="form_basic_password_confirmation">
                        <input type="password_confirmation" placeholder="Confirm Password" {...register("password_confirmation", {required: true})}/>
                        {/* {errors.password_confirmation && errors.password_confirmation.type === "required" && <span>This is required</span>} */}
                    </div>
                </div>
                <br />
                <button variant="primary" type="submit">Sign Up</button>
                <br /><br />
                <Link to="/login">SignIn</Link>
            </form>
        </ >
    );
}

{/* <form onSubmit={onSubmit}>
    <label>Email</label>
    <input {...register("email")} placeholder="Email" />
    <label>Password</label>
    <input {...register("password")} placeholder="Password" />
    <input type="submit" />
</form> */}