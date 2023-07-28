import { GET_DIETS, GET_RECIPES, GET_RECIPE_BY_ID, POST_RESPONSE, SET_CURRENT_PAGE, SEARCH_RECIPES, FILTERS } from "../actions";

const initialState = {
    recipes: [],
    recipesCopy: [],
    recipeDetail: {},
    searchRecipe: '',
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
                recipesCopy: action.payload.recipes,
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
                recipes: action.payload,
            }
        case FILTERS:
            const { recipesCopy } = state;
            const selectedDiet = action.payload.diet.toLowerCase();
            const searchRecipe = action.payload.searchRecipe.toLowerCase();

            const filteredRecipes = recipesCopy.filter(recipe => {
                const dietMatch = selectedDiet === '' || recipe.diets.includes(selectedDiet);
                const nameMatch = recipe.title.toLowerCase().includes(searchRecipe);
                return dietMatch && nameMatch;
            });

            return {
                ...state,
                recipes: filteredRecipes,
            };
        default:
            return state;
    }
}

export default rootReducer;