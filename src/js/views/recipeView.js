import * as base from './base';

export const clearRecipeView = () => {
    base.UIElements.recipeDataView.innerHTML = '';
}

export const highlightSelected = recipeID => {
    const selected = document.querySelector(`a[href="#${recipeID}"]`);
    if(selected) {
        Array.from(document.querySelectorAll('.results__link')).map(el => el.classList.remove('results__link--active'));
        selected.classList.add('results__link--active');
    }
}

const formatCount = count => {

    /* if (count) {
        const [int, dec] = count.toString().split('.').map(el => parseInt(el, 10));

        if (!dec) return count;

        if (int === 0) {
            const fr = new fraction(count);
            return `${fr.numerator}/${fr.denominator}`;
        } else {
            const fr = new Fraction(count - int);
            return `${int} ${fr.numerator}/${fr.denominator}`;
        }
    }
    return '?'; */

    return count.toFixed (2);
};

const createRecipeFigure = recipeData => {
    return `
    <figure class="recipe__fig">
                <img src=${recipeData.image} alt=${recipeData.title} class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipeData.title}</span>
                </h1>
            </figure>
    `;
}

const createRecipeDetails = recipe => {
    return `
            <div class="recipe__details">

                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.recipeData.readyInMinutes}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>

                <div class="recipe__info">

                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.recipeData.servings}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>
                </div>

                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href=${recipe.isLiked ? "img/icons.svg#icon-heart" : "img/icons.svg#icon-heart-outlined"}></use>
                    </svg>
                </button>
            </div>
    `;
}

const createRecipeIngredients = recipeData => {
    return `
        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">

            ${recipeData.extendedIngredients.map(cur => `
                <li class="recipe__item">
                    <svg class="recipe__icon">
                    <use href="img/icons.svg#icon-check"></use>
                    <img style = "position: relative; width: 50px; height: auto; margin-right: 5px; border: 1px solid white; border-radius: 5%;" src="https://spoonacular.com/cdn/ingredients_100x100/${cur.image}">
                    </svg>
                    <div class="recipe__count">${formatCount(cur.amount)}</div>
                    <div class="recipe__ingredient">
                        <span class="recipe__unit">${cur.unit}</span>
                        ${cur.name}
                    </div>
                </li>`
                ).join('')}

            </ul>
            <button class="btn-small recipe__btn add__shopping__list">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
            </button>
        </div>
    `;
}

const createRecipeDirection = recipeData => {
    return `
        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipeData.sourceName}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipeData.sourceUrl}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
    `;
};

export const renderRecipe = recipe => {
    const recipeFigure = createRecipeFigure(recipe.recipeData);
    base.UIElements.recipeDataView.insertAdjacentHTML('beforeend', recipeFigure);

    const recipeDetails = createRecipeDetails(recipe);
    base.UIElements.recipeDataView.insertAdjacentHTML('beforeend', recipeDetails);

    const recipeIngredients = createRecipeIngredients(recipe.recipeData);
    base.UIElements.recipeDataView.insertAdjacentHTML('beforeend', recipeIngredients);

    const recipeDirection = createRecipeDirection(recipe.recipeData);
    base.UIElements.recipeDataView.insertAdjacentHTML('beforeend', recipeDirection);
}

export const updateServingsView = recipeData => {
    document.querySelector('.recipe__info-data--people').textContent = recipeData.servings;

    Array.from(document.querySelectorAll('.recipe__count')).forEach((cur, i) => {
        cur.textContent = formatCount(recipeData.extendedIngredients[i].amount);
    });
};