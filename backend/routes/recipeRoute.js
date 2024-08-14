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

router.post('/home', async (req, res) => {
    const { userId, ingredients } = req.body;
    const newIngredient = new Recipe({
        userId,
        ingredients
    });
    try {
        const savedIngredient = await newIngredient.save();
        res.status(201).json(savedIngredient);
    } catch (error) {
        res.status(500).json({ message: "Couln't create the item", error });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(deletedItem);
    } catch (error) {
        res.status(500).json({ message: "Could not delete the item", error });

    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { ingredients } = req.body;
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            { ingredients },
            { new: true } // Ensure `new` is included in options
        );
        if (!updatedRecipe) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: "Error updating the item", error });
    }
});

module.exports = router;