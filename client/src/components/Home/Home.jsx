import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../../redux/actions';
import Pagination from '../Pagination/Pagination';
import LoadingPage from '../LoadingPage/LoadingPage';
import SearchBar from '../Filters/SearchBar'
import './home.css'

const Home = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.isLoading);

    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]);

    return (
        <div className='home__container'>
            {
                loading ? (
                    <LoadingPage />
                ) : (
                    <div>
                        <SearchBar />
                        <Pagination />
                    </div>
                )
            }
        </div>
    )
}

export default Home;