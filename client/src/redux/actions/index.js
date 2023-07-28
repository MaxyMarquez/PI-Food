import axios from 'axios';

export const POST_RESPONSE = 'POST_RESPONSE';
export const GET_DIETS = 'GET_DIETS';
export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE_BY_ID = 'GET_RECIPE_BY_ID';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SEARCH_RECIPES = 'SEARCH_RECIPES'
export const SORT_RECIPES = 'SORT_RECIPES';

export const getRecipes = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get('http://localhost:3001/recipes')
            dispatch({
                type: GET_RECIPES,
                payload: {
                    recipes: data,
                    currentPage: 1,
                }
            });
        } catch (error) {

        }
    }
}

export const getRecipeByID = id => {
    return async dispatch => {
        try {
            dispatch({
                type: GET_RECIPE_BY_ID,
                payload: {}
            });

            const { data } = await axios.get(`http://localhost:3001/recipes/${id}`);

            dispatch({
                type: GET_RECIPE_BY_ID,
                payload: data
            });

        } catch (error) {
            console.error(error);
        }
    };
};

export const postRecipe = (info) => {
    return async (dispatch) => {
        try {
            // Creamos un nuevo FormData y agregamos la información necesaria
            const formData = new FormData();
            formData.append('name', info.name);
            formData.append('image', info.image); // La imagen en formato base64
            formData.append('summary', info.summary);
            formData.append('healthScore', info.healthScore);
            formData.append('steps', JSON.stringify(info.steps));
            formData.append('diets', JSON.stringify(info.diets));

            const response = await axios.post('http://localhost:3001/create_recipe', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Importante para enviar la imagen en formato FormData
                },
            });

            dispatch({
                type: POST_RESPONSE,
                payload: response.data,
            });
        } catch (error) {
            // Manejar el error aquí si es necesario
        }
    };
};

export const getDiets = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get('http://localhost:3001/diets');
            dispatch({
                type: GET_DIETS,
                payload: data
            });
        } catch (error) {
            console.error(error);
        }
    };
};

export const setCurrentPage = (page) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: page,
    };
};

export const searchRecipes = (searchTerm, selectedDiet) => {
    return async (dispatch) => {
        try {
            // Construimos la URL con los parámetros de búsqueda
            let url = 'http://localhost:3001/recipes';

            // Si hay un searchTerm, agregamos el parámetro de búsqueda a la URL
            if (searchTerm) {
                url += `?name=${searchTerm}`;
            }

            // Si hay un selectedDiet y ya hay un searchTerm en la URL, usamos el símbolo '&' para agregar el parámetro de dieta.
            // Si no hay searchTerm en la URL, usamos el símbolo '?' para agregar el primer parámetro.
            if (selectedDiet) {
                url += searchTerm ? `&diet=${selectedDiet.toLowerCase()}` : `?diet=${selectedDiet.toLowerCase()}`;
            }

            const { data } = await axios.get(url);

            dispatch({
                type: SEARCH_RECIPES,
                payload: {
                    recipes: data,
                    searchTerm: searchTerm,
                    selectedDiet: selectedDiet,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const sortRecipes = (orderBy) => {
    return {
        type: SORT_RECIPES,
        payload: orderBy,
    };
};




