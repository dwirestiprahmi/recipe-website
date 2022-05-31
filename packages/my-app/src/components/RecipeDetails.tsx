import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import useFetch from './useFetch';

const RecipeDetails = () => {

    
const [show, setShow] = useState(false );
   const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const { title }: { title: string } = useParams();
    const { data: recipes, error, isPending } = useFetch('http://localhost:2800/api/recipe/detail/' + title);
    let counter = 1;

    console.log(recipes);

    return (
        <div className="recipe_details_page">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {recipes &&
                recipes.map((recipe) => (
                    <div key={recipe.title}>
                        <section  className="recipe_details">
                            <img src={recipe.pictureLink} alt="" className='recipe_picture'/>
                            <article className='recipe_info'>
                                <h1>{recipe.title}</h1>
                            <div className='recipe_info'>
                            <label className='sub_title_recipe'>Description:</label>
                            <p>{recipe.description}</p>
                            <label className='sub_title_recipe'>Rating:</label>
                            <p>{recipe.rating}</p>
                            </div>
                            </article>
                        </section>
                        <div className='r_ingredient_content'>
                            <div className='steps_content'>
                            <h2>Steps</h2>
                            <p>{recipe.steps}</p>
                            </div>
                            <div className='ingredient_section'>
                        <h2>Ingredients</h2>
                        {recipe.ingredientInRecipes.map((recipeIng: any) => (
                            
                            <div className="ingredients_inRecipe" key={recipeIng.ingredientName}>
                                <p className='number'>{counter++}. </p>
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

                        
                    </div>
                ))}
        </div>
        
    );
};

export default RecipeDetails;
