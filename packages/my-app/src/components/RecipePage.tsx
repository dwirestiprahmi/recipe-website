import React, { Fragment, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditRecipe from './EditRecipe';
import { FaHeart } from "react-icons/fa";
import './styles.css';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />;

const RecipePage = () => {
    const [recipes, setRecipe] = useState([] as any[]);
    // const [rating, setRating] = useState(0);
    const getRecipes = async () => {
        try {
            const response = await fetch('http://localhost:2800/api/recipe', {
                headers: {
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            setRecipe(data);
        } catch (err: any) {
            console.error(err.message);
        }
    };

    const deleteRecipe = async (title: string) => {
        try {
            const deleteRecipe = await fetch(`http://localhost:2800/api/recipe/${title}`, {
                method: 'DELETE'
            });

            setRecipe(recipes.filter((recipe) => recipe.title !== title));
        } catch (err: any) {
            console.error(err.message);
        }
    };

    const updateRating = async (ratingNew:number, recipe_title:string) =>{
        try {
            const rating = ratingNew+1
            const body = { rating };
            const response = await fetch(`http://localhost:2800/api/recipe/${recipe_title}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            console.log(response);
            window.location.assign('/api/recipe');
        } catch (err: any) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getRecipes();
    }, []);

    console.log(recipes);
    return (
            <div className="recipe_list">
                    {recipes.map((recipe) => (
                        <div className="recipe_single" key={recipe.title}>
                                <img src={recipe.pictureLink} alt="" className='card__image' width={300}/>

                            <div className="card__content">
                            <h1 className='recipe_title'>{recipe.title}</h1>
                            <p>{recipe.description}</p>
                                <a className='card__link' href={`/api/recipe/add/ingredient/${recipe.title}`}>Add Ingredient</a>
                            </div>
                            <div className="card__info">
                                <div className="material-icon">
                                <FaHeart onClick={() =>updateRating(recipe.rating, recipe.title)}/>
                                <p>{recipe.rating}</p>
                                </div>
                                <div>
                                    <a className='card__link' href={`/api/recipe/details/${recipe.title}`}>View Recipe</a>
                                </div>
                            <EditRecipe recipe={recipe} />
                            <Button variant="danger" onClick={() => deleteRecipe(recipe.title)}>
                                Delete
                            </Button>
                            
                            </div>
                        </div>
                    ))}
            </div>
    );
};

export default RecipePage;
