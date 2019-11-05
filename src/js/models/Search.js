import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults(query) {
        const proxy = '';
        const key = '40310d0d363ad72b186b81596b3fb9e3';
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.result);
        } catch (error) {
            alert(error)
        }
    }
}