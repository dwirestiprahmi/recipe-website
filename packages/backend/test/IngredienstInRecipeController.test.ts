describe("Restful Ingredient In Recipe API tests for IngredientsInRecipeController", function(){
    const baseURL = "http://localhost:2800";
    var ingredientName;
    var recipeTitle;
    const request = require('supertest');
    const expect = require('chai').expect;
    const recipe = require('./testdata/recipe.json')
    const ingredient =require('./testdata/ingredient.json')
    const iir = require('./testdata/ingredientInRecipe.json')
    const iirUpdate = require('./testdata/ingredientInRecipeUpdate.json')
    const failIir = require('./testdata/failIngredientInRecipe.json')

    it("should create a temporary recipe in order to create ingredient in recipe", function(done){
        request(baseURL)
        .post('/api/recipe/create')
        .send(recipe)
        .set('Accept', 'application/json')
        .expect(function(res){
            console.log(res)
            res.body.title = recipe.title;
            res.body.description = recipe.description;
            res.body.pictureLink = recipe.pictureLink;
            res.body.steps = recipe.steps;
            res.body.rating = recipe.rating;
            recipeTitle = res.body.title
        })

        .expect(200, {
            "title": "Gulai Ayam (Padang-Style Chicken Curry)",
            "description": "Gulai Ayam is chicken with thick, red and spicy sauce. This dish originaly comes from Padang, West Sumatra, Indonesia. It is usually served with rice.", 
            "pictureLink": "https://img-global.cpcdn.com/recipes/2feda6847f8659f7/640x640sq70/photo.webp",
            "steps": "1. Marinate chicken with lime juice for 10 minutes. Blend garlic, shallot, candlenut, ginger, turmeric, cayenne pepper, cumin, coriander and 1 Tbsp water with food processor...",
            "rating": 5
        }, done);
    });

    it("should successfully create an ingredient using POST request", function(done){
        request(baseURL)
        .post('/api/ingredient/')
        .send(ingredient)
        .set('Accept', 'application/json')
        .expect(function(res){
            console.log(res)
            res.body.name = ingredient.name;
            res.body.description = ingredient.description;
            res.body.pictureLink = ingredient.pictureLink;
            ingredientName = res.body.name
        })
            .expect(200, {
            "name": "ribs",
            "description": "fresh ribs from farm",
            "pictureLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLYm19qUMfAJOWH9r5C-CiLl7ftSclqG8jLw&usqp=CAU"
        }, done);
    });


    it("should successfully create an ingredient in a recipe", function(done){
        request(baseURL)
        .post('/api/ingredientsInRecipe')
        .send(iir)
        .set('Accept', 'application/json')

        .expect(200, done);
    });

    it("should return status 200 to fetch the recipe of the provided ingredientName", function(done){
        request(baseURL)
            .get('/api/ingredientsInRecipe/' + ingredientName)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(200, done);
            
    });

    it("should update the amount and unit of the ingredient in the recipe of the provided recipe title and ingredient Name using PUT request", function(done){
        request(baseURL)
        .put('/api/ingredientsInRecipe/' + recipeTitle + "/" + ingredientName)
        .send(iirUpdate)
        .set('Accept', 'application/json')
        .expect(function(res){
            console.log(res)
            res.body.ingredientName = ingredientName;
            res.body.recipeTitle = recipeTitle;
            res.body.amount = iirUpdate.amount;
            res.body.unit = iirUpdate.unit;
        })

        .expect(200, {
            "ingredientName": "ribs",
            "recipeTitle": "Gulai Ayam (Padang-Style Chicken Curry)",
            "amount": 500,
            "unit": "gr"
        }, done);
    });

    it('should DELETE the ingredient in the recipe of the provided recipeTitle and ingredientName', (done) =>{
        request(baseURL)
            .delete('/api/ingredientsinrecipe/' + recipeTitle + "/" + ingredientName)
            .set('Accept', 'application/json')
            .end(function(err, res){
                expect(res.statusCode).to.be.equal(200);
                if(err){
                    throw err;
                }
                done();
            })
    })

    it('should show 400 status code for the deleted ingredient in a recipe', (done) =>{
    request(baseURL)
        .delete('/api/ingredientsinrecipe/' + recipeTitle + "/" + ingredientName)
        .set('Accept', 'application/json')
        .end(function(err, res){
            expect(res.statusCode).to.be.equal(400);
            if(err){
                throw err;
            }
            done();
        })
    })

    it("should NOT successfully create an ingredient in recipe with POST because recipe with the provided title is not created", function(done){
        request(baseURL)
        .post('/api/ingredientsinrecipe')
        .send(failIir)
        .set('Accept', 'application/json')
        .expect(400, done);
    })
})