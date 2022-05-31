# FWE Recipe Website

Dwiresti Puspita Rahmi (768553)


## Frontend
### The Functionality of The Recipe Website
1. Get all recipes at the homepage of the website
    - To visit the homepage, enter this url: http://localhost:3000/api/recipe. It is also possible to just click on the logo of the website "Diary Recipe"
    - on this homepage you will see all the recipes available. On each recipes, the picture, description, and number of likes for the recipe will be shown.
    - Functionality on this page are as follows:
        1. Edit Recipe
            - you can edit the available ingredient by clicking the button "edit", and there will be a popup to on the screen to edit the existing recipe.
            - to save the things that you have edited, simply click the button "edit".
            - to cancel the edit, you can click the field outside to popup window, or you can also click "close".
        2. Delete Recipe
            - to delete a specific recipe, click the button "delete" on the recipe that you wanted to delete.
        3. View Recipe
            - to view the details on the recipe (all required ingredient, etc.) you can click the word "View Recipe" on the bottom of each recipe.
        4. Give like
            - to represent the rating of each recipe, a number of likes will be implemented. 
            - to give like: click the heart button on the bottom of each recipe.
        5. Add ingredient to the specific recipe
            - above the edit and delete button is a clickable link to add ingredient to the recipe. you will be directeed to a page to add more ingredients.

2. Create a new Recipe
    - On the website you will see a navigation bar at the top of the website. There you can find the option to create a new recipe, which is represented by the option "Create Recipe"
    - left click on the option and this will take you to the create new recipe page.
    - In the create recipe page you will have to fill a few input fields:
        1. Recipe Title (mandatory, because it is a primary key)
        2. Recipe Description
        3. Picture Link (here you will have to give a link to a specific image)
        4. Steps or instruction to cook the recipe
        5. The next field will be the ingredient which will be used for this recipe. In this Ingredient field you have to input the following fields:
            1. Ingredient Name
            2. Amount of the ingredient needed
            3. unit of the amount (ml, piece, gr, cup, tsp, tbs, etc.)
            4. You will have the option to remove the current ingredient, or add another field to add more ingredient to the recipe
            5. After all the required fields are filled, you can then submit the recipe by left-clicking the button "Create Recipe". Then the page will be redirected to the homepage of all the recipes

3. Search Recipe by Recipe Title
    - on the navbar of the website you can search recipes by typing the recipe title and click the black button on the search field.
    - you will be directed to the recipe result page.
    - the details to the recipe can be obtained by clicking on the word "View Recipe"
    - after clicking "View Recipe", you will be directed to the Recipe details

4. Find recipe by ingredient name
    - on the corner right of the navbar is the functionality to find recipe by giving an ingredient name.

5. View Recipe with all its details (also di ingredients required in a recipe)
    - every clickable "View Recipe" directs to a detailed page of the recipe
    
---

### Technical Project Description
- React.js

- Typescript



## Backend
### Technical Project Description
- Express 
Express will be used to implement the Webserver for the Backend

- POSTGRESQL
To implement the database side for the server to persist the data which will be used to develop this project

- node.js
package manager to put modules in place, so that node can find them and manages the dependency conflicts. This will be used to install node programs.

- Typescript
The Programming Language which is used to develop the backend


### Features and API Reference


---

## Instruction
### Setup Backend and Frontend

**Steps to run backend project:**

1. Run `npm i` command
2. Run `npm run dev` command

**Steps to run frontend project:**

1. Run `cd my-app`
2. Run `npm start`