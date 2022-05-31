import React, { Fragment, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
const EditRecipe = ({ recipe }: any) => {
    console.log(recipe);
    const [recipeTitle, setRecipeTitle] = useState(recipe.title);
    const [description, setDescription] = useState(recipe.description);
    const [pictureLink, setPictureLink] = useState(recipe.pictureLink);
    const [steps, setRecipeSteps] = useState(recipe.steps);
    const [rating, setRecipeRating] = useState(recipe.rating);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //edit description function

    const updateDescription = async (e: any) => {
        e.preventDefault();
        try {
            const body = { recipeTitle, description, pictureLink, steps, rating };
            const response = await fetch(`http://localhost:2800/api/recipe/${recipe.title}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            console.log(response);
            window.location.assign('/api/recipe');
        } catch (err: any) {
            console.error(err.message);
        }
    };

    const reset = () => {
        setRecipeTitle(recipe.recipeTitle);
        setDescription(recipe.description);
        setPictureLink(recipe.pictureLink);
        setRecipeSteps(recipe.steps);
        setRecipeRating(recipe.rating);
        handleClose();
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Edit Recipe</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div className="editForm">
                    <label htmlFor="">Recipe Title</label>
                      <input type="text" className='input_edit' value={recipeTitle} onChange={(e) => setRecipeTitle(e.target.value)} />
                      <label htmlFor="">Description</label>
                      <input type="text" className='input_edit' value={description} onChange={(e) => setDescription(e.target.value)} />
                      <label htmlFor="">Picture Link</label>
                      <input type="text" className='input_edit' value={pictureLink} onChange={(e) => setPictureLink(e.target.value)} />
                      <label htmlFor="">Steps</label>
                      <input type="text" className='input_edit' value={steps} onChange={(e) => setRecipeSteps(e.target.value)} />
                  </div>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={updateDescription}>
                      Edit
                  </Button>
                  <Button variant="primary" onClick={reset}>
                      Close
                  </Button>
              </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditRecipe;
