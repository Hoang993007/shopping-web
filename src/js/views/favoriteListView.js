import * as base from './base';
import { limitRecipeTitle } from './searchView';

export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
}

export const toggleLikeMenu = menuLength => {
    base.UIElements.likeMenu.style.visibility = menuLength > 0 ? 'visible' : 'hidden';
};

export const renderNewItem = item => {
    base.UIElements.likeListview.insertAdjacentHTML('beforeend',
    `<li>
        <a class="likes__link" href="#${item.recipeID}">
            <figure class="likes__fig">
                <img src=${item.img} alt=${limitRecipeTitle(item.title)}>
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(item.title)}</h4>
                <p class="likes__author">${item.author}</p>
            </div>
        </a>
    </li>`
    );    
};

export const removeItem = recipeID => {
    const itemViewHTMLCode = document.querySelector(`.likes__link, [href="#${recipeID}]`);
    itemViewHTMLCode.parentNode.removeChild(itemViewHTMLCode);
}