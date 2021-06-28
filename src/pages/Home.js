import React, { useState } from 'react';
import '../source/App.css';

//Time: Plan for One day or One week
//Calorie: Target Calorie count?
//Diet: Pescatarian, Vegitarian, or Vegan
//Alergies: ?
export default function Home() {
//setTime:prop(time) in app component
    // const [time, setTime] = useState('day')
    // const [calories, setCalories] = useState('2000')
    // const [diet, setDiet] = useState('diet')
    // const [allergies, setAllergies] = useState('allergies')

    const submitForm = e => {
        e.preventDefault();
        //somefunction(callbackfn);
        console.log(time, calories, diet, allergies)
    }
      
    return (
        <>
            <div>
                <h1 className='home'>Welcome to Your Meal Time! {time}</h1>
                <form onSubmit={submitForm} className='form' id='userNutritionInfoForm'>
                    {/*Meals for Day or Week*/}
                    <label>Meal plan for a:</label>
                    <input type='radio' id='time-frame-input-day' value='Day' checked={time === 'Day'} onChange={event => setTime(event.target.value)}/>
                    <label htmlFor='day'>Day</label>
                    <input type='radio' id='time-frame-input-week' value='Week' checked={time === 'Week'} onChange={event => setTime(event.target.value)}/>
                    <label htmlFor='week'>Week</label><br />
                    {/*Calorie Take*/}
                    <label htmlFor='calories-input'/><br/>
                    <input type='text' id='calories-input' placeholder='Target Calories/meal' onChange={event => setCalories(event.target.value)}/><br/>
                    {/*Diet*/}
                    <label htmlFor='diet-input' /><br/>
                    <input type='text' id='diet-input' placeholder='Diet: e.g. "Vegan"' onChange={event => setDiet(event.target.value)}/><br/>
                    {/*Allergies*/}
                    <label htmlFor='allergies-input' /><br/>
                    <input type='text' id='allergies-input' placeholder='Allergies: e.g. "Gluten"' onChange={event => setAllergies(event.target.value)}/><br /><br />
                    {/*Form Submit*/}
                    <input type='submit' id='form-submit'  value='Submit' />
                </form>
            </div>
        </>
    );
    
}