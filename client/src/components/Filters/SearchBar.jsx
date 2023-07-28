import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRecipes, filterDiets } from '../../redux/actions';
import './searchBar.css';
import FilterDiets from './FilterDiets/FilterDiets';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false); // Nuevo estado para controlar si la búsqueda está en progreso

    const searchTerm = useSelector((state) => state.searchTerm);

    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Iniciar la carga al comenzar la búsqueda
        await dispatch(searchRecipes(title, searchTerm));
        setLoading(false); // Finalizar la carga cuando se obtengan los resultados
    };

    const handleClearSearch = () => {
        setTitle('');
        setLoading(false); // Si se borra el término de búsqueda, se puede detener la carga
        dispatch(searchRecipes('', ''));
    };

    return (
        <div className="SearchBar">
            <FilterDiets />
            <form onSubmit={handleSubmit}>
                <div className="SearchBar__inputContainer">
                    <input
                        className="SearchBar__input"
                        type="text"
                        value={title}
                        onChange={handleChange}
                        placeholder="Search..."
                    />
                    <button type="submit" className="SearchBar__searchButton">
                        Search
                    </button>
                </div>
            </form>
            {title && (
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
