import Search from './models/Search';
import Recipe from './models/Recipe';
import ShoppingList from './models/ShoppingList';
import FavoriteList from './models/FavoriteList';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingListView from './views/shoppingListView';
import * as favoriteListView from './views/favoriteListView'
import * as base from './views/base';

/* Global sate of the app
* - Search object
* - Current recipe object
* - Shopping list object
*/
const state = {};

const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();

    if (query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for the result
        searchView.clearInput();
        searchView.clearSearchRes();
        base.renderLoader(base.UIElements.searchRes);

        // 4. Search for recipes
        try{
            await state.search.getResults();
    
            // 5. Render results on UI
            base.loaderFinished();
            searchView.renderResults(state.search.result);
        } catch(error) {
            alert(error);
            base.loaderFinished();
        }
    }
}

base.UIElements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

base.UIElements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearSearchRes();
        searchView.renderResults(state.search.result, goToPage);
    }
});

const controlRecipe = async (recipeID) => {
    // 1. new recipe object and add to state
    let isLiked = false;
    if(state.favoriteList) {
        isLiked = state.favoriteList.isLiked(recipeID);
    }

    state.recipe = new Recipe(recipeID, isLiked);
    //console.log(isLiked);

    // 2. Prepare UI to print the result
    recipeView.clearRecipeView();

    recipeView.highlightSelected(recipeID);

    // 3. Get recipe from API
    base.renderLoader(base.UIElements.recipeDataView);
    
    try{
        await state.recipe.getRecipe();
        base.loaderFinished();

        // 4. Render recipe on UI
        recipeView.renderRecipe(state.recipe);
    } catch(error) {
        alert(error);
        base.loaderFinished();
    }
}

['hashchange', 'load'].forEach(event => {
    window.addEventListener(event, e => {
        const recipeID = window.location.hash.replace('#', '');
        if(recipeID) {
            controlRecipe(recipeID);
        }
    });    
});

// Get recipe by taking the href and get the recipe
// Trash
/* base.UIElements.searchResList.addEventListener('click', e => {
    const choseRecipe = e.target.closest('.results__link');

    if(choseRecipe) {console.log(choseRecipe.href);
        const recipeHref = choseRecipe.href;
        const recipeID = recipeHref.slice(recipeHref.indexOf('#') + 1, recipeHref.length);

        controlRecipe(recipeID);
    }
}); */

// Handling recipe button click
base.UIElements.recipeDataView.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if(state.recipe.recipeData.servings > 1) {
            state.recipe.calcServings('dec');
            recipeView.updateServingsView(state.recipe.recipeData);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.calcServings('inc');
        recipeView.updateServingsView(state.recipe.recipeData);
    }
});

const controlShoppingList = () => {
    // 1. new shoppingList object and add to the state
    if(!state.shoppingList) {
        state.shoppingList = new ShoppingList();
    }

    // 2. add gredient to the shoppingList
    if(state.shoppingList.items.length === 0) {
        state.recipe.recipeData.extendedIngredients.forEach(el => state.shoppingList.addItem(el.name, el.amount, el.unit));
    
        shoppingListView.renderShoppingList(state.shoppingList.items);
    } else {
        // update the shopping list
    }
}

base.UIElements.recipeDataView.addEventListener('click', e => {
    if (e.target.matches('.add__shopping__list, .add__shopping__list *')) {
        controlShoppingList();
    }
});

base.UIElements.shoppingListView.addEventListener('click', e => {
    const btn = e.target.closest('.shopping__delete');

    if(btn) {
        const itemID = btn.parentNode.dataset.itemid;
        state.shoppingList.deleteItem(itemID);
        shoppingListView.deleteItemView(itemID);
    }
});

base.UIElements.shoppingListView.addEventListener('click', e => {
    const btn = e.target.closest('.shopping__count--value');

    if(btn) {
        const newVal = parseInt(btn.value, 10);
        const itemID = btn.parentNode.parentNode.dataset.itemid;

        state.shoppingList.updateCount(itemID, newVal);
    }
});

const controlFavoriteList = recipe => {

    // 2. add recipe to favoriteList if it not exist now in the list
    let isLiked = state.favoriteList.isLiked(recipe.recipeID);
    if(!isLiked) {
        // Add like to the state && add like to UI list
        const item = state.favoriteList.addFavoriteRecipe(recipe.recipeID, recipe.recipeData.image, recipe.recipeData.title);
        favoriteListView.renderNewItem(item);

        // Toggle the like button
        isLiked = true;
        favoriteListView.toggleLikeBtn(isLiked);
        //console.log('like');
    } else {
        // Remove like from the state && remove like from UI list
        state.favoriteList.removeFavoriteRecipe(recipe.recipeID);
        favoriteListView.removeItem(recipe.recipeID);

        // Toggle the like button
        isLiked = false;
        favoriteListView.toggleLikeBtn(isLiked);

        //console.log('unlike');
    }

    favoriteListView.toggleLikeMenu(state.favoriteList.getNumLikes());
};

base.UIElements.recipeDataView.addEventListener('click', e => {
    const btn = e.target.closest('.recipe__love');

    if(btn) {
        controlFavoriteList(state.recipe);
    }
})

window.addEventListener('load', () => {
    state.favoriteList = new FavoriteList();

    // Restore favorite
    state.favoriteList.readStorage();

    // Toggle lilke button
    favoriteListView.toggleLikeMenu(state.favoriteList.getNumLikes());

    // Render existing favorite recipe 
    state.favoriteList.favoriteList.forEach(el => favoriteListView.renderNewItem(el));    
})