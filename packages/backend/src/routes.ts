import { body, param } from "express-validator"
import { IngredientController } from "./controller/IngredientController"
import { IngredientsInRecipeController } from "./controller/IngredientsInRecipeController"
import { RecipeController } from "./controller/recipeController"
import { Ingredient } from "./entity/Ingredient"

export const Routes = [{
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
        param('title').isString(),
    ]
},{
    method: "get",
    route: "/api/recipe/detail/:title",
    controller: RecipeController,
    action: "getRecipeDetails",
    validation:[
        param('title').isString(),
    ]
}, {
    method: "post",
    route: "/api/recipe/create",
    controller: RecipeController,
    action: "saveRecipe",
    validation:[
        body('title').isString().withMessage("can't be empty"),
        body('description').isString().withMessage("please fill the description"),
        body('pictureLink').isString(),
        body('steps').isString(),
    ],
}, {
    method: "delete",
    route: "/api/recipe/:title",
    controller: RecipeController,
    action: "removeRecipe",
    validation:[
        param('title').isString(),
    ]
}, {
    method: "put",
    route: "/api/recipe/:title",
    controller: RecipeController,
    action: "updateRecipe",
    validation: [
        param('title').isString(),
    ],
},{
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
        param('name')
    ],
}, {
    method: "post",
    route: "/api/ingredient",
    controller: IngredientController,
    action: "saveIngredient",
    validation: [
        body('name').isString(),
        body('description').isString(),
        body('pictureLink').isString(),
    ],
}, {
    method: "delete",
    route: "/api/ingredient/:name",
    controller: IngredientController,
    action: "removeIngredient",
    validation: [
        param('name').isString(),
    ],
}, {
    method: "put",
    route: "/api/ingredient/:name",
    controller: IngredientController,
    action: "updateIngredient",
    validation: [
        param('name').isString(),
    ],
},{
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
    validation: [],
}, {
    method: "post",
    route: "/api/ingredientsInRecipe",
    controller: IngredientsInRecipeController,
    action: "saveIngredientInRecipe",
    validation: [],
}, {
    method: "delete",
    route: "/api/ingredientsinrecipe/:title/:ingredientName",
    controller: IngredientsInRecipeController,
    action: "removeIngredientFromRecipe",
    validation:[
        param('title').isString(),
        param('ingredientName').isString(),
    ]
},{
    method: "put",
    route: "/api/ingredientsInRecipe/:title/:ingredientName",
    controller: IngredientsInRecipeController,
    action: "updateIngredientInRecipe",
    validation: [],
},]