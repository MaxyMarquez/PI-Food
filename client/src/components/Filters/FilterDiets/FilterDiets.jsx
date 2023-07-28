import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, searchRecipes, sortRecipes } from '../../../redux/actions';

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

    const handleClearSearch = () => {
        dispatch(searchRecipes('', ''));
    };

    const handleSortAsc = () => {
        dispatch(sortRecipes('asc'));
    };

    const handleSortDesc = () => {
        dispatch(sortRecipes('desc'));
    };

    const handleSortReset = () => {
        dispatch(sortRecipes(''));
    };

    return (
        <div>
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
            <select name="" id="" value={selectedDiet} onChange={handleChange}>
                <option value="">All Diets</option>
                {diets?.map((diet) => (
                    <option key={diet} value={diet}>
                        {diet[0].toUpperCase() + diet.slice(1)}
                    </option>
                ))}
            </select>
            <button type="button" onClick={handleSortAsc}>
                Sort A-Z
            </button>
            <button type="button" onClick={handleSortDesc}>
                Sort Z-A
            </button>
            <button type="button" onClick={handleSortReset}>
                Reset Sort
            </button>
        </div>
    );
};

export default FilterDiets