// openaiService.js

const { OpenAI } = require('openai');  // Import the OpenAI library

// Initialize OpenAI client with your API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,  // Ensure this is set in your environment variables
});

// Function to generate a shopping list based on ingredients
const generateShoppingListWithOpenAI = async (ingredients) => {
    try {
        const prompt = `Generate a shopping list based on the following ingredients: ${ingredients}`;

        const response = await openai.completions.create({
            model: "text-davinci-003",  // Specify the model you want to use
            prompt,
            max_tokens: 150,  // Adjust the token count as needed
        });

        return response.choices[0].text.trim();  // Extract and return the text

    } catch (error) {
        console.error("Error generating shopping list with OpenAI:", error);
        throw new Error("Failed to generate shopping list.");
    }
};

module.exports = generateShoppingListWithOpenAI;
