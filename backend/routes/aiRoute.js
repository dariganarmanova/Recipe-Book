// aiRoute.jsconst express = require('express');
const express = require('express');
const router = express.Router();
const generateShoppingListWithOpenAI = require('./openAi');  // Adjust the path as needed

router.get('/recipe', async (req, res) => {
    const { recipeId, userId } = req.query;

    if (!recipeId || !userId) {
        return res.status(400).json({ message: "Recipe ID and User ID are required." });
    }

    try {
        // Find the recipe by its ID
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found." });
        }

        // Extract ingredients from the recipe
        const ingredients = recipe.ingredients;

        // Generate the shopping list using OpenAI
        let shoppingList;
        try {
            shoppingList = await generateShoppingListWithOpenAI(ingredients);
        } catch (error) {
            // Handle errors related to OpenAI
            return res.status(500).json({ message: "Failed to generate shopping list.", error: error.message });
        }

        // Send a successful response
        res.status(200).json({
            ingredients,
            shoppingList
        });

    } catch (error) {
        // Handle errors related to fetching the recipe
        res.status(500).json({ message: "Couldn't fetch the recipe.", error: error.message });
    }
});

module.exports = router;
