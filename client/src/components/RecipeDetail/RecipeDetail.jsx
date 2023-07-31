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
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [dispatch]);

    return (
        <div className='recipe-detail__container'>
            {
                loading ? (
                    <LoadingPage />
                ) : (
                    <div >
                        <div className='recipe-detail__title'>
                            <h2>{recipe.title}</h2>
                        </div>

                        <span className='recipe__line'></span>

                        <div className='recipe-detail__header'>
                            <div className='recipe-detail__img'>
                                <img src={recipe.image} alt="" />
                            </div>

                            <div className='recipe-detail__summary'>
                                <h2>Summary</h2>
                                <p>{recipe.summary?.replace(/<[^>]*>/g, '')}</p>
                            </div>
                        </div>

                        <span className='recipe__line'></span>

                        <div className='recipe-detail__steps'>
                            <h2>Steps</h2>
                            <ul>
                                {recipe.steps?.map((step, index) => (
                                    <li key={index}>
                                        <span className='step-number'>{index + 1} -</span> {step}</li>
                                ))}
                            </ul>
                        </div>

                        <span className='recipe__line'></span>

                        <div>
                            {recipe.ingredients?.map(ingredient => (
                                <li>{ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</li>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>

    )
}

export default RecipeDetail