// const requestIngredient = require('supertest')
// const expectIng = require('chai').expect;
// const ingredient = require('./testdata/ingredient.json')
// const ingredientUpdate = require('./testdata/updatedIngredient.json')
// describe("Restful Ingredient API tests for IngredientController", function(){
//     const baseURL = "http://localhost:2800";
//     var ingredientName;
//     it("should successfully create an ingredient using POST request", function(done){
//         requestIngredient(baseURL)
//         .post('/api/ingredient/')
//         .send(ingredient)
//         .set('Accept', 'application/json')
//         .expectIng(function(res){
//             console.log(res)
//             res.body.name = ingredient.name;
//             res.body.description = ingredient.description;
//             res.body.pictureLink = ingredient.pictureLink;
//             ingredientName = res.body.name
//         })

//         .expectIng(200, {
//             "name": "ribs",
//             "description": "fresh ribs from farm",
//             "pictureLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLYm19qUMfAJOWH9r5C-CiLl7ftSclqG8jLw&usqp=CAU"
//         }, done);
//     });

//     it("should fetch the ingredient of the provided ingredientName using GET request", function(done){
//         requestIngredient(baseURL)
//             .get('/api/ingredient/' + ingredientName)
//             .set('Accept', 'application/json')
//             .set('Content-Type', 'application/json')
//             .end(function(err,res){
//                 expectIng(res.statusCode).to.be.equal(200);
//                 expectIng(res.body.name).to.be.equal(ingredient.name);
//                 expectIng(res.body.description).to.be.equal(ingredient.description);
//                 expectIng(res.body.pictureLink).to.be.equal(ingredient.pictureLink);
//             if(err){
//                 throw err;
//             }
//             done();
//             });
            
//     });

//     it("should update the ingredient of the provided ingredient using PUT request", function(done){
//         requestIngredient(baseURL)
//         .put('/api/ingredient/' + ingredientName)
//         .send(ingredientUpdate)
//         .set('Accept', 'application/json')
//         .expectIng(function(res){
//             console.log(res)
//             res.body.name = ingredientUpdate.name;
//             res.body.description = ingredientUpdate.description;
//             res.body.pictureLink = ingredientUpdate.pictureLink;
//             ingredientName = res.body.name
//         })

//         .expectIng(200, {
//             "name": "ribs",
//             "description": "fresh cow ribs from farm",
//             "pictureLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLYm19qUMfAJOWH9r5C-"

//         }, done);
//     });

//     it('should DELETE the ingredient of the provided ingredientName', (done) =>{
//         requestIngredient(baseURL)
//             .delete('/api/ingredient/' + ingredientName)
//             .set('Accept', 'application/json')
//             .end(function(err, res){
//                 expectIng(res.statusCode).to.be.equal(204);
//                 if(err){
//                     throw err;
//                 }
//                 done();
//             })
//     })

//     it('should show 404 status code for the deleted recipeTitle', (done) =>{
//         requestIngredient(baseURL)
//         .delete('/api/ingredientName/' + ingredientName)
//         .set('Accept', 'application/json')
//         .end(function(err, res){
//             expectIng(res.statusCode).to.be.equal(404);
//             if(err){
//                 throw err;
//             }
//             done();
//         })
//     })

//     // it("should NOT successfully create a recipe", function(done){
//     //     request(baseURL)
//     //     .post('/api/recipe/create')
//     //     .send(recipe)
//     //     .set('Accept', 'application/json')
//     //     .expect(function(res){
//     //         console.log(res)
//     //         res.body.title = recipe.title;
//     //         res.body.description = recipe.description;
//     //         res.body.pictureLink = recipe.pictureLink;
//     //         res.body.steps = recipe.steps;
//     //         res.body.rating = recipe.rating;
//     //         recipeTitle = res.body.title
//     //     })

//     //     .expect(200, {
//     //         "title": "Gulai Ayam (Padang-Style Chicken Curry)",
//     //         "description": "Gulai Ayam is chicken with thick, red and spicy sauce. This dish originaly comes from Padang, West Sumatra, Indonesia. It is usually served with rice.", 
//     //         "pictureLink": "https://img-global.cpcdn.com/recipes/2feda6847f8659f7/640x640sq70/photo.webp",
//     //         "steps": "1. Marinate chicken with lime juice for 10 minutes. Blend garlic, shallot, candlenut, ginger, turmeric, cayenne pepper, cumin, coriander and 1 Tbsp water with food processor...",
//     //         "rating": 5
//     //     }, done);
//     // });

// })