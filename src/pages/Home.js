import React, { useState } from 'react';
import '../source/App.css';

//Time: Plan for One day or One week
//Calorie: Target Calorie count?
//Diet: Pescatarian, Vegitarian, or Vegan
//Alergies: ?
export default function Home(props) {

    const handleSubmit = (e) => {
        e.preventdefault();
    }
    const { time, calories, diet, allergies } = props
    
    // console.log(time, calories, diet, allergies)
    // console.log(props.onTimeChange)

    return (
        <>
            <div>
                <h1 className='home'>Welcome to Your Meal Time! {time}</h1>
                <form onSubmit={handleSubmit} className='form' id='userNutritionInfoForm'>
                    {/*Meals for Day or Week*/}
                    <label>Meal plan for a:</label>
                    <input type='radio' id='time-frame-input-day' value='Day' onChange={props.onTimeChange} value={ time } />
                    <label htmlFor='day'>Day</label>
                    <input type='radio' id='time-frame-input-week' value='Week' onChange={props.onTimeChange} value={ time } />
                    <label htmlFor='week'>Week</label><br />
                    {/*Calorie Take*/}
                    <label htmlFor='calories-input'/><br/>
                    <input type='text' id='calories-input' placeholder='Target Calories/meal' onChange={props.onCaloriesChange} value={ calories } /><br/>
                    {/*Diet*/}
                    <label htmlFor='diet-input' /><br/>
                    <input type='text' id='diet-input' placeholder='Diet: e.g. "Vegan"' onChange={props.onDietChange} value={ diet } /><br/>
                    {/*Allergies*/}
                    <label htmlFor='allergies-input' /><br/>
                    <input type='text' id='allergies-input' placeholder='Allergies: e.g. "Gluten"' onChange={props.onAllergiesChange} value={ allergies } /><br /><br />
                    {/*Form Submit*/}
                    <input type='submit' id='form-submit'  value='Submit' />
                </form>
            </div>
        </>
    );
    
}