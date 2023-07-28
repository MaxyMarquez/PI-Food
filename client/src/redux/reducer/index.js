import { GET_DIETS, GET_RECIPES, GET_RECIPE_BY_ID, POST_RESPONSE, SET_CURRENT_PAGE, SEARCH_RECIPES, SORT_RECIPES } from "../actions";

const initialState = {
    recipes: [],
    recipeDetail: {},
    diets: [],
    currentPage: 1,
    response: null,
    isLoading: true,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload.recipes,
                currentPage: action.payload.currentPage,
                isLoading: false,
            }
        case GET_RECIPE_BY_ID:
            return {
                ...state,
                recipeDetail: action.payload,
                isLoading: false,
            }
        case POST_RESPONSE:
            return {
                ...state,
                response: action.payload,
            }
        case GET_DIETS: {
            return {
                ...state,
                diets: action.payload,
            }
        }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            }
        case SEARCH_RECIPES:
            return {
                ...state,
                recipes: action.payload.recipes,
                searchTerm: action.payload.searchTerm,
                selectedDiet: action.payload.selectedDiet,
                isLoading: false,
            };

        case SORT_RECIPES:
            const { recipes } = state;
            const orderBy = action.payload;
            let sortedRecipes = [];

            if (orderBy === 'asc') {
                sortedRecipes = [...recipes].sort((a, b) => a.title.localeCompare(b.title));
            } else if (orderBy === 'desc') {
                sortedRecipes = [...recipes].sort((a, b) => b.title.localeCompare(a.title));
            } else {
                sortedRecipes = recipes;
            }

            return {
                ...state,
                recipes: sortedRecipes,
            };

        default:
            return state;
    }
}

export default rootReducer;