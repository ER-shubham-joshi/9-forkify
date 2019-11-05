import Search from './models/Search';
import * as searchView from './views/search.View';
import {elements, renderLoader, clearLoader} from './views/base';

/** Global sate of the app
 * Search object
 * current recipe object
 * shopping list object
 * liked recipes
 */
const state = {};

const controllerSearch = async () => {
    // 1. get query from view
    const query = searchView.getInput(); //1000
    //console.log(query);

    if (query) {
        // 2. new search object and add to state
        state.search = new Search(query);

        // 3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // 4. search for recipes
        await state.search.getResults();

        // 5. render results on UI
        clearLoader();
        searchView.renderResults(state.search.result)
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controllerSearch();
})