import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/search.View';
import {elements, renderLoader, clearLoader} from './views/base';

/** Global sate of the app
 * Search object
 * current recipe object
 * shopping list object
 * liked recipes
 */
const state = {};

/*
**** SEARCH CONTROLLER
*/

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

        try{
            // 4. search for recipes
            await state.search.getResults();
    
            // 5. render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        }catch(err){
            alert('something went wrong in search.....');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controllerSearch();
});
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage)
    };
});

/**
 ***** RECIPE CONTROLLER
 */

const controlRecipe = async () => {
    // get the id from url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if(id){
        // prepare UI for changes

        // create a new recipe obj
        state.recipe = new Recipe(id);

        try{            
            // get the recipe data and parse the ingredients
            await state.recipe.getRecipe();
            //state.recipe.parseIngredients();
    
            // calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            // render the recipe
            state.recipe;
            
        }catch(err){
            alert('Error in processing recipe');
        }

    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

