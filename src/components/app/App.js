import React, { useState, useEffect } from 'react';
import './App.css';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import Home from '../Home';
import MyMeals from '../MyMeals';
import MyProfile from '../MyProfile';
import LogIn from '../auth/LogIn';
import LogOut from '../auth/LogOut';
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

  const api_key = process.env.API_KEY

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
   

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


  //<--- POST REQUEST FETCHED EXTERNAL API MEAL DATA TO RECIPE ENDPOINT IN POSTGRES DATABASE FILE START --->
          
          
              data.meals.forEach(meal => {
                  const {title, readyInMinutes, servings, sourceUrl } = meal
                  const mealDataPost = {
                      title: title,
                      readyInMinutes: readyInMinutes,
                      servings: servings,
                      sourceUrl: sourceUrl,
                      favorite: false
                  }
                  let config = {
                      method: 'POST',
                      headers: {
                          "Content-Type": "application/json",
                          "Accepts": "application/json"
                    },
                    body: JSON.stringify(mealDataPost)
                  }                
                fetch("/meals", config)


  // <--- POST REQUEST FETCHED EXTERNAL API MEAL DATA TO RECIPE ENDPOINT IN POSTGRES DATABASE FILE END --->
                
                
                // CALLING "GET REQUEST meals AND USERINFO FROM DB.JSON FILE" FUNCTION TO UPDATE/RERENDER AFTER NEW EXTERNAL API GET REQUEST
                handleFetchedUserInfo()
                handleFetchedMeals()
              })
        })
        .catch(err => console.error(err))
  }


//<--- INITIAL GET REQUEST FROM EXTERNAL API END --->


//<--- POST REQUEST INPUTED USER PROFILE DATA TO USER PROFILE ENDPOINT IN POSTGRES DATABASE START --->

  
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
  fetch("/profile", config)
}


//<--- POST REQUEST INPUTED USER PROFILE DATA TO USER PROFILE ENDPOINT IN POSTGRES DATABASE END --->


//<--- GET REQUEST MEALS AND USERINFO FROM POSTGRES DATABASE START --->

  
  const handleFetchedMeals = () => {
      fetch(`/user/${user.id}/meals`)
        .then(res => res.json())
        .then(data => {
          setMeals([...data])
        })
        .catch(err => console.error(err))
    
        fetch(`/user/${user.id}`)
        .then(res => res.json())
        .then(data => {
          setUser([...data])
        })
        .catch(err => console.error(err))
  }


//<--- GET REQUEST meals AND USERINFO FROM POSTGRES DATABASE END --->

  
//<--- SUBMIT HANDLER START --->

  
  const history = useHistory();
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/meals/mealplans/generate?targetCalories=" + calories + "&timeFrame=" + time + "&diet=" + diet + "&exclude=" + allergies
    fetchMeals(url)
    
    //REDIRECT AFTER SUBMIT BUTTON
    return history.push('./mymeals/');
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
    mealIds.forEach(mealId => fetch('/users/' + mealId, config))
    mealIds.forEach(mealId => fetch('/meals/' + mealId, config))
    //userIds.forEach(userId => fetch('/users/' + userId, config))

    // CALLING "GET REQUEST meals AND USERINFO FROM DB.JSON FILE" FUNCTION TO UPDATE/RERENDER AFTER DB.JSON DELETE REQUEST
    handleFetchedUserInfo()
    handleFetchedMeals()
  }


  // <--- CLEAR DB.JSON FILE DATABASE END --->
   

  // <--- GET REQUEST LOGIN START --->


  const loggedInStatus = () => {
    fetch('/logged_in', { withCredentials: true })
      // credentials: true
      .then(res => res.json())
      .then(data => {
        if(data.logged_in){
          handleLogin(data)
        } else {
          handleLogout()
        }
      })
      .catch(err => console.log('api errors:', err))
  }
  useEffect(loggedInStatus, [])

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data.user);
  }

  const handleLogout = () => {
    history.push('/login')
    setIsLoggedIn(false);
    setUser({})
    
  }


  // <--- GET REQUEST LOGIN END --->


  return (
    <>
      <Switch>
        <Route exact path='/signup' render={() => <SignUp handleLogin={handleLogin} loggedInStatus={ loggedInStatus } ></SignUp>}></Route>
        <Route exact path='/login' render={() => <LogIn handleLogin={ handleLogin } loggedInStatus={ loggedInStatus } ></LogIn>}></Route>
        <Route exact path='/logout' render={() => <LogOut></LogOut>}></Route>
        <div>
          <nav className='navbar'>
            <div className='nav-container'>
              <Link to='/' className='left-ali' >NUTRITIONAL MEAL APP</Link>
              <Link to='/logout' className='nav-item'>Sign Out</Link>
              <Link to='/myprofile'  className='nav-item'>My Profile</Link>
              <Link to='/mymeals' onClick={ handleFetchedMeals } className='nav-item'>My Meals</Link>
              <Link to='/' className='nav-item'>Home</Link>
            </div>
          </nav>
          <Route exact path='/' render={() => <Home currentUser={ user } onSubmitForm={ handleSubmitForm } onTimeChange={ handleTimeChange } onCaloriesChange={ handleCaloriesChange } onDietChange={ handleDietChange } onAllergiesChange={ handleAllergiesChange }/>}></Route>
          <Route exact path='/mymeals' render={() => <MyMeals currentUser={ user } meals={ meals } onDeleteAllMeals={ handleDeleteAllMeals } />}></Route>
          <Route exact path='/myprofile' render={() => <MyProfile currentUser={ user } calories={ calories } allergies={ allergies } diet={ diet }/>}></Route>
        </div>
      </Switch>
      <br/>
      {/* <CounterButton /> */}
    </>
  );
}