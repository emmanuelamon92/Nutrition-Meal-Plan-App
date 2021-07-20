import React, {useState, useEffect} from 'react';
import './App.css';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import Home from '../pages/Home';
import MyRecipes from '../pages/MyRecipes';
import MyProfile from '../pages/MyProfile';
import CounterButton from '../pages/CounterButton';


export default function App() {

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

  //FETCH REQUEST
  const fetchMeals = (url) => {
      
      // GET FROM API
    
      const configObj = {
          "method": "GET",
          "headers": {
              "x-rapidapi-key": "3ac613e275mshe29fb560ec9f8a9p1516fdjsn4288cb3518a5",
              "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
          }
      }
      fetch(url, configObj)
        .then(response => response.json())
        .then(data => {
          
              //POST TO JSON
          
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
              })
          })
          .catch(err => console.error(err))
    }
  
  //GET FROM JSON FILE
  
  const fetchCurrentMeals = () => {
    fetch('http://localhost:3001/recipes')
      .then(res => res.json())
      .then(data => setMeals(data))
  }
  useEffect(fetchCurrentMeals, [])

  const filteredMeals = meals.filter(meal => meal.title)

  //USED FOR THE MYPROFILE COMPONENT

  const userInfo = <h3>{`Calories: ${calories} | Allergies: ${allergies} | Diet: ${diet}`}</h3>

  //SUBMIT HANDLER

  const history = useHistory();
  const handleSubmitForm = (e) => {
      e.preventDefault();
      
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?targetCalories=" + calories + "&timeFrame=" + time + "&diet=" + diet + "&exclude=" + allergies
    fetchMeals(url)

    //REDIRECT AFTER SUBMIT BUTTON

    history.push('./MyRecipes/');
  }
   
  return (
    <>
      <nav className='navbar'>
        <div className='nav-container'>
          <Link to='/' className='left-ali' >NUTRITION MEAL PLAN APP</Link>
          <Link to='/myprofile' className='nav-item'>MY PROFILE</Link>
          <Link to='/myrecipes' className='nav-item'>MY RECIPES</Link>
          <Link to='/' className='nav-item'>HOME</Link>
        </div>
      </nav>
      <Switch>
        <Route path='/myprofile' render={() => <MyProfile userInfo={ userInfo }/>}></Route>
        <Route path='/myrecipes' render={() => <MyRecipes meals={filteredMeals} />}></Route>
        <Route path='/' render={() => <Home onSubmitForm={handleSubmitForm} onTimeChange={handleTimeChange} onCaloriesChange={handleCaloriesChange} onDietChange={handleDietChange} onAllergiesChange={handleAllergiesChange} />}></Route>
      </Switch>
      <br/>
      {/* <CounterButton /> */}
    </>
  );
}