import { ServerResponse } from "http";
import { AppDataSource } from "../data-source";
import { Ingredient } from "../entity/Ingredient";
import { NextFunction, Request, Response } from 'express'
import { IngredientsInRecipe } from "../entity/IngredientsInRecipe";
import { Recipe } from "../entity/Recipe";


export class IngredientsInRecipeController{
    private ingredientsOnRecipeRepository = AppDataSource.getRepository(IngredientsInRecipe);

    //GET all ingredients in recipe with all ingredientName and ingredientTitle with route get /ingredientsInRecipe
    async getAllIngredientsInRecipe(request: Request, response: Response, next: NextFunction) {
        const allIngredientsInRecipe = this.ingredientsOnRecipeRepository.find()
        if(!allIngredientsInRecipe){
            throw new Error('There is no ingredient that is related to any recipe')
        }
        return allIngredientsInRecipe;
    }

    //GET recipe that has ingredientName with route get /ingredientsInRecipe/:ingredientName
    async getRecipeByIngredientName(request: Request, response: Response, next: NextFunction){
        const {ingredientName} = request.params;
        const findRecipe = await AppDataSource.getRepository(Recipe)
            .createQueryBuilder("recipe")
            .leftJoin("recipe.ingredientInRecipes", "ingredientsInRecipe")
            .where("ingredientsInRecipe.ingredientName = :ingredientName", {ingredientName: ingredientName})
            .getMany();
        
        for(var recipe of findRecipe){
            const findIngredient = await this.ingredientsOnRecipeRepository.find({
                where: {
                    recipeTitle: recipe.title,
                }
            })
            console.log(findIngredient);
            recipe['ingredients'] = findIngredient
        }
        if((await findRecipe).length == 0) throw new Error(`Cannot find Recipe with ingredient ${ingredientName}`);
        else
        return findRecipe; 
    }

    //POST ingredients into recipe by recipeTitle with route post /ingredientsInRecipe
    async saveIngredientInRecipe(request: Request, response: Response, next: NextFunction) {
        const checkRecipe = await AppDataSource.getRepository(Recipe).findOne({where: {title: request.body.recipeTitle}})
        if(!checkRecipe) throw new Error(`Cannot save ingredient in Recipe with title ${request.body.recipeTitle} because it doesn't exist.`);
        await this.ingredientsOnRecipeRepository.save(request.body);
        const findRecipe = await AppDataSource.getRepository(Recipe)
                            .createQueryBuilder("recipe")
                            .select("recipe")
                            .innerJoinAndSelect("recipe.ingredientInRecipes", "recipe_ingredients")
                            .where("recipe_ingredients.recipeTitle = :title", {title: request.body.recipeTitle})
                            .getOne();
        return findRecipe;
    }

    //DELETE ingredientsinrecipe from recipe by ingredientName and recipeTitle with route delete /ingredientsinrecipe/:title/:ingredientName
    async removeIngredientFromRecipe(request: Request, response: Response, next: NextFunction){
        const {title, ingredientName} = request.params
        const ingredientToRemove = await this.ingredientsOnRecipeRepository.findOne({
        where: {
            recipeTitle: title,
            ingredientName: ingredientName
        }
        });
        if(!ingredientToRemove) throw new Error(`Delete failed. Ingredient ${ingredientName} is not contained in Recipe with title ${title}.`)
        await AppDataSource.getRepository(IngredientsInRecipe)
                            .createQueryBuilder("ingredientsInRecipe")
                            .delete()
                            .where("recipeTitle = :recipeTitle", {recipeTitle: title})
                            .andWhere("ingredientName = :ingredientName", {ingredientName: ingredientName})
                            .execute();
        return ({
            message: `ingredient ${ingredientName} is deleted from Recipe with title ${title}`
        })
    }

    //UPDATE ingredientinrecipe by ingredientName and recipeTitle with route put /ingredientsInRecipe/:title/:ingredientName
    async updateIngredientInRecipe(request: Request, response: Response, next: NextFunction){
        const {title, ingredientName} = request.params
        const checkAvailable = this.ingredientsOnRecipeRepository.findOne({
            where: {
                recipeTitle: title,
                ingredientName: ingredientName
            }
        })
        if(!checkAvailable) throw new Error(`Update failed. Ingredient ${ingredientName} is not contained in Recipe with title ${title}.`)
        const ingredientToUpdate = await AppDataSource
        .createQueryBuilder()
        .update(IngredientsInRecipe)
        .set({
            amount: request.body.amount,
            unit: request.body.unit
        }).where('recipeTitle = :recipeTitle AND ingredientName = :ingredientName',
                    {recipeTitle: title, ingredientName: ingredientName})
        .execute();

        const checkUpdate = this.ingredientsOnRecipeRepository.findOne({
            where: {
                recipeTitle: title,
                ingredientName: ingredientName
            }
        })

        return checkUpdate;
    }
}