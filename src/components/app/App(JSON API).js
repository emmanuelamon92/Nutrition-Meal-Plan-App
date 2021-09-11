import React, { useState } from 'react';
import './App.css';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import Home from '../Home';
import MyRecipes from '../MyRecipes';
import MyProfile from '../MyProfile';
import LogIn from '../auth/LogIn';
import SignUp from '../auth/SignUp';

require('dotenv').config();
// import CounterButton from '../CounterButton';


export default function App() {


//<--- STATE DECLARATIONS START--->
  
  
  const [time, setTime] = useState('day')
  const handleTimeChange = (e) => {
    setTime(e.target.value);
    console.log(e.target)
    console.log(e.target.value)
  }

  const [calories, setCalories] = useState(0)
  const handleCaloriesChange = (e) => {
    setCalories(e.target.value);
  }

  const [diet, setDiet] = useState('None')
  const handleDietChange = (e) => {
    setDiet(e.target.value);
  }

  const [allergies, setAllergies] = useState('None')
  const handleAllergiesChange = (e) => {
    setAllergies(e.target.value);
  }

  const [meals, setMeals] = useState([])
  const [userInfo, setUserInfo] = useState([])

  const api_key = process.env.API_KEY

  const [isLoggedIn, setIsLoggedIn] = useState({})
  const [user, setUser] = useState(false)
   
  const handleLoggedIn = (data) => {
    setIsLoggedIn(true);
    setUser(data.user);
  }

  const handleLoggedOut = () => {
    setIsLoggedIn(false);
    setUser({})
  }

//<--- STATE DECLARATIONS END --->


//<--- INITIAL GET REQUEST FROM EXTERNAL API START --->
  
  
  const fetchMeals = (url) => {
      const configObj = {
          "method": "GET",
          "headers": {
              // "x-rapidapi-key": process.env.API_KEY,
              "x-rapidapi-key": api_key,
              "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
          }
      }
      fetch(url, configObj)
        .then(response => response.json())
        .then(data => {


  //<--- POST REQUEST FETCHED EXTERNAL API MEAL DATA TO RECIPE ENDPOINT IN DB.JSON FILE START --->
          
          
              data.meals.forEach(meal => {
                  const {title, readyInMinutes, servings, sourceUrl } = meal
                  const mealDataPost = {
                      title: title,
                      readyInMinutes: readyInMinutes,
                      servings: servings,
                      sourceUrl: sourceUrl
                  }
                  let config = {
                      method: 'POST',
                      headers: {
                          "Content-Type": "application/json",
                          "Accepts": "application/json"
                    },
                    body: JSON.stringify(mealDataPost)
                  }                
                fetch("http://localhost:3001/recipes", config)


  // <--- POST REQUEST FETCHED EXTERNAL API MEAL DATA TO RECIPE ENDPOINT IN DB.JSON FILE END --->
                
                
                // CALLING "GET REQUEST RECIPES AND USERINFO FROM DB.JSON FILE" FUNCTION TO UPDATE/RERENDER AFTER NEW EXTERNAL API GET REQUEST
                handleFetchedUserInfo()
                handleFetchedMeals()
              })
        })
        .catch(err => console.error(err))
  }


//<--- INITIAL GET REQUEST FROM EXTERNAL API END --->


//<--- POST REQUEST INPUTED USERINFO DATA TO USERINFO ENDPOINT IN JSON FILE START --->

  
const handleFetchedUserInfo = () => {
  const userInputFromState = {
    calories: calories,
    allergies: allergies,
    diet: diet
  }
  let config = {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
    },
  body: JSON.stringify(userInputFromState)
  }
  fetch("http://localhost:3001/userInfo", config)
}


//<--- POST REQUEST INPUTED USERINFO DATA TO USERINFO ENDPOINT IN JSON FILE END --->


//<--- GET REQUEST RECIPES AND USERINFO FROM DB.JSON FILE START --->

  
  const handleFetchedMeals = () => {
      fetch('http://localhost:3001/recipes')
        .then(res => res.json())
        .then(data => {
          setMeals([...data])
        })
        .catch(err => console.error(err))
    
        fetch('http://localhost:3001/userInfo')
        .then(res => res.json())
        .then(data => {
          setUserInfo([...data])
        })
        .catch(err => console.error(err))
  }


//<--- GET REQUEST RECIPES AND USERINFO FROM JSON FILE END --->

  
//<--- SUBMIT HANDLER START --->

  
  const history = useHistory();
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?targetCalories=" + calories + "&timeFrame=" + time + "&diet=" + diet + "&exclude=" + allergies
    fetchMeals(url)
    
    //REDIRECT AFTER SUBMIT BUTTON
    return history.push('./MyRecipes/');
  }


//<--- SUBMIT HANDLER END --->

  
//<--- CLEAR DB.JSON FILE DATABASE START --->
  
  
  const mealIds = meals.map(meal => meal.id)
  //const userIds = userInfo.map(input => input.id)

  const handleDeleteAllMeals = () => {
    let config = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json"
        },
    }
    mealIds.forEach(mealId => fetch('http://localhost:3001/userInfo/' + mealId, config))
    mealIds.forEach(mealId => fetch('http://localhost:3001/recipes/' + mealId, config))
    //userIds.forEach(userId => fetch('http://localhost:3001/userInfo/' + userId, config))

    // CALLING "GET REQUEST RECIPES AND USERINFO FROM DB.JSON FILE" FUNCTION TO UPDATE/RERENDER AFTER DB.JSON DELETE REQUEST
    handleFetchedUserInfo()
    handleFetchedMeals()
  }


  // <--- CLEAR DB.JSON FILE DATABASE END --->
   

  return (
    <>
      <Switch>
        <Route path='/signup' render={() => <SignUp></SignUp>}></Route>
        <Route path='/login' render={() => <LogIn></LogIn>}></Route>
        <div>
          <nav className='navbar'>
            <div className='nav-container'>
              <Link to='/' className='left-ali' >NUTRITIONAL RECIPE APP</Link>
              <Link to='/login' className='nav-item'>Sign Out</Link>
              <Link to='/myprofile'  className='nav-item'>My Profile</Link>
              <Link to='/myrecipes' onClick={ handleFetchedMeals } className='nav-item'>My Recipes</Link>
              <Link to='/' className='nav-item'>Home</Link>
            </div>
          </nav>
          <Route exact path='/' render={() => <Home onSubmitForm={ handleSubmitForm } onTimeChange={ handleTimeChange } onCaloriesChange={ handleCaloriesChange } onDietChange={ handleDietChange } onAllergiesChange={ handleAllergiesChange }/>}></Route>
          <Route exact path='/myrecipes' render={() => <MyRecipes userInfo={ userInfo } meals={meals} onDeleteAllMeals={ handleDeleteAllMeals } />}></Route>
          <Route exact path='/myprofile' render={() => <MyProfile userInfo={ userInfo } calories={ calories } allergies={ allergies } diet={ diet }/>}></Route>
        </div>
      </Switch>
      <br/>
      {/* <CounterButton /> */}
    </>
  );
}