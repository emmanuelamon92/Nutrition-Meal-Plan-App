import React, { useState, useEffect } from 'react';
import './App.css';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import Home from '../Home';
import MyMeals from '../MyMeals';
import MyProfile from '../MyProfile';
import MyProfileEdit from '../MyProfileEdit';
import LogIn from '../auth/LogIn';
import LogOut from '../auth/LogOut';
import SignUp from '../auth/SignUp';

require('dotenv').config();

export default function App() {

// <--- STATE DECLARATIONS START--->
  const [time, setTime] = useState('day')
  const handleTimeChange = (e) => {
    setTime(e.target.value);

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

  const api_key = process.env.API_KEY

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const [user, setUser] = useState({})
  const [profile, setProfile] = useState({})
  console.log(profile)
  const [nutrients, setNutrients] = useState({})
  const [meals, setMeals] = useState([])
  const [error, setError] = useState('')
// <--- STATE DECLARATIONS END --->


// <--- INITIAL GET REQUEST FROM EXTERNAL API START --->
  const fetchMealsNutrients = (url) => {
    const configObj = {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "3ac613e275mshe29fb560ec9f8a9p1516fdjsn4288cb3518a5"
        // "x-rapidapi-key": process.env.API_KEY,
        // "x-rapidapi-key": api_key,
      }
    }
    fetch(url, configObj)
      .then(response => response.json())
      .then(data => {
        // <--- POST REQUEST FETCHED EXTERNAL API MEAL DATA TO RECIPE ENDPOINT IN POSTGRES DATABASE FILE START --->
        data.meals.forEach(meal => {
          const { title, readyInMinutes, servings, sourceUrl } = meal
          const mealDataPost = {
            title: title,
            readyInMinutes: readyInMinutes,
            servings: servings,
            sourceUrl: sourceUrl,
            favorite: false,
            user_id: user.id
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
          // handleFetchedUserInfo()
          // handleFetchedUsersMealsProfiles()
        })
        // <--- PUT REQUEST FETCHED EXTERNAL API NUTRIENT DATA TO RECIPE ENDPOINT IN POSTGRES DATABASE FILE START --->
          // const { calories, protein, fat, carbohydrates } = data.nutrients
          // const nutrientDataPost = {
          //   calories: calories,
          //   protein: protein,
          //   fat: fat,
          //   carbohydrates: carbohydrates
          // }
          // let config = {
          //   method: 'PUT',
          //   headers: {
          //     "Content-Type": "application/json",
          //     "Accepts": "application/json"
          //   },
          //   body: JSON.stringify(nutrientDataPost)
          // }
          // console.log('nutrientDataPost', nutrientDataPost, user.id)
          // fetch("/user/${user.id}/profile", config)
          // <--- POST REQUEST FETCHED EXTERNAL API NUTRIENT DATA TO RECIPE ENDPOINT IN POSTGRES DATABASE FILE END --->
          // **CALLING "GET REQUEST MEALS AND USERINFO FROM DB.JSON FILE" FUNCTION TO UPDATE/RERENDER AFTER NEW EXTERNAL API GET REQUEST**
          handleFetchedUserInfo()
          // handleFetchedUsersMealsProfiles()
      })
      .catch(err => console.error(err))
  }
// <--- INITIAL GET REQUEST FROM EXTERNAL API END --->

  
// <--- GET REQUEST LOGIN START --->
  const loggedInStatus = () => {
    fetch('/logged_in', { withCredentials: true })
      .then(res => res.json())
      .then(data => {
        if (data.logged_in) {
          handleLogin(data)
        } else {
          handleLogout()
        }
      })
      .catch(err => console.log('loggedInStatus - .catch - api errors:', err))
  }
  useEffect(loggedInStatus, [])
// <--- GET REQUEST LOGIN END --->
  

// <--- SENDING USERDATA TO STATE UPON USER LOGIN / TESTING IF USERLOGGED IN OR NOT START -->
  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data.user);
    setProfile(data.user_data.profile)
    setMeals(data.user_data.meals)
  }
// <--- SENDING USERDATA TO STATE UPON USER LOGIN / TESTING IF USERLOGGED IN OR NOT START -->

  
// <--- LOGGING USER OUT AND CLEARING USER DATA START --->
  const handleLogout = () => {
    history.push('/login')
    setIsLoggedIn(false);
    setUser({})
  }
// <--- LOGGING USER OUT AND CLEARING USER DATA END --->


// <--- SENDING EDITED MYPROFILE DATA TO STATE START --->
  const handleProfileEdit = (data) => {
    setProfile(data.profile)
  }
// <--- SENDING EDITED MYPROFILE DATA TO STATE END --->


