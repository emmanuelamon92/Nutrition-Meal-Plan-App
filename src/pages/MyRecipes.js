import React, { useEffect } from 'react';
import '../source/App.css';

export default function MyRecipes({ meals }) {
    
    const renderMeals = () => {
        return meals.map(meal => {
            let url = `${ meal.sourceUrl }`;
            console.log({url})
            return <h3><a target='_blank' href={url}>{meal.title}</a ></h3>
        })
    }

    return (
        <div className="meal">
            <h1>MY RECIPES</h1>
            {renderMeals()}
        </div>
    )
}