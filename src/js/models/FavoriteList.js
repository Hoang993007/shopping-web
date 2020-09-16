export default class FavoriteList {
    constructor () {
        this.favoriteList = [];
    }

    addFavoriteRecipe (recipeID, img, title, author = '...') {
        const favoriteItem = {
            recipeID,
            img,
            title,
            author
        };
        
        this.favoriteList.push(favoriteItem);

        // persist data to localStorage
        this.persistData();

        return favoriteItem;
    }

    removeFavoriteRecipe (recipeID) {
        const deleteRecipeIndex = this.favoriteList.findIndex(el => el.recipeID === recipeID);
        this.favoriteList.splice(deleteRecipeIndex, 1);

        // persist data to localStorage
        this.persistData();
    }

    isLiked (recipeID) {
        return (this.favoriteList.find(el => el.recipeID === recipeID))? true : false;
    }

    getNumLikes() {
        return this.favoriteList.length;
    }

    persistData () {
        localStorage.setItem('favorite', JSON.stringify(this.favoriteList));
    }

    readStorage() {
        const storageData = JSON.parse(localStorage.getItem('favorite'));
        if(storageData)
        this.favoriteList = storageData;
    }
};