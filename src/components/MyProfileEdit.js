import React from 'react';
import './app/App.css';
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";


export default function MyProfileEdit({profile}) {

    console.log('edit profile data', profile)
    const { register, handleSubmit } = useForm();
    
    const onSubmit = (infoRegister) => { }

    return (
        <div className='page-body'>
            <h1 className='my-profile'>EDIT YOUR PROFILE</h1>
            <div className='inner-body'>
                <h3>Name: {profile.name}</h3>
                <h3>Age: {profile.age}</h3>
                <h3>Current Weight: {profile.current_weight}</h3>
                <h3>Target Weight: { profile.target_weight }</h3>
                <h3>Current Daily Calorie Target: { profile.calories }</h3>
                <h3>Allergies: { profile.allergies }</h3>
                <h3>Diet: {profile.diet}</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="mb-3" controlId="form_basic_name">
                        <h3>Name: <input type="name" placeholder="Name" {...register("name")}/></h3>
                    </div>
                    <div className="mb-3" controlId="form_basic_age">
                    <h3>Age: <input type="age" placeholder="Age" {...register("age")}/></h3>
                    </div>
                    <div className="mb-3" controlId="form_basic_current_weight">
                    <h3>Current Weight: <input type="current_weight" placeholder="Current Weight" {...register("current_weight")}/></h3>
                    </div>
                    <div className="mb-3" controlId="form_basic_target_weight">
                    <h3>Target Weight: <input type="target_weight" placeholder="Target Weight" {...register("target_weight")}/></h3>
                    </div>
                    <div className="mb-3" controlId="form_basic_calories">
                    <h3>Current Daily Calorie Target: <input type="calories" placeholder="Calorie Target" {...register("calories")}/></h3>
                    </div>
                    <div className="mb-3" controlId="form_basic_allergies">
                    <h3>Allergies: <input type="allergies" placeholder="Allergies" {...register("allergies")}/></h3>
                    </div>
                    <div className="mb-3" controlId="form_basic_diet">
                    <h3>Diet: <input type="diet" placeholder="Diet" {...register("diet")}/></h3>
                    </div>
                </div>
                <button variant="primary" type="submit">Save Changes</button>
                <br /><br />
                <Link to="/myprofile">Cancel</Link>
            </form>
            </div>
        </div>
    )
};

//Name, Picture, Height, Weight
//user calorie count or needed count/day for weight?