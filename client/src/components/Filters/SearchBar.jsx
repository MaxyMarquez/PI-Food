import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchRecipes } from '../../redux/actions';
import './searchBar.css'; // Importar el archivo CSS
import FilterDiets from './FilterDiets/FilterDiets';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [showResults, setShowResults] = useState(false);

    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title !== '') {
            dispatch(searchRecipes(title));
            setShowResults(true);
        }

    };

    const handleClearSearch = () => {
        setTitle('');
        setShowResults(false);
        dispatch(searchRecipes(''));
    };

    return (
        <div className="SearchBar">
            <FilterDiets />
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="SearchBar__inputContainer">
                    <input
                        className='SearchBar__input'
                        type="text"
                        value={title}
                        onChange={(event) => handleChange(event)}
                        placeholder='Search...' />
                    <button type="submit" className="SearchBar__searchButton">Search</button>
                </div>
            </form>
            {showResults && title && (
                <div className="SearchBar__results">
                    <span>{title}</span>
                    <button type="button" className="SearchBar__clearButton" onClick={handleClearSearch}>
                        x
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchBar;


