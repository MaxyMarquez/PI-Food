import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, getRecipes, searchRecipes, sortRecipes } from '../../../redux/actions';
import './filterDiets.css'

const FilterDiets = () => {
    const dispatch = useDispatch();

    const [alphaSort, setAlphaSort] = useState('default');
    const [scoreSort, setScoreSort] = useState('default');
    const [isCreated, setIsCreated] = useState('default');

    const diets = useSelector((state) => state.diets.map((diet) => diet));
    const searchTerm = useSelector((state) => state.searchTerm);
    const selectedDiet = useSelector((state) => state.selectedDiet);

    useEffect(() => {
        dispatch(getDiets());
        dispatch(sortRecipes(alphaSort));
        dispatch(sortRecipes(scoreSort));
        dispatch(searchRecipes(searchTerm, selectedDiet, isCreated));
    }, [dispatch, alphaSort, scoreSort, isCreated]);

    const handleChange = (event) => {
        const selectedDiet = event.target.value.toLowerCase();
        dispatch(searchRecipes(searchTerm, selectedDiet));
    };

    // const handleIsCreated = event => {
    //     // Se pasa true como tercer parámetro
    // };


    const handleSortReset = () => {
        setAlphaSort('default');
        setScoreSort('default');
        setIsCreated('default')
        dispatch(searchRecipes(searchTerm, selectedDiet));
    };

    return (
        <div className='filter__container'>
            <label htmlFor="">Diet:</label>
            <select className='filter__select' name="" id="" value={selectedDiet} onChange={handleChange}>
                <option value="">All Diets</option>
                {diets?.map((diet) => (
                    <option key={diet} value={diet}>
                        {diet[0].toUpperCase() + diet.slice(1)}
                    </option>
                ))}
            </select>

            <label htmlFor="">Order:</label>
            <select
                className='filter__select'
                value={alphaSort}
                name="select" id=""
                onChange={event => setAlphaSort(event.target.value)}
            >
                <option value='default'>Select a Option</option>
                <option value="alpha_asc">Ascendant</option>
                <option value="alpha_desc">Descendant</option>
            </select>

            <label htmlFor="">Health Score:</label>
            <select
                className='filter__select'
                value={scoreSort}
                name="" id=""
                onChange={event => setScoreSort(event.target.value)}
            >
                <option value='default'>Select a Option</option>
                <option value="score_asc">Ascendant</option>
                <option value="score_desc">Descendant</option>
            </select>

            <label htmlFor="">Created By:</label>
            <select
                className='filter__select'
                value={isCreated}
                name="" id=""
                onChange={event => setIsCreated(event.target.value)}
            >
                <option value='default'>Select a Option</option>
                <option value="created">Users</option>
                <option value="notCreated">Default</option>
            </select>

            {/* <button type="button" onClick={handleCreated}>
                Created
            </button>
            <button type="button" onClick={handleNotCreated}>
                Not Created
            </button> */}
            <button className='filter__button-reset' type="button" onClick={handleSortReset}>
                Reset Sort
            </button>
        </div>
    );
};

export default FilterDiets