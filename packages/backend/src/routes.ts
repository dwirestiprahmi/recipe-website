import { body, param } from "express-validator"
import { IngredientController } from "./controller/IngredientController"
import { IngredientsInRecipeController } from "./controller/IngredientsInRecipeController"
import { RecipeController } from "./controller/recipeController"
import { Ingredient } from "./entity/Ingredient"

export const Routes = [{
    /*****                  RECIPE ROUTE                 *****/  

    method: "get",
    route: "/",
    controller: RecipeController,
    action: "homepage",
    validation: [],
},{
    method: "get",
    route: "/api/recipe",
    controller: RecipeController,
    action: "allRecipe",
    validation: [],
}, {
    method: "get",
    route: "/api/recipe/:title",
    controller: RecipeController,
    action: "getOneRecipe",
    validation:[
        param('title').isString().withMessage('recipe title is required to find the specific recipe'),
    ]
},{
    method: "get",
    route: "/api/recipe/detail/:title",
    controller: RecipeController,
    action: "getRecipeDetails",
    validation:[
        param('title').isString().withMessage('recipe title is required to find the specific recipe with its details'),
    ]
}, {
    method: "post",
    route: "/api/recipe/create",
    controller: RecipeController,
    action: "saveRecipe",
    validation:[
        body('title').isString().withMessage("can't be empty"),
        body('description').isString().withMessage("please fill the description"),
        body('pictureLink').isString().withMessage("please give a picture for the recipe"),
        body('steps').isString().withMessage("please give instructions on how to cook it"),
    ],
}, {
    method: "delete",
    route: "/api/recipe/:title",
    controller: RecipeController,
    action: "removeRecipe",
    validation:[
        param('title').isString().withMessage("recipe title is required to delete a recipe"),
    ]
}, {
    method: "put",
    route: "/api/recipe/:title",
    controller: RecipeController,
    action: "updateRecipe",
    validation: [
        param('title').isString().withMessage("recipe title is required to edit a recipe"),
    ],
},

/*****                  INGREDIENT ROUTE                 *****/

{
    method: "get",
    route: "/api/ingredient",
    controller: IngredientController,
    action: "getAllIngredient",
    validation: [],
},{
    method: "get",
    route: "/api/ingredient/:name",
    controller: IngredientController,
    action: "getOneIngredient",
    validation: [
        param('name').isString().withMessage('ingredient Name is required to find the specific ingredient')
    ],
}, {
    method: "post",
    route: "/api/ingredient",
    controller: IngredientController,
    action: "saveIngredient",
    validation: [
        body('name').isString().withMessage("ingredient Name is required to create a new ingredient"),
        body('description').isString().withMessage("please give a desription to the ingredient"),
        body('pictureLink').isString().withMessage("please input picture for the ingredient"),
    ],
}, {
    method: "delete",
    route: "/api/ingredient/:name",
    controller: IngredientController,
    action: "removeIngredient",
    validation: [
        param('name').isString().withMessage('ingredient Name is required to delete the specific ingredient'),
    ],
}, {
    method: "put",
    route: "/api/ingredient/:name",
    controller: IngredientController,
    action: "updateIngredient",
    validation: [
        param('name').isString().withMessage('ingredient Name is required to edit the specific ingredient'),
    ],
}


/*****                  INGREDIENT IN RECIPE ROUTE                 *****/

,{
    method: "get",
    route: "/api/ingredientsInRecipe",
    controller: IngredientsInRecipeController,
    action: "getAllIngredientsInRecipe",
    validation: [],
},{
    method: "get",
    route: "/api/ingredientsInRecipe/:ingredientName",
    controller: IngredientsInRecipeController,
    action: "getRecipeByIngredientName",
    validation: [
        param("ingredientName").isString().withMessage("ingredient name is required to get a recipe by ingredientName")
    ],
}, {
    method: "post",
    route: "/api/ingredientsInRecipe",
    controller: IngredientsInRecipeController,
    action: "saveIngredientInRecipe",
    validation: [
        body('ingredientName').isString().withMessage("ingredient name is required to add an ingredient in a recipe"),
        body('recipeTitle').isString().withMessage("recipe title is required to add an ingredient in a recipe"),
        body('amount').isNumeric().withMessage("amount should be in numeric"),
        body('unit').isString().withMessage("unit should be in string"),
    ],
}, {
    method: "delete",
    route: "/api/ingredientsinrecipe/:title/:ingredientName",
    controller: IngredientsInRecipeController,
    action: "removeIngredientFromRecipe",
    validation:[
        param('title').isString().withMessage("recipe title is required to delete an ingredient in a specific recipe"),
        param('ingredientName').isString().withMessage("ingredient Name is required to delete an ingredient in a specific recipe"),
    ]
},{
    method: "put",
    route: "/api/ingredientsInRecipe/:title/:ingredientName",
    controller: IngredientsInRecipeController,
    action: "updateIngredientInRecipe",
    validation: [
        param('title').isString().withMessage("recipe title is required to edit an ingredient in a recipe"),
        param('ingredientName').isString().withMessage("ingredient Name is required to edit an ingredient in a recipe"),
    ],
},]