import React from 'react';
import '../source/App.css';

//Time: Plan for One day or One week
//Calorie: Target Calorie count?
//Diet: Pescatarian, Vegitarian, or Vegan
//Alergies: ?
export default function Home() {

    // const [toMyRecipe, setToMyRecipe]


    return (
        <>
            <div>
                <h1 className='home'>Welcome to Meal Time!</h1>
                <form >
                    {/*Meals for Day or Week*/}
                    <label>Meal plan for a:</label>
                    <input type='radio' id='time-frame-input-day' value='day'/>
                    <label htmlFor='day'>Day</label>
                    <input type='radio' id='time-frame-input-week' value='week'/>
                    <label htmlFor='week'>Week</label><br />
                    {/*Calorie Take*/}
                    <label htmlFor='calories-input'/><br/>
                    <input type='text' id='calories-input' placeholder='Target Calories/meal' /><br/>
                    {/*Diet*/}
                    <label htmlFor='diet-input' /><br/>
                    <input type='text' id='diet-input' placeholder='Diet: e.g. "Vegan"' /><br/>
                    {/*Allergies*/}
                    <label htmlFor='allergies-input' /><br/>
                    <input type='text' id='allergies-input' placeholder='Allergies: e.g. "Gluten"' /><br/><br/>
                    <input type='submit' value='Submit' />
                </form>
            </div>
        </>
    );
    
}