import React, {useState, useEffect} from 'react';
import './app/App.css';
import { Link, useHistory, useRouteMatch, Switch, Route } from "react-router-dom";
import { useForm } from "react-hook-form";


export default function MyProfileEdit({profile, user, onProfileEdit}) {

    const [error, setError] = useState('')
    const { register, handleSubmit, setValue } = useForm();
    const history = useHistory()
    const redirect = () => {
        history.push('/myprofile')
    }


// <--- PUT REQUEST USER MY PROFILE EDITED INFO START --->
    const onSubmit = (editedInfo) => {
        let config = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(editedInfo)
        }
        fetch(`/user/${profile.id}/profile`, config)
            .then(res => res.json())
            .then(data => {
                if (data.profile_updated) {
                    onProfileEdit(data)
                    redirect()
                } else {
                    setError(data.errors)
                }
            })
            .catch(err => console.log(err))
    }
// <--- PUT/PATCH USER MY PROFILE REQUEST END --->
    
    
    const handleErrors = () => {
        return (
        <div>
            <ul>
            {error.map(err => {
            return <p className="errorList" key={err} color='#ff7f50'>{err}</p>
            })}
            </ul>
        </div>
        )
    }

    return (
        <div className='page-body'>
            <h1 className='my-profile'>EDIT YOUR PROFILE</h1>
            <div className='inner-body'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="mb-3" controlId="form_basic_name">
                            <h3>Name: <input {...register("name")} {...setValue("name", profile.name)} type="name" placeholder="Name"/></h3>
                        </div>
                        <div className="mb-3" controlId="form_basic_age">
                            <h3>Age: <input {...register("age")} {...setValue("age", profile.age)} type="age" placeholder="Age" /></h3>
                        </div>
                        <div className="mb-3" controlId="form_basic_current_weight">
                            <h3>Current Weight: <input {...register("current_weight")} {...setValue("current_weight", profile.current_weight)} type="current_weight" placeholder="Current Weight" /></h3>
                        </div>
                        <div className="mb-3" controlId="form_basic_target_weight">
                            <h3>Target Weight: <input type="target_weight" placeholder="Target Weight" {...register("target_weight")} {...setValue("target_weight", profile.target_weight)} /></h3>
                        </div>
                        <div className="mb-3" controlId="form_basic_calories">
                            <h3>Current Daily Calorie Target: <input {...register("calories")} {...setValue("calories", profile.calories)}  type="calories" placeholder="Calorie Target" /></h3>
                        </div>
                        <div className="mb-3" controlId="form_basic_allergies">
                            <h3>Allergies: <input {...register("allergies")} {...setValue("allergies", profile.allergies)} type="allergies" placeholder="Allergies" /></h3>
                        </div>
                        <div className="mb-3" controlId="form_basic_diet">
                            <h3>Diet: <input {...register("diet")} {...setValue("diet", profile.diet)} type="diet" placeholder="Diet" /></h3>
                        </div>
                    </div>
                    <button variant="primary" type="submit">Save Changes</button>
                    <br /><br />
                    <Link to="/myprofile">Cancel</Link>
                </form>
                <div>
                    {error ? handleErrors() : null}
                </div>
            </div>
        </div>
    )
};

//Name, Picture, Height, Weight
//user calorie count or needed count/day for weight?