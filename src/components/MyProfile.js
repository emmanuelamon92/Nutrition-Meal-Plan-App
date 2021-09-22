import React from 'react';
import { Link } from 'react-router-dom';
import './app/App.css';


export default function MyProfile({profile}) {

    console.log('MyProfile profile data', profile)
    
    return (
        <div className='page-body'>
            <div className="upper-body">
                <h1 className='my-profile'>MY PROFILE</h1>
                <Link to='/myprofile/edit' className='my-profile-edit' style={{ marginLeft: "auto" }}>Edit Profile</Link>
            </div>
            <div className='lower-body'>
                <h3>Calories: <span className='prop-color'>{profile.calories}</span> | Diet: <span className='prop-color'>{profile.diet}</span>  | Allergies: <span className='prop-color'>{profile.allergies}</span></h3>
                <h3>Name: <span className='prop-color'>{profile.name}</span></h3>
                <h3>Age: <span className='prop-color'>{profile.age}</span></h3>
                <h3>Current Weight: <span className='prop-color'>{profile.current_weight}</span></h3>
                <h3>Target Weight: <span className='prop-color'>{profile.target_weight}</span></h3>
                <h3>Current Daily Calorie Target: <span className='prop-color'>{profile.calories}</span></h3>
                <h3>Protein: <span className='prop-color'>{profile.protein}</span></h3>
                <h3>Carbohydrates: <span className='prop-color'>{profile.carbohydrates}</span></h3>
                <h3>Fat: <span className='prop-color'>{profile.fat}</span></h3>
                <h3>Allergies: <span className='prop-color'>{profile.allergies}</span></h3>
                <h3>Diet: <span className='prop-color'>{profile.diet}</span></h3>
            </div>
            
        </div>
    )
};

//Name, Picture, Height, Weight
//user calorie count or needed count/day for weight?