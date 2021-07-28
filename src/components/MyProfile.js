import React from 'react';
import './app/App.css';


export default function MyProfile(props) {

    const { userInfo } = props


// <--- Add time user looked up info? --->
    //var time = new Date();
    

// <--- RENDER USERINFO FUNCTION TO ROUTE START --->
    
    
    const renderUserInfo = () => {
        return userInfo.map(input => {
            if (input.id % 3 === 1){
                return <h3>Calories: <span className='prop-color'>{input.calories} | Diet: <span className='prop-color'>{input.diet}</span></span>  | Allergies: <span className='prop-color'>{input.allergies}</span></h3>
            }
        })
    }


// <--- ENDER USERINFO FUNCTION TO ROUTE END --->
    
    
    return (
        <div className='page-body'>
            
            <h1 className='my-profile'>MY PROFILE</h1>
            <div className='inner-body'>
                <h2>User Nutrition Information:</h2>
                <h3>Data You Submitted:</h3>
                {renderUserInfo()}
            </div>
        </div>
    )
};

//Name, Picture, Height, Weight
//user calorie count or needed count/day for weight?