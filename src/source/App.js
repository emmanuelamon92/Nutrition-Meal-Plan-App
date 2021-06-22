import React, { useState, useEffect } from 'react';
import './App.css';
// import NavBar from '../navbar/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MyRecipes from '../pages/MyRecipes';
import MyProfile from '../pages/MyProfile';
import { Link } from 'react-router-dom';


export default function App() {

  //Generate Mealplan API
  const [url, setUrl] = useState("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?targetCalories=2600&timeFrame=day")
  
  useEffect(() => {
    const configObj = {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "3ac613e275mshe29fb560ec9f8a9p1516fdjsn4288cb3518a5",
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    }
    fetch(url, configObj)
      .then(response => response.json())
      .then(fetchTestObj => console.log('working'))
      .catch(err => console.error(err))
  }, [url]);
  
    
  return (
    <>
      <nav className='navbar'>
        <div className='nav-container'>
            <Link to='/' className='nav-item'>HOME</Link>
            <Link to='/myrecipes' className='nav-item'>MY RECIPES</Link>
            <Link to='/myprofile' className='nav-item'>MY PROFILE</Link>
        </div>
      </nav>
      <Router>
        <Switch>
          <Route path='/' component={Home}></Route>
          <Route path='/myrecipes' component={MyRecipes}> </Route>
          <Route path='/myprofile' component={MyProfile}></Route>
        </Switch>
      </Router>
    </>
  );
}