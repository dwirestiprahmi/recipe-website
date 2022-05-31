import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import RecipePage from './components/RecipePage';
import SearchBar from './components/SearchBarPage';
import FindByIngredient from './components/FindByIngredient';
import SearchBarPage from './components/SearchBarPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RecipeDetails from './components/RecipeDetails';
import RecipeIngredientPage from './components/RecipeIngredientPage';
import CreateNewRecipe from './components/CreateNewRecipe';
import IngredientDetails from './components/IngredientDetails';
import AddIngredientToRecipe from './components/AddIngredientToRecipe';

const App: React.FC = () => {
    const [recipe, setRecipe] = useState('');

    return (
        <Router>
            <div className="App">
                <Nav />
                <Switch>
                    <Route path="/api/recipe" exact component={RecipePage} />
                    <Route path="/api/ingredient/:ingredientName" exact component={IngredientDetails} />
                    <Route path="/api/recipe/create/" component={CreateNewRecipe}/>
                    <Route path="/api/recipe/details/:title" component={RecipeDetails} />
                    <Route path="/api/recipe/ingredient" exact component={FindByIngredient} />
                    <Route path="/api/recipe/search/ingredient/:ingredientName" component={RecipeIngredientPage} />
                    <Route path="/api/recipe/result/:title" exact component={SearchBarPage}></Route>
                    <Route path="/api/recipe/add/ingredient/:title" component={AddIngredientToRecipe} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
