import axios from 'axios';
import * as baseConfig from './baseConfig';

export default class Recipe {
    constructor(recipeID, isLiked) {
        this.recipeID = recipeID;
        this.isLiked = isLiked;
    }

    async getRecipe () {
        try{
            const res = await axios.get(`https://api.spoonacular.com/recipes/${this.recipeID}/information?apiKey=${baseConfig.APICall.APIKey}&includeNutrition=false`);

            this.recipeData = res.data;
            //console.log(this.recipeData);
        } catch (error) {
            alert(error);
        }
    }

    calcServings (type) {
        // Servings
        const newServings = type === 'inc' ? this.recipeData.servings + 1 :  this.recipeData.servings - 1; 

        //Ingredients
        this.recipeData.extendedIngredients.forEach(cur => cur.amount *= newServings / this.recipeData.servings);

        this.recipeData.servings = newServings;
    }
};