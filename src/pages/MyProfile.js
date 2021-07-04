import React from 'react';
import '../source/App.css';


export default function MyProfile(props) {
    
    return (
        <>
            <h1 className='my-profile'>MY PROFILE</h1>
            <h2>User Nutrition Information:</h2>
            <h3>Data You Submitted:</h3>
            { props.userInfo }
        </>
    )
};

//Name, Picture, Height, Weight
//user calorie count or needed count/day for weight?