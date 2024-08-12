const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    ingredients: [{ type: String, required: true }],
})

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = { Recipe };