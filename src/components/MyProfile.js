import React from 'react';
import './app/App.css';


export default function MyProfile(props) {

    const { currentProfile, currentUser, calories, diet, allergies } = props
    console.log(calories, diet, allergies)


// <--- Add time user looked up info? --->
    //var time = new Date();
    

// <--- RENDER currentUser FUNCTION TO ROUTE START --->
    
    const renderCurrentUser = () => {
            // if (currentUser.id % 3 === 1){
                return <h3>Calories: <span className='prop-color'>{calories}</span> | Diet: <span className='prop-color'>{diet}</span>  | Allergies: <span className='prop-color'>{allergies}</span></h3>
            // }
    }
    // const renderCurrentUser = () => {
    //     return currentUser.map(input => {
    //         if (input.id % 3 === 1){
    //             return <h3>Calories: <span className='prop-color'>{input.calories}</span> | Diet: <span className='prop-color'>{input.diet}</span>  | Allergies: <span className='prop-color'>{input.allergies}</span></h3>
    //         }
    //     })
    // }


// <--- ENDER currentUser FUNCTION TO ROUTE END --->
    
    
    return (
        <div className='page-body'>
            
            <h1 className='my-profile'>MY PROFILE</h1>
            <div className='inner-body'>
                <h2>{ currentProfile.name }</h2>
                <h2>User Nutrition Information:</h2>
                <h3>Data You Submitted:</h3>
                {renderCurrentUser()}
            </div>
        </div>
    )
};

//Name, Picture, Height, Weight
//user calorie count or needed count/day for weight?