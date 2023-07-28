import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterDiets, getDiets, getRecipes } from '../../../redux/actions';

const FilterDiets = () => {
    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets.map(diet => diet));

    const [selectedDiet, setSelectedDiet] = useState('');
    const [searchRecipe, setSearchRecipe] = useState('');

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    const handleOptionChange = (event) => {
        setSelectedDiet(event.target.value.toLowerCase());
    };

    const handleSearchChange = (event) => {
        setSearchRecipe(event.target.value.toLowerCase());
    };

    const handleClearSearch = () => {
        setSelectedDiet('');
        setSearchRecipe('');
        dispatch(getRecipes());
    };

    useEffect(() => {
        dispatch(filterDiets(selectedDiet, searchRecipe)); // Aplicamos ambos filtros
    }, [dispatch, selectedDiet, searchRecipe]);

    return (
        <div>
            <div className='SearchBar__results__container'>
                <div className="SearchBar__results">
                    {selectedDiet && (
                        <span>
                            {selectedDiet}
                            <button type="button" className="SearchBar__clearButton" onClick={handleClearSearch}>
                                x
                            </button>
                        </span>
                    )}
                </div>

                <div className="SearchBar__results">
                    {searchRecipe && (
                        <span>
                            {searchRecipe}
                            <button type="button" className="SearchBar__clearButton" onClick={handleClearSearch}>
                                x
                            </button>
                        </span>
                    )}
                </div>
            </div>

            <select name="" id="" value={selectedDiet} onChange={handleOptionChange}>
                <option value="">All Diets</option>
                {
                    diets?.map((diet) => (
                        <option key={diet} value={diet}>
                            {diet[0].toUpperCase() + diet.slice(1)}
                        </option>
                    ))
                }
            </select>
            <input
                type="text"
                value={searchRecipe}
                onChange={handleSearchChange}
                placeholder="Search..."
            />
        </div>
    );
};

export default FilterDiets;
