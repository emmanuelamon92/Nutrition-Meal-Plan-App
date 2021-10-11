import React, { useEffect } from 'react';
import './app/App.css';


export default function MyMeals(props) {
    
    const { meals, onDeleteAllMeals } = props

//<--- CLEAR BUTTON RENDER TO SCREEN FUNCTION START --->
    const clearButton = () => {
        if (meals.length !== 0) {
            return <button onClick={onDeleteAllMeals}>CLEAR</button>
        } else {
            return <h2 className="empty">No Recipes Yet!</h2>
        }
    }
//<--- CLEAR BUTTON RENDER TO SCREEN FUNCTION END --->
    
    
// <--- RENDER MEAL DATA TO MYMEALS ROUTE START --->
    const renderMeals = () => {
        let count = 0
        return meals.map(meal => {
            let url = `${meal.sourceUrl}`;
            if (meal.id % 3 === 1) {
                count += 1
                return (
                    <div>
                        <h3><a target="_blank" rel="noreferrer" href={url}>{meal.title}</a ></h3 >
                    </div>
                )
            } else {
                return (
                    <div>
                        <h3><a target="_blank" rel="noreferrer" href={url}>{meal.title}</a ></h3 >
                    </div>
                )
            }

        })
    }
    useEffect(renderMeals, [])
// <--- RENDER MEAL DATA TO MYMEALS ROUTE END --->
    
    return (
        <div className='page-body'>
            <h1>MY MEALS</h1>
                {renderMeals()}
                {clearButton()}
        </div>
    )
}