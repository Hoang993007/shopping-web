import * as base from './base';

const createShoppingListHTML = shoppingItems => {
    return shoppingItems.map(el => `
        <li class="shopping__item" data-itemID=${el.id}>
            <div class="shopping__count">
                <input type="number" value="${el.amount}" step="${el.amount}" class="shopping__count--value">
                <p>${el.unit}</p>
            </div>

            <p class="shopping__description">${el.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>`).join('');
}

// render when shopping list is still empty
export const renderShoppingList = shoppingItems => {
    const shoppingListHTMLCode = createShoppingListHTML(shoppingItems);
    base.UIElements.shoppingListView.insertAdjacentHTML('beforeend', shoppingListHTMLCode);
};

export const deleteItemView = itemID => {
    const deleteItem = document.querySelector(`[data-itemID=${itemID}]`);
    deleteItem.parentNode.removeChild(deleteItem);
};
