<!-- prettier-ignore-start -->
# Nutrition Meal Plan App

## User Stories
    - user sign in
    - *Home* - user puts in meal data
        - Target Calories
        - Dietary Restrictions
        - Allergies
    - user can look at:
        - *MyRecipe* - meals for the day or week(<-- needs to be created) based on user info
            - title (expand?)
            - readyInMinutes
            - servings
            - sourceUrl
        - *MyProfile* - nutrients needed per day
            - user info
            - calories(broken down)
                - protein in grams
                - fat in grams
                - carbohydrates in grams
        - *MyFavorites*
            - saved meals - user put in nutrition data for each saved element?
                - drinks
                - meals 
                - deserts
   
## user model
    - has_many :meals
    - has_one :profile

## profile model
    - belongs_to :user  

## meal model
    - belongs_to :user

:user ---< :meal
  |
  |
  |
  A
:profile

## user attributes:
    :username
    :password_digest

## profile attributes:
    :name
    :age
    :current_weight
    :target_weight

## meal attributes:
    :title
    :readyInMinutes
    :servings
    :sourceUrl
    :favorite

<!-- prettier-ignore-end -->

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
