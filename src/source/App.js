import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from '../navbar/NavBar'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home'
import MyRecipes from '../pages/MyRecipes'
import MyProfile from '../pages/MyProfile'

export default function App() {

    //Generate Mealplan API
    //search by # of calories and Would you like a plain for one 'day' or one 'week'?
  
    //Time: Plan for One day or One week
    //Calorie: Target Calorie count?
    //Diet: Pescatarian, Vegitarian, or Vegan
    //Alergies: ?
    const [url, setUrl] = useState("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?targetCalories=2600&timeFrame=day")
  
    const apiGet = useEffect(() => {
        const configObj = {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "3ac613e275mshe29fb560ec9f8a9p1516fdjsn4288cb3518a5",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
        }
        fetch(url, configObj)
            .then(response => response.json())
            .then(fetchTestObj => fetchTestObj)
            .catch(err => console.error(err))
    }, [url]);
    
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route path='/' exact render={() => (
            <Home />
            )}
          />
          <Route path='/myrecipes' component={MyRecipes} />
          <Route path='/myprofile' component={MyProfile} />
        </Switch>
      </Router>
      
      <MyProfile />
      <MyRecipes />
    </>
  );
}