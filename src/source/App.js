import React, {useState, useEffect} from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MyRecipes from '../pages/MyRecipes';
import MyProfile from '../pages/MyProfile';
import { Link } from 'react-router-dom';



export default function App() {

  const [time, setTime] = useState('day')
  const [calories, setCalories] = useState('2000')
  const [diet, setDiet] = useState('diet')
  const [allergies, setAllergies] = useState('allergies')

  const handleSubmit = () => {
    setTime(time);
    setCalories(calories);
    setDiet(diet);
    setAllergies(allergies);
  }


  const fetchData = () => {
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?targetCalories=2600&timeFrame=day"
    const configObj = {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "3ac613e275mshe29fb560ec9f8a9p1516fdjsn4288cb3518a5",
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
        }
    }
    return fetch(url, configObj)
        .then(response => response.json())
        .then(fetchTestObj => {
            const { meals } = fetchTestObj;
            // console.log(meals)
            return meals;
        })
        .catch(err => console.error(err))
  }
  const [meals, setMeals] = useState([])

  useEffect(() => {
      fetchData().then(apiMeals => {
          setMeals(apiMeals)
          // console.log(apiMeals)
      })
  }, [])


  console.log(meals)
  
  return (
    <>
      {/* <div>
          <h1>Meals!</h1>
          {meals.map((meal, mealIdx) => <div key={mealIdx}>
              {meal.title}
          </div>)}
      </div> */}
      <nav className='navbar'>
        <div className='nav-container'>
            <Link to='/' className='nav-item'>HOME</Link>
            <Link to='/myrecipes' className='nav-item'>MY RECIPES</Link>
            <Link to='/myprofile' className='nav-item'>MY PROFILE</Link>
        </div>
      </nav>
      <Switch>
        <Route path='/myprofile' component={MyProfile}></Route>
        <Route path='/myrecipes' component={MyRecipes}></Route>
        <Route path='/' component={Home}></Route>
        {/* <Home time= calories= diet= allergies= /> */}
      </Switch>
    </>
  );
}