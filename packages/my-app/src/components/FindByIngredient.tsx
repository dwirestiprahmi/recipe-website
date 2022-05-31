import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const FindByIngredient = () => {
    const [ingredientName, setIngredient] = useState('');
    const history = useHistory();

    return (
        <div className="findBy_ingredient">
            <input type="text"  className='ingredient_searchBox' placeholder="enter Ingredient name" value={ingredientName} onChange={(e) => setIngredient(e.target.value)} />
            <button type="submit" className='ingredient_submit' onClick={() => history.push('/api/recipe/search/ingredient/' + ingredientName)}>
            </button>
        </div>
    );
};

export default FindByIngredient;
