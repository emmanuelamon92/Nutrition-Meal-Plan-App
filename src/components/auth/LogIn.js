import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router"

function LogIn( handleLogin, loggedInStatus ) {

    // const [error, setError] = useState()
    // const [userInfo, setUserInfo] = useState()
    const { register, handleSubmit, formState: {errors} } = useForm();

    const [error, setError] = useState('')

    const history = useHistory()
    
    useEffect(loggedInStatus ? redirect() : null, [])

    
    const onSubmit = (infoRegister) => {
        // e.preventDefault()
        //<--- POST REQUEST START --->
        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(infoRegister),
            withCredentials: true
        }
        fetch("/login", config)
            .then(res => res.json())
            .then(data => {
                if (data.logged_in) {
                    handleLogin(data)
                    redirect()
                } else {
                    setError(data.errors)
                }
            })
            .catch(err => {
                console.log('api error:', err)
            })
    }

    const redirect = () => {
        history.push('/')
    }

    const handleErrors = () => {
        return (
          <div>
            <ul>
            {this.state.errors.map(error => {
            return <li key={error}>{error}</li>
              })}
            </ul>
          </div>
        )
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
            <div>
                {errors ? handleErrors : null}
            </div>
        </ >
    );
}

export default LogIn;