import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getRecipeByID } from '../../redux/actions';
import './recipeDetail.css'
import LoadingPage from '../LoadingPage/LoadingPage';

const RecipeDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const recipe = useSelector(state => state.recipeDetail);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getRecipeByID(id))
            .then(() => setLoading(false)) // Establecer loading en false después de obtener los datos
            .catch(() => setLoading(false)); // En caso de error, también establecer loading en false
    }, [dispatch, id]);
    return (
        <div>
            {
                loading ? (
                    <LoadingPage />
                ) : (
                    <div className='recipe-detail__container'>
                        <div className='recipe-detail__title__container'>
                            <div className='recipe-detail__title__img'>
                                <img src={recipe.image} alt="" />
                            </div>
                            <h2><span>{recipe.title}</span></h2>
                        </div>
                        <div className='recipe-detail__summary'>
                            <p>{recipe.summary?.replace(/<[^>]*>/g, '')}</p>
                        </div>
                        <div>
                            <div>
                                {
                                    recipe.steps?.map((step, index) => (
                                        <ul key={index}>
                                            <li>{index + 1} - {step}</li>
                                        </ul>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>

    )
}

export default RecipeDetail