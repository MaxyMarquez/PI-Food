import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getRecipeByID } from '../../redux/actions';
import './recipeDetail.css'
import LoadingPage from '../LoadingPage/LoadingPage';

const RecipeDetail = () => {
    const dispatch = useDispatch();

    const { id } = useParams();
    const recipe = useSelector(state => state.recipeDetail);
    const loading = useSelector(state => state.isLoading);

    console.log(recipe === null);
    console.log(<LoadingPage />);
    useEffect(() => {
        dispatch(getRecipeByID(id))
    }, [dispatch]);

    return (
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

export default RecipeDetail