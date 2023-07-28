const { Recipe, Diet } = require('../db');
const fs = require('fs');

const createRecipe = async (req, res) => {
    try {
        const { name, image, summary, healthScore, steps, diets } = req.body;

        if (!image) {
            return res.status(400).json({ message: 'Imagen no encontrada en req.body' });
        }

        // Decodificar la imagen base64 en un Buffer
        const imageBuffer = Buffer.from(image.split(';base64,').pop(), 'base64');

        const newRecipe = await Recipe.create({
            name,
            image: imageBuffer, // Guardar el Buffer en la columna de imagen
            summary,
            healthScore,
            steps,
        });


        const addDietsToDb = await Diet.findAll({
            where: {
                name: diets,
            }
        });

        await newRecipe.addDiet(addDietsToDb);

        res.send(newRecipe);
    } catch (error) {
        console.error(error);
    }
}

module.exports = createRecipe;
