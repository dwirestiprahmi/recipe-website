import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useHistory, useParams, Link } from 'react-router-dom';
import './styles.css';

const SearchBarPage = () => {
    const [recipes, setRecipe] = useState<{
        title: string;
        description: string;
        pictureLink: string;
        steps: string;
        rating: number;
    }>({
        title: '',
        description: '',
        pictureLink: '',
        steps: '',
        rating: 0
    });
    const { title }: { title: string } = useParams();
    const baseURL = 'http://localhost:2800/api/recipe/';

    useEffect(() => {
        getRecipe();
    }, []);

    const getRecipe = async () => {
        try {
            var urlString = baseURL + title;
            const response = await fetch(urlString, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const recipes = await response.json();
            console.log(recipes);
            setRecipe(recipes);
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

    console.log(recipes);
    return (
        <div className='recipe_result'>
            <h1>Result</h1>
        <div className='recipe_single'>
            <img src={recipes.pictureLink} className='card__image'/>
                <div className='card__content'>
                    <h1>{recipes.title}</h1>
                    <p>{recipes.description}</p>
                    <p>{recipes.steps}</p>
                </div>
                    <div className='card__info'>
                        <div className="material-icon">
                            <FaHeart onClick={() =>updateRating(recipes.rating, recipes.title)}/>
                            <p>{recipes.rating}</p>
                        </div>
                        <div>
                            <a className='card__link' href={`/api/recipe/details/${recipes.title}`}>View Recipe</a>
                        </div>
                    </div>
                
        </div>
        </div>
    );
};

export default SearchBarPage;
