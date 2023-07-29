const router = require('express').Router();
const { getRecipeByID, getFilteredRecipes } = require('../controllers/getRecipes.js');

// Ruta GET que devuleve todas las recetas, y tambien filtra por nombre y dieta. 
router.get('/', async (req, res) => {
    const { name, diet } = req.query;
    try {
        const recipes = await getFilteredRecipes(name, diet);

        res.json(recipes);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Ruta GET que devuelve una receta filtrada por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await getRecipeByID(id);
        res.json(recipe);
    } catch (error) {
        res.status(400).json({ error: 'Internal server error' });
    }
})

module.exports = router;
