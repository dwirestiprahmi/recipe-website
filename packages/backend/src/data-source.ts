import "reflect-metadata"
import { DataSource } from "typeorm"
import { Recipe } from "./entity/Recipe"
import { Ingredient } from "./entity/Ingredient"
import { IngredientsInRecipe } from "./entity/IngredientsInRecipe"
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "recipeuser",
    password: "fweSS22",
    database: "recipeDB",
    synchronize: true,
    logging: true,
    entities: [Recipe, Ingredient, IngredientsInRecipe],
    migrations: [],
    subscribers: [],
})
