import React, { useState } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import MyProfileEdit from './MyProfileEdit';
import './app/App.css';


export default function MyProfile({profile}) {

    console.log('profile data', profile)
    const [editedProfile, setEditedProfile] = useState({...profile})
    

// <--- Add time user looked up info? --->
    //var time = new Date();
    

// <--- RENDER currentUser FUNCTION TO ROUTE START --->
    
    const renderCurrentUser = () => {
                return <h3>Calories: <span className='prop-color'>{editedProfile.calories}</span> | Diet: <span className='prop-color'>{editedProfile.diet}</span>  | Allergies: <span className='prop-color'>{editedProfile.allergies}</span></h3>
    }

// <--- RENDER currentUser FUNCTION TO ROUTE END --->
    
    
    return (
        <div className='page-body'>
            <h1 className='my-profile'>MY PROFILE</h1>
            <div className='inner-body'>
                {renderCurrentUser()}

                <h3>Name: <span className='prop-color'>{profile.name}</span></h3>

                <h3>Age: <span className='prop-color'>{profile.age}</span></h3>

                <h3>Current Weight: <span className='prop-color'>{profile.current_weight}</span></h3>

                <h3>Target Weight: <span className='prop-color'>{profile.target_weight}</span></h3>

                <h3>Current Daily Calorie Target: <span className='prop-color'>{profile.calories}</span></h3>

                <h3>Allergies: <span className='prop-color'>{profile.allergies}</span></h3>

                <h3>Diet: <span className='prop-color'>{profile.diet}</span></h3>
            </div>
            <Link to='/myprofile/edit' className='btn'>Edit Profile</Link>
        </div>
    )
};

//Name, Picture, Height, Weight
//user calorie count or needed count/day for weight?