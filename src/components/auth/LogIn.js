import React, {useState} from "react";
import { Link, useContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router"

function LogIn() {

    const [error, setError] = useState()
    const [userInfo, setUserInfo] = useState()
    const { register, handleSubmit, formState: {errors} } = useForm();

    const history = useHistory()

    const onSubmit = (infoRegister) => {
        //<--- POST REQUEST START --->
        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(infoRegister)
        }
        fetch("/login", config)
            .then(res => res.json())
            .then(data => {
                setUserInfo(data)
                console.log(data, 'Log in Successful')
            })
            .catch(err => {
                setError(err)
                console.log(err, "Not able to log in!")
            })
        history.push('/')
    }


    //<--- POST REQUEST END --->

    return (
        <>
            <h1>Sign In</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Group className="mb-3" controlId="form_basic_username">
                        <Form.Control {...register("username")} type="username" placeholder="Username" />
                        {errors.username && errors.username.type === "required" && <span>This is required</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="form_basic_password_sign_in">
                        <br />
                        <Form.Control {...register("password")} type="password" placeholder="Password" />
                        {errors.password && errors.password.type === "required" && <span>This is required</span>}
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit">Sign In</Button>
                    <br /><br />
                    <Link to="/signup">Create New Account</Link>
                </Form.Group>
            </Form>
        </ >
    );
}

export default LogIn;