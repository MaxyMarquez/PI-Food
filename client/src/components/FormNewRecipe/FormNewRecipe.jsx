import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, postRecipe } from '../../redux/actions';
import './formNewRecipe.css'

const FormNewRecipe = () => {

    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets);

    const [recipeName, setRecipeName] = useState('');
    const [recipeSummary, setRecipeSummary] = useState('');
    const [recipeHealthScore, setRecipeHealthScore] = useState(0)
    const [recipeImage, setRecipeImage] = useState(null);
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState('');
    const [diet, setDiet] = useState([]);

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])

    const handleAddStep = () => {
        setSteps([...steps, currentStep]);
        setCurrentStep('');
    };

    const handleDiets = event => {
        if (event.target.checked) {
            setDiet([...diet, event.target.value]);
        } else {
            setDiet(diet.filter(diet => diet !== event.target.value))
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setRecipeImage(reader.result); // Establecer el estado recipeImage con la imagen en base64
            };
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Aquí creamos el objeto FormData y convertimos la imagen a base64
        const formData = new FormData();
        formData.append('name', recipeName);
        formData.append('image', recipeImage); // La imagen en base64
        formData.append('summary', recipeSummary);
        formData.append('healthScore', recipeHealthScore);
        formData.append('steps', JSON.stringify(steps));
        formData.append('diets', JSON.stringify(diet));

        try {
            // Envía el formulario al backend para crear la receta
            dispatch(postRecipe(formData));
            console.log(formData.image);
            // Limpia los campos después de enviar la receta
            setRecipeName('');
            setRecipeSummary('');
            setSteps([]);
            setCurrentStep('');
            setRecipeHealthScore(0);
            setDiet([]);
            setRecipeImage(null);
        } catch (error) {
            console.error('Error al crear la receta', error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>

            <div className='form__title'>
                <label className='form__label'>#Recipe Title:</label>
                <input
                    className='form__input'
                    type="text"
                    placeholder='Enter recipe name'
                    name="name" value={recipeName}
                    onChange={event => setRecipeName(event.target.value)}
                />
            </div>

            <label className='form__label'>Image</label>
            <input
                type="file"
                name="image"
                accept=".jpg,.png,.jpeg"
                onChange={handleImageChange}
            />

            <div className='form__title'>
                <label className='form__label'>#Recipe Summary:</label>
                <textarea
                    className='form__textarea'
                    placeholder='Enter recipe summary'
                    name="summary" value={recipeSummary}
                    onChange={event => setRecipeSummary(event.target.value)}
                />
            </div>

            <div className='form__title'>
                <label className='form__label'>#Steps:</label>
                <textarea
                    className='form__textarea'
                    value={currentStep}
                    onChange={event => setCurrentStep(event.target.value)}
                    placeholder="Ingrese un paso"
                />
                <button type='button' onClick={handleAddStep}>+ Add Step</button>

                <ul>
                    {steps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ul>
            </div>

            <div className='form__title'>
                <label className='form__label'>#Health Score: {recipeHealthScore}</label>
                <input
                    className='input__range'
                    type="range"
                    name="healthScore" value={recipeHealthScore}
                    onChange={event => setRecipeHealthScore(event.target.value)} />
            </div>

            <div className='form__title'>
                <label className='form__label'>#Diets</label>
                {
                    diets?.map(diet => (

                        <label key={diet} className='form__label'>
                            <input
                                type="checkbox"
                                name={diet}
                                value={diet}
                                onChange={event => handleDiets(event)}
                            /> {diet.charAt(0).toUpperCase() + diet.slice(1)}
                        </label>

                    ))
                }
            </div>

            <input type="submit" value="Submit" />

        </form>
    )
}

export default FormNewRecipe;