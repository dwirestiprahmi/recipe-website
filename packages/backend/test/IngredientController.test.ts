
describe("Restful Ingredient API tests for IngredientController", function(){
    const baseURL = "http://localhost:2800";
    var ingredientName;
    const request = require('supertest')
    const expect = require('chai').expect;
    const ingredient = require('./testdata/ingredient.json')
    const ingredientUpdate = require('./testdata/updatedIngredient.json')
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

    it("should fetch the ingredient of the provided ingredientName using GET request", function(done){
        request(baseURL)
            .get('/api/ingredient/' + ingredientName)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err,res){
                expect(res.statusCode).to.be.equal(200);
            if(err){
                throw err;
            }
            done();
            });
            
    });

    it("should update the ingredient of the provided ingredient using PUT request", function(done){
        request(baseURL)
        .put('/api/ingredient/' + ingredientName)
        .send(ingredientUpdate)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .expect(function(res){
            console.log(res)
            res.body.name = ingredientUpdate.name;
            res.body.description = ingredientUpdate.description;
            res.body.pictureLink = ingredientUpdate.pictureLink;
            ingredientName = res.body.name
        })

        .expect(200, {
            "name": "ribs",
            "description": "fresh cow ribs from farm",
            "pictureLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLYm19qUMfAJOWH9r5C-"

        }, done);
    });

    it('should DELETE the ingredient of the provided ingredientName', (done) =>{
        request(baseURL)
            .delete('/api/ingredient/' + ingredientName)
            .set('Accept', 'application/json')
            .end(function(err, res){
                expect(res.statusCode).to.be.equal(200);
                if(err){
                    throw err;
                }
                done();
            })
    })

    it('should show 404 status code for the deleted recipeTitle', (done) =>{
        request(baseURL)
        .delete('/api/ingredientName/' + ingredientName)
        .set('Accept', 'application/json')
        .end(function(err, res){
            expect(res.statusCode).to.be.equal(404);
            if(err){
                throw err;
            }
            done();
        })
    })
})