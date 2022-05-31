import {DataSource} from "typeorm";
import {NextFunction, Request, Response} from "express";
// import {User} from "../entity/User";

import { AppDataSource } from "../data-source";
import { Recipe } from "../entity/Recipe";
import { send } from "process";
import { IngredientsInRecipe } from "../entity/IngredientsInRecipe";

export class RecipeController {

  private recipeRepository = AppDataSource.getRepository(Recipe);

  //GET all recipes with route /api/recipe
  async allRecipe(request: Request, response: Response, next: NextFunction) {
      const allRecipe = this.recipeRepository.find()
      if(!allRecipe){
        throw new Error('Recipe is empty');
      }
      return allRecipe;
  }

  //GET one recipe by recipeTitle with route /api/recipe/:title
  async getOneRecipe(request: Request, response: Response, next: NextFunction) {
    const recipeToGet = this.recipeRepository.findOne({
      where: {
        title: request.params.title
      }
    });
    if (!recipeToGet) throw new Error('Recipe not found');
    else
      return recipeToGet;
  }

  //GET one recipe with its ingredients details by recipeTitle with route /api/recipe/detail/:title
  async getRecipeDetails(request, response){
    const { title } = request.params;
    const findRecipe = await this.recipeRepository
      .createQueryBuilder("recipe")
      .select("recipe")
      .innerJoinAndSelect("recipe.ingredientInRecipes", "recipe_ingredients")
      .where("recipe_ingredients.recipeTitle = :title", {title: title})
      .getMany();
      if(findRecipe.length == 0){
        throw new Error(`Recipe with title ${title} doesn't have any ingredients.`)
      } else {
        return findRecipe;
      }
  }

  //POST recipe with route /recipe
  async saveRecipe(request: Request, response: Response, next: NextFunction) {
    if(!request.body){
      throw new Error('Cannot save Recipe. Request Body is empty.')
    }
    return this.recipeRepository.save(request.body);
  }

  //DELETE recipe by recipeTitle with route /recipe/:title
  async removeRecipe(request: Request, response: Response, next: NextFunction) {
    const { title } = request.params
    const recipeToRemove = await this.recipeRepository.findOne({where: {title: title}});
    if (!recipeToRemove) throw new Error(`Recipe with title ${title} cannot be found.`)
    else{
      await this.recipeRepository.remove(recipeToRemove);
      return {message: `Recipe with title ${title} has been deleted.`};
    }
  }

  //PUT recipe by title, depending on what exists in request.body with route /recipe/:title
  async updateRecipe(request: Request, response: Response, next: NextFunction){
    const {title} = request.params;
    const recipeToUpdate = await this.recipeRepository.findOne({where: {title: title} });
    if(!recipeToUpdate) throw new Error(`Recipe with title ${title} cannot be found!`)
    if(request.body.title){
      const check = (await this.recipeRepository.find({where: {title: request.body.title}}))
        if(check.length == 0){
            recipeToUpdate.title = request.body.title
        }
    }
    if(request.body.pictureLink){
        recipeToUpdate.pictureLink = request.body.pictureLink
    }
    if(request.body.description){
        recipeToUpdate.description = request.body.description
    }
    if(request.body.steps){
      recipeToUpdate.steps = request.body.steps
    }
    if(request.body.rating){
      recipeToUpdate.rating = request.body.rating
    }
    return await this.recipeRepository.save(recipeToUpdate)
  }

  //GET Homepage of Recipe Website with index route /
  async homepage(request: Request, response: Response, next: NextFunction){
    return response.send("Welcome to Our Recipe Website!")
  }
}