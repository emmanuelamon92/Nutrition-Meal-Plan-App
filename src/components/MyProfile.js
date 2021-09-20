import React from 'react';
import './app/App.css';


export default function MyProfile({profile}) {

    console.log('profile data', profile)
    

// <--- Add time user looked up info? --->
    //var time = new Date();
    

// <--- RENDER currentUser FUNCTION TO ROUTE START --->
    
    const renderCurrentUser = () => {
                return <h3>Calories: <span className='prop-color'>{profile.calories}</span> | Diet: <span className='prop-color'>{profile.diet}</span>  | Allergies: <span className='prop-color'>{profile.allergies}</span></h3>
    }

// <--- RENDER currentUser FUNCTION TO ROUTE END --->
    
    
    return (
        <div className='page-body'>
            <h1 className='my-profile'>MY PROFILE</h1>
            <div className='inner-body'>
                {renderCurrentUser()}
                <h3>Id: {profile.id}</h3>
                <h3>Name: {profile.name}</h3>
                <h3>Age: {profile.age}</h3>
                <h3>Current Weight: {profile.current_weight}</h3>
                <h3>Target Weight: { profile.target_weight }</h3>
                <h3>Current Daily Calorie Target: { profile.calories }</h3>
                <h3>Allergies: { profile.allergies }</h3>
                <h3>Diet: { profile.diet }</h3><br/>
            </div>
        </div>
    )
};

//Name, Picture, Height, Weight
//user calorie count or needed count/day for weight?