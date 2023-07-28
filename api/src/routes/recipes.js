const router = require('express').Router();
const { getAllRecipes, getRecipeByID } = require('../controllers/getRecipes.js');


router.get('/', async (req, res) => {
    const { name } = req.query;
    console.log(name);
    try {
        const recipes = await getAllRecipes();

        if (name) {
            const filteredRecipes = await recipes.filter(recipe => recipe.title.toLowerCase().includes(name.toLowerCase()));
            res.json(filteredRecipes)
        } else {
            res.json(recipes);
        }
    } catch (error) {

    }
})

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
