import uniqid from 'uniqid';

export default class ShoppingList {
    constructor () {
        this.items = [];
    }

    addItem (ingredient, amount, unit) {
        this.items.push({
            id: uniqid(),
            ingredient,
            amount,
            unit
        });
    }

    deleteItem (id) {
        this.items.splice(this.items.findIndex(el => el.id === id), 1);
    }

    updateCount (id, newAmount) {
        this.items.find(el => el.id === id).amount = newAmount;
    }
};