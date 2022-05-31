import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useFetch from './useFetch';

const IngredientDetails = () => {
    const { ingredientName }: { ingredientName: string } = useParams();
    const { data: ingredients, error, isPending } = useFetch('http://localhost:2800/api/ingredient/' + ingredientName);
    
    
    return(     
        <div>                  
            <label className='page_title'>Ingredient Details</label>
            <div className="ingredient_details">
            {ingredients.map((ingredient: any) => (
                    <div className="ingredients" key={ingredient.name}>
                        <img src={ingredient.pictureLink} alt="" />
                        <div className='ingredient_content'>
                        <label htmlFor="">Ingredient Name</label>
                        <p>{ingredient.name}</p>
                        <label htmlFor="">Description</label>
                        <p>{ingredient.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IngredientDetails;