// <--- PUT REQUEST INPUTED USER PROFILE DATA TO USER PROFILE ENDPOINT IN POSTGRES DATABASE START --->
  const handleFetchedUserInfo = () => {
    const userInputFromState = {
      calories: calories,
      allergies: allergies,
      diet: diet
    }
    let config = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(userInputFromState)
    }
    fetch(`/user/${user.id}/profile`, config)
            .then(res => res.json())
            .then(data => {
                console.log('edited data from form',data)
                if (data.profile_updated) {
                    handleProfileEdit(data)
                } else {
                    setError(data.errors)
                }
            })
            .catch(err => console.log(err))
    }
// <--- PUT REQUEST INPUTED USER PROFILE DATA TO USER PROFILE ENDPOINT IN POSTGRES DATABASE END --->


// <--- GET REQUEST MEALS AND USERINFO FROM POSTGRES DATABASE START --->
  // const handleFetchedUsersMealsProfiles = () => {
  //   // <--- GET REQUEST MEALS FOR SPECIFIC USER START --->
  //   fetch(`/user/${user.id}/meals`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log('meal data', data)
  //       setMeals([...data])
  //     })
  //     .catch(err => console.error(err))
  //   // <--- GET REQUEST MEALS FOR SPECIFIC USER END --->
  //   // <--- GET REQUEST SPECIFIC USER DATA START --->
  //   fetch(`/user/${user.id}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log('user data', data)
  //       setUser({...data})
  //     })
  //     .catch(err => console.error(err))
  //   // <--- GET REQUEST SPECIFIC USER DATA END --->
  //   // <--- GET REQUEST PROFILE FOR SPECIFIC USER START --->
  //   fetch(`/user/${user.id}/profile`, {mode: 'cors'})
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log('profile data', data)
  //       setProfile({...data})
  //     })
  //     .catch(err => console.error(err))
  // }
  // // <--- GET REQUEST PROFILE FOR SPECIFIC USER END --->
// <--- GET REQUEST MEALS AND USERINFO FROM POSTGRES DATABASE END --->
  
  
// <--- SUBMIT HANDLER START --->
  const history = useHistory();
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?targetCalories=" + calories + "&timeFrame=" + time + "&diet=" + diet + "&exclude=" + allergies
    fetchMealsNutrients(url)
    //REDIRECT AFTER SUBMIT BUTTON
    return history.push('./mymeals/');
  }
// <--- SUBMIT HANDLER END --->

  
// <--- CLEAR DB.JSON FILE DATABASE START --->
  const mealIds = meals.map(meal => meal.id)
  // const userIds = userInfo.map(input => input.id)
  const handleDeleteAllMeals = () => {
    console.log(user.id)
    let config = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
    }
    fetch(`/user/${user.id}/profile`, config)
    // mealIds.forEach(mealId => fetch('/users/' + mealId, config))
    // mealIds.forEach(mealId => fetch('/meals/' + mealId, config))
    // userIds.forEach(userId => fetch('/users/' + userId, config))
    // **CALLING "GET REQUEST MEALS AND USERINFO FROM DB.JSON FILE" FUNCTION TO UPDATE/RERENDER AFTER DB.JSON DELETE REQUEST**
    // handleFetchedUserInfo()
    // handleFetchedUsersMealsProfiles()
  }
// <--- CLEAR DB.JSON FILE DATABASE END --->


  return (
    <>
      <Switch>
        <Route exact path='/signup' render={() => <SignUp handleLogin={ handleLogin } loggedInStatus={ loggedInStatus } ></SignUp>}></Route>
        <Route exact path='/login' render={() => <LogIn handleLogin={ handleLogin } loggedInStatus={ loggedInStatus } ></LogIn>}></Route>
        <Route exact path='/logout' render={() => <LogOut></LogOut>}></Route>
        <div>
          <nav className='navbar'>
            <div className='nav-container'>
              <Link to='/' className='left-ali' >NUTRITIONAL MEAL APP</Link>
              <Link to='/logout' className='nav-item'>Sign Out</Link>
              <Link to='/myprofile' className='nav-item'>My Profile</Link>
              <Link to='/mymeals' className='nav-item'>My Meals</Link>
              <Link to='/' className='nav-item'>Home</Link>
            </div>
          </nav>
          <Route exact path='/' render={() => <Home currentUser={ user } profile={ profile } onSubmitForm={ handleSubmitForm } onTimeChange={ handleTimeChange } onCaloriesChange={ handleCaloriesChange } onDietChange={ handleDietChange } onAllergiesChange={ handleAllergiesChange }/>}></Route>
          <Route exact path='/mymeals' render={() => <MyMeals currentUser={ user } meals={ meals } onDeleteAllMeals={ handleDeleteAllMeals } />}></Route>
          <Route exact path='/myprofile' render={() => <MyProfile profile={profile} />}></Route>
          <Route exact path='/myprofile/edit' render={() => <MyProfileEdit onProfileEdit={handleProfileEdit} profile={profile} user={user} nutrients={nutrients}/>}></Route>
        </div>
      </Switch>
      <br/>
      {/* <CounterButton /> */}
    </>
  );
}