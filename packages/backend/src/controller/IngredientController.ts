import { ServerResponse } from "http";
import { AppDataSource } from "../data-source";
import { Ingredient } from "../entity/Ingredient";
import { NextFunction, Request, Response } from 'express'
import { Recipe } from "../entity/Recipe";


export class IngredientController{
    private ingredientRepository = AppDataSource.getRepository(Ingredient);

    //GET all ingredient by ingredientName with route get /ingredient
    async getAllIngredient(request: Request, response: Response, next: NextFunction) {
        const getAllIngredient = this.ingredientRepository.find();
        if(!getAllIngredient){
            throw new Error('Cannot find any existing ingredient')
        }
        return getAllIngredient
    }

    //GET one ingredient by ingredientName with route get /ingredient/:name
    async getOneIngredient(request: Request, response: Response, next: NextFunction){
        const {name} = request.params;
        const ingredientToGet = await this.ingredientRepository.find({where: {name: name}});
        if (!ingredientToGet) throw new Error(`Ingredient with name ${name} cannot be found!`);
        return ingredientToGet;
    }

    //POST ingredient with route post /ingredient
    async saveIngredient(request: Request, response: Response, next: NextFunction) {
        if(request.body.length == 0){
            throw new Error('Cannot save ingredient. Request Body is empty');
        }
        return this.ingredientRepository.save(request.body);
    }

    //DELETE ingredient by ingredientName with route delete /ingredient/:name
    async removeIngredient(request: Request, response: Response, next: NextFunction){
        const{name} = request.params
        const ingredientToRemove = await this.ingredientRepository.findOne({where: {name: name}});
        if (!ingredientToRemove) throw new Error(`Ingredient with name ${name} cannot be deleted because it cannot be found!`);
        await this.ingredientRepository.remove(ingredientToRemove);
        response.status(204).json( {
            message:  `${name} is deleted from Ingredient.`
        })
    }

    //PUT ingredient by ingredientName, depending on what exists on request.body. with route put /ingredient/:name
    async updateIngredient(request: Request, response: Response, next: NextFunction){
        const { name } = request.params;
        const ingredientToUpdate = await this.ingredientRepository.findOne({where: {name: name} });
        if(!ingredientToUpdate) throw new Error(`Ingredient with name ${name} cannot be updated because it cannot be found!`);
        if(request.body.name){
            if(!(await this.ingredientRepository.findOne({where: {name: request.body.name}}))){
                ingredientToUpdate.name = request.body.name
            }
        }
        if(request.body.pictureLink){
            ingredientToUpdate.pictureLink = request.body.pictureLink
        }
        if(request.body.description){
            ingredientToUpdate.description = request.body.description
        }
        return await this.ingredientRepository.save(ingredientToUpdate)
    }
}