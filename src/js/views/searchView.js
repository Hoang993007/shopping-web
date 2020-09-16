import * as base from './base';

export const getInput = () => base.UIElements.searchInput.value;

export const clearInput = () => {
    base.UIElements.searchInput.value = "";
}

export const clearSearchRes = () => {
    base.UIElements.searchResList.innerHTML = '';
    base.UIElements.searchResPages.innerHTML = '';
}

export const limitRecipeTitle = (title, limit = 17) => {
    if(title.length > limit) {
        const splitedTitle = title.split(' ');
        title = '';
        splitedTitle.reduce((acc, cur) => {
            if(acc + cur.length <= limit) {
                if(acc === 0) {
                    title += cur;
                } else {
                    title += ` ${cur}`;
                }
            }

            return title.length;
        }, 0);
        title += ` ...`;
    }

    return title;
};

const renderRecipe = recipe => {
    const HTMLCode = `
        <li>
            <a class="results__link" href="#${recipe.id}">
                <figure class="results__fig">
                    <img src=${recipe.image} alt=${limitRecipeTitle(recipe.title)}>
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">...</p>
                </div>
            </a>
        </li>
    `;

    base.UIElements.searchResList.insertAdjacentHTML('beforeend', HTMLCode);
}

const createButton = (page, type) => {
    const HTMLButtonCode = `
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
            <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        </button>`;
    
    base.UIElements.searchResPages.insertAdjacentHTML('afterbegin', HTMLButtonCode);
}

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    if(pages > 1) {
        if(page === 1) {
            createButton(page, 'next');
        } else if (page === pages) {
            createButton(page, 'prev');
        } else if (page > 1 && page < pages) {
            createButton(page, 'prev');
            createButton(page, 'next');
        }
    }
};

export const renderResults = (results, page = 1, resPerPage = 3) => {
    renderButtons(page, results.length, resPerPage);
    
    const start = (page - 1) * resPerPage;
    const end = 1 + ((start + (resPerPage -1)) <= (results.length - 1) ? (start + (resPerPage -1)) : results.length - 1);

    // Slide method
    // Zero-based index before which to end extraction. slice extracts up to but not including end

    for (const cur of results.slice(start, end)) {
        renderRecipe(cur);
    }
}