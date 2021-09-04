import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

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
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <br />
                    <Form.Group className="mb-3" controlId="form_basic_username">
                        <Form.Control {...register("username")} type="username" placeholder="Username" />
                        {errors.username && errors.username.type === "required" && <span>This is required</span>}
                    </Form.Group>
                    <br />
                    <Form.Group className="mb-3" controlId="form_basic_password_sign_up">
                        <Form.Control {...register("password")} type="password" placeholder="Password" />
                        {errors.password && errors.password.type === "required" && <span>This is required</span>}
                    </Form.Group>
                    <br />
                    <Form.Group className="mb-3" controlId="form_basic_password_confirmation">
                        <Form.Control {...register("password_confirmation")} type="password_confirmation" placeholder="Confirm Password" />
                        {errors.password_confirmation && errors.password_confirmation.type === "required" && <span>This is required</span>}
                    </Form.Group>
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">Sign Up</Button>
                <br /><br />
                <Link to="/login">SignIn</Link>
            </Form>
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