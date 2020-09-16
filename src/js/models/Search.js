import axios from 'axios';
import * as baseConfig from './baseConfig';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try{
            const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${baseConfig.APICall.APIKey}&query=${this.query}`);
            this.result = res.data.results;
            //console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}