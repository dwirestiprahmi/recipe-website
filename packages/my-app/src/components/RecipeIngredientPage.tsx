import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import useFetch from './useFetch';

const RecipeIngredientPage = () => {
    const { ingredientName }: { ingredientName: string } = useParams();
    const { data: recipes, error, isPending } = useFetch('http://localhost:2800/api/ingredientsInRecipe/' + ingredientName);
    

    return (
        <div className="recpie_ingredients_page">
            <h1 className='page_title'>Result</h1>
            <div className='recipe_ingredients_list'>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {recipes &&
                recipes.map((recipe) => (
                    <div className="recipe_ingredient_details" key={recipe.title}>
                        <div className='picture-header'>
                        <h1>{recipe.title}</h1>
                        <img className='recipe_ingredient_picture' src={recipe.pictureLink} alt="" />
                        </div>
                        <div className='recipe_ingredient_content'>
                        <label className='sub_title_recipe'>Description:</label>
                        <p>{recipe.description}</p>
                        <label className='sub_title_recipe'>Steps:</label>
                        <p>{recipe.steps}</p>
                        <label className='sub_title_recipe'>Rating:</label>
                        <p>{recipe.rating}</p>
                        <h2>Ingredients</h2>
                        {recipe.ingredients.map((recipeIng: any) => (
                            <div className="recipe_ingredients_inRecipe" key={recipeIng.ingredientName}>
                                <Link to={`/api/ingredient/${recipeIng.ingredientName}`}>
                                <p>{recipeIng.ingredientName}</p>
                                </Link>
                                <div className='i_unit'>
                                <p>{recipeIng.amount}</p>
                                <p>{recipeIng.unit}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeIngredientPage;
