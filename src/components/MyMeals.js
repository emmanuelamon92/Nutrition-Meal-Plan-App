import React from 'react';
import './app/App.css';


export default function MyMeals(props) {
    
    const { meals, onDeleteAllMeals } = props

    // console.log(meals)


//<--- CLEAR BUTTON RENDER TO SCREEN FUNCTION START --->
    
    
    const clearButton = () => {
        if (meals.length !== 0) {
            // console.log("not empty")
            return <button onClick={onDeleteAllMeals}>CLEAR</button>
        } else {
            // console.log("empty")
            return <h2 className="empty">No Recipes Yet!</h2>
        }
    }


//<--- CLEAR BUTTON RENDER TO SCREEN FUNCTION END --->
    
    
// <--- RENDER MEAL DATA TO MYMEALS ROUTE START --->


    const renderMeals = () => {
        let count = 0
        return meals.map(meal => {
            let url = `${meal.sourceUrl}`;
            // console.log(meal.title)
            if (meal.id % 3 === 1) {
                count += 1
                return (
                    <div>
                        {/* <p>Recipe Group: {count}</p> */}
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


// <--- RENDER MEAL DATA TO MYMEALS ROUTE END --->
 
    
    return (
        <div className='page-body'>
            <h1>MY MEALS</h1>
            <div className="meal">
                {renderMeals()}
            </div>
            {clearButton()}
        </div>
    )
}