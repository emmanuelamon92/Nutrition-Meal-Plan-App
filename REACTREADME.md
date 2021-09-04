<!-- prettier-ignore-start -->
# Medical Records App

## Patient Stories
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
    - has_many :recipes
    - has_many :favorites
    - has_many :, through: :

## recipe model
    - belongs_to :
    - belongs_to :

##  model
    - has_many :
    - has_many :, through: :
    - belongs_to :

##  model
    - has_many :
    - has_many :, through: :

## model
    - belongs_to :
    - belongs_to :

:user ---< :meal >--- :
    |                                  |
    |                                  |
    A                                  |
:                                      |
    V                                  |
    |                                  |
    |                                  |
: >---------------------------

## patient attributes:
    :
    :
    :

##  attributes:
    :
    :

## doctor attributes:
    :
    :

## patient_ attributes:
    :
    :
    :

## _review attributes:
    :
    :
    :
    :

<!-- prettier-ignore-end -->

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
