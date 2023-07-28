const router = require('express').Router();
const { getAllRecipes, getRecipeByID } = require('../controllers/getRecipes.js');


router.get('/', async (req, res) => {
    const { name, diet } = req.query;
    try {
        let recipes = await getAllRecipes();

        // Aplicamos el filtro por nombre si se proporciona el parámetro 'name'
        if (name) {
            recipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(name.toLowerCase()));
        }

        // Aplicamos el filtro por dieta si se proporciona el parámetro 'diet'
        if (diet) {
            recipes = recipes.filter((recipe) => recipe.diets.includes(diet.toLowerCase()));
        }

        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await getRecipeByID(id);
        res.json(recipe);
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;
