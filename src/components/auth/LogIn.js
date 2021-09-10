import React, {useState} from "react";
import { Link, useContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router"

function LogIn() {

    // const [error, setError] = useState()
    // const [userInfo, setUserInfo] = useState()
    const { register, handleSubmit, formState: {errors} } = useForm();

    const history = useHistory()

    const onSubmit = (infoRegister) => {
        console.log(errors)
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
                // setUserInfo(data)
                console.log(data, 'Log in Successful')
            })
            .catch(err => {
                // setError(err)
                console.log(err, "Not able to log in!")
            })
        // history.push('/')
    }


    //<--- POST REQUEST END --->

    return (
        <>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="mb-3" controlId="form_basic_username">
                        <input type="username" placeholder="Username" {...register("username", {required: true})} />
                        {/* {errors.username && errors.username.type === "required" && <span>This is required</span>} */}
                    </div>
                    <div className="mb-3" controlId="form_basic_password_sign_in">
                        <br />
                        <input type="password" placeholder="Password" {...register("password", {required: true})}/>
                        {/* {errors.password && errors.password.type === "required" && <span>This is required</span>} */}
                    </div>
                    <br />
                    <button variant="primary" type="submit">Sign In</button>
                    <br /><br />
                    <Link to="/signup">Create New Account</Link>
                </div>
            </form>
        </ >
    );
}

export default LogIn;