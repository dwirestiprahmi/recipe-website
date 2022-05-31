import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const AddIngredient = () => {
  
  const [ingredientList, setIngredientList] = useState([{ ingredientName: '', recipeTitle: '', amount: '', unit: '' }]);

  const {title, ingredientName} : {title:string, ingredientName:string} = useParams();

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
            const recipeTitle = title;
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
  }
  
  
  return (
    <div>
      <h1 className='page_title'>Add new Ingredient</h1>
      <form action="" onSubmit={submit}>
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
            <button className='action_recipe' onClick={submit}>Submit</button>
          </div>
    </div>
  )
}

export default AddIngredient