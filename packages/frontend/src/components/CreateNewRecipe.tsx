import React, { useState } from 'react';
import createPost from '../method/createPost';

const CreateNewRecipe = () => {
    const [postData, setPostData] = useState({
        title: '',
        description: '',
        pictureLink: '',
        steps: '',
    });

    const [ingredientList, setIngredientList] = useState([{ ingredientName: '', recipeTitle: '', amount: '', unit: '' }]);

    const addIngredient = () => {
        let newfield = { ingredientName: '', recipeTitle: '', amount: '', unit: '' };
        setIngredientList([...ingredientList, newfield]);
    };

    const removeIngredient = (index: number) => {
        if(ingredientList.length >0){
            let data = [...ingredientList];
            data.splice(index, 1);
            setIngredientList(data);
        }
    };

    const handleFormChange = (index: any, event: any) => {
        let data: any = [...ingredientList];
        data[index][event.target.name] = event.target.value;
        setIngredientList(data);
    };

    const submit = async (e: any) => {
        e.preventDefault();
        try {
            const title = postData.title
            const description = postData.description
            const pictureLink = postData.pictureLink
            const steps = postData.steps
            const bodyString = {
                title, description, pictureLink, steps
            };
            const response = await fetch('http://localhost:2800/api/recipe/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyString)
            });

            console.log(response);
        } catch (err: any) {
            console.error(err.message);
        }

        try {
            const recipeTitle = postData.title;
            for(var i=0; i<ingredientList.length; i++){
                var ingredientName = ingredientList.at(i)?.ingredientName
                var amount = ingredientList.at(i)?.amount
                var unit = ingredientList.at(i)?.unit

            const bodyString = {
                ingredientName, recipeTitle, amount, unit, 
            };
            const response = await fetch('http://localhost:2800/api/ingredientsInRecipe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyString)
            });
            window.location.assign('/api/recipe');
            console.log(response);
            }
        } catch (err: any) {
            console.error(err.message);
        }
        console.log(ingredientList);
    };

    return (
        <div className="createRecipePage">
            <form action="" onSubmit={submit}>
                <h3 className='sub_title'>Recipe</h3>
                <label className='label_recipeInput'>Recipe Title</label>
                <input type="input" id="title" name="title" className="input_recipe" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} required/>
                <label className='label_recipeInput'>Description</label>
                <textarea id="description" name="description" className="input_recipe" rows={10} cols={30} value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
                <label className='label_recipeInput'>Picture Link</label>
                <img src={postData.pictureLink} alt="" className="input_recipe"/>
                <input type="text" id="pictureLink" name="pictureLink" className="input_recipe" value={postData.pictureLink} onChange={(e) => setPostData({ ...postData, pictureLink: e.target.value })} />
                <label className='label_recipeInput'>Steps</label>
                <textarea id="steps" name="steps" className="input_recipe" rows={10} cols={30} value={postData.steps} onChange={(e) => setPostData({ ...postData, steps: e.target.value })} />

                {ingredientList.map((input, index) => {
                    return (
                        <div key={index} className="createIngredient">
                            <h3 className='sub_title'>Ingredient</h3>
                            <label className='label_recipeInput'>Ingredient Name:</label>
                            <input type="text" name="ingredientName" className="input_ingredient" value={input.ingredientName} onChange={(event) => handleFormChange(index, event)} />
                            <label className='label_recipeInput'>Amount</label>
                            <input type="number" name="amount" className="input_ingredient" value={input.amount} min={0} onChange={(event) => handleFormChange(index, event)} />
                            <label className='label_recipeInput'>Unit</label>
                            <input type="text" name="unit" className="input_ingredient" value={input.unit} onChange={(event) => handleFormChange(index, event)} />
                            <button className='remove_ingredient' onClick={() => removeIngredient(index)}>Remove Recipe</button>
                        </div>
                    );
                })}
            </form>
            <div className='button_recipe'>
            <button className='action_recipe' onClick={addIngredient}>Add Ingredient</button>
            <button className='action_recipe' onClick={submit}>Create Recipe</button>
            </div>
        </div>
    );
};

export default CreateNewRecipe;
