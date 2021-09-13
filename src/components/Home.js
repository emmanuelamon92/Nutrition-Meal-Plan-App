import React from 'react';
import './app/App.css';


export default function Home(props) {

    const { time, currentUser, calories, onCaloriesChange, diet, onDietChange, allergies, onAllergiesChange, onSubmitForm } = props
    console.log(currentUser)
    return (
        <>
            <div className='page-body'>
                <h1 className='home'>Welcome {currentUser.username}! I'm Your Recipe Assistant! { time }</h1>
                <form onSubmit={onSubmitForm} className='form' id='userNutritionInfoForm' autoComplete='off'>
                    {/*Meals for Day or Week*/}
                    <label>Select your recipe plan info for the day!</label><br/>
                    {/* <input type='radio' id='time-frame-input-day' value='day' onChange={ onTimeChange } />
                    <label htmlFor='day'>Day</label> */}
                    {/* <input type='radio' id='time-frame-input-week' value='week' onChange={ onTimeChange } />
                    <label htmlFor='week'>Week</label><br /> */}
                    <div className='inputs'>
                        {/*Calorie Take */}
                        <label htmlFor='calories-input'/><br/>
                        <input type='text' id='calories-input' placeholder='Target Calories' onChange={ onCaloriesChange } value={ calories } /><br/>
                        {/*Diet*/}
                        <label htmlFor='diet-input' /><br/>
                        <input type='text' id='diet-input' placeholder='Diet: e.g. "Vegan"' onChange={onDietChange} value={diet} /><br />
                        {/* vegan, vegetarian, pescetarian, gluten free,
                        grain free, dairy free, high protein, low sodium,
                        low carb, Paleo, Primal, ketogenic, FODMAP, and Whole 30 */}
                        {/*Allergies*/}
                        <label htmlFor='allergies-input' /><br/>
                        <input type='text' id='allergies-input' placeholder='Allergies: e.g. "Gluten"' onChange={ onAllergiesChange } value={ allergies } /><br /><br />
                        {/*Form Submit*/}
                        <input type='submit' id='form-submit' value='Submit'/>
                    </div>
                </form>
            </div>
        </>
    );
    
}