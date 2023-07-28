import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, setCurrentPage } from '../../redux/actions';
import Card from '../Card/Card';
import './pagination.css';

const Pagination = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);
    const currentPage = useSelector(state => state.currentPage);
    const totalRecipes = recipes.length;
    const itemsPerPage = 9;
    const totalPages = Math.ceil(totalRecipes / itemsPerPage);

    useEffect(() => {
        dispatch(getRecipes());
        dispatch(setCurrentPage(1));
    }, [dispatch]);

    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page));
    };

    const renderItemsForCurrentPage = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalRecipes);
        return recipes.slice(startIndex, endIndex).map((recipe) => (
            <Card
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                image={recipe.image}
                diets={recipe.diets}
            />
        ));
    };

    const renderPagination = () => {
        const paginationButtons = [];
        const maxButtons = 5;

        let startPage;
        let endPage;

        if (currentPage <= maxButtons - 2) {
            startPage = 1;
            endPage = Math.min(maxButtons, totalPages);
        } else if (currentPage >= totalPages - 2) {
            startPage = Math.max(totalPages - maxButtons + 1, 1);
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }

        if (startPage !== 1) {
            paginationButtons.push(
                <button key={1} onClick={() => handlePageChange(1)}>
                    1
                </button>
            );
            if (startPage > 2) {
                paginationButtons.push(
                    <span key="ellipsis_1" className="ellipsis">...</span>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationButtons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={currentPage === i ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }

        if (endPage !== totalPages) {
            if (endPage < totalPages - 1) {
                paginationButtons.push(
                    <span key="ellipsis_2" className="ellipsis">...</span>
                );
            }
            paginationButtons.push(
                <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                </button>
            );
        }
        return paginationButtons;
    };

    return (
        <div>
            <div className="items-container">
                {renderItemsForCurrentPage()}
            </div>
            <div className="pagination">
                <button
                    className="button-pagination prev"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                </button>
                {renderPagination()}
                <button
                    className="button-pagination next"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                </button>
            </div>
        </div>
    );
};

export default Pagination;
