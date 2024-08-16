const express = require('express');
const { Recipe } = require('../models/recipe');
const { RouterContext } = require('next/dist/shared/lib/router-context.shared-runtime');
const router = express.Router();

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const recipes = await Recipe.find({ userId });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Cannot get the item", error });
    }
});

router.post('/', async (req, res) => {
    const { userId, ingredients } = req.body;
    if (!userId || !ingredients) {
        return res.status(400).json({ message: "User ID and ingredients are required" });
    }
    const newRecipe = new Recipe({
        user: userId,
        ingredients
    });
    try {
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
        res.redirect(`/recipe?recipeId=${savedRecipe._id}&userId=${userId}`);
    } catch (error) {
        res.status(500).json({ message: "Couldn't create the item", error });
    }
});
module.exports = router;