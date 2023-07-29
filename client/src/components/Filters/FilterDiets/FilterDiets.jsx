import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, getRecipes, searchRecipes, sortRecipes } from '../../../redux/actions';
import './filterDiets.css'

const FilterDiets = () => {
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets.map((diet) => diet));
    const selectedDiet = useSelector((state) => state.selectedDiet);
    const searchTerm = useSelector((state) => state.searchTerm);

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    const handleChange = (event) => {
        const selectedDiet = event.target.value.toLowerCase();
        dispatch(searchRecipes(searchTerm, selectedDiet));
    };

    const handleSortAlphaAsc = () => {
        dispatch(sortRecipes('alpha_asc'));
    };

    const handleSortAlphaDesc = () => {
        dispatch(sortRecipes('alpha_desc'));
    };

    const handleSortScoreAsc = () => {
        dispatch(sortRecipes('score_asc'));
    };

    const handleSortScoreDesc = () => {
        dispatch(sortRecipes('score_desc'));
    };

    const handleSortReset = () => {
        dispatch(getRecipes());
        dispatch(searchRecipes(searchTerm, selectedDiet));
    };

    return (
        <div>
            <select className='filter__select' name="" id="" value={selectedDiet} onChange={handleChange}>
                <option className='filter__option' value="">All Diets</option>
                {diets?.map((diet) => (
                    <option className='filter__option' key={diet} value={diet}>
                        {diet[0].toUpperCase() + diet.slice(1)}
                    </option>
                ))}
            </select>
            <button type="button" onClick={handleSortAlphaAsc}>
                Sort A-Z
            </button>
            <button type="button" onClick={handleSortAlphaDesc}>
                Sort Z-A
            </button>
            <button type="button" onClick={handleSortScoreAsc}>
                Health Score +
            </button>
            <button type="button" onClick={handleSortScoreDesc}>
                Health Score -
            </button>
            <button type="button" onClick={handleSortReset}>
                Reset Sort
            </button>
        </div>
    );
};

export default FilterDiets