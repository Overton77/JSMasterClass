import * as model from './models.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import icons from '../img/icons.svg';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// There are named exports and default exports

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

// You can import all types of assets with parcel and in JS files

// The path then leads to the dist folder of parcel

// Adding Event Listeners

// Constant element selections

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// It originally had dashes

const controlRecipes = async function () {
  try {
    // loading recipe

    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // Update results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());

    bookmarksView.update(model.state.bookmarks);

    await model.loadRecipe(id);

    // Rendering Recipe
    recipeView.render(model.state.recipe);
    // Updating Bookmrks view
    //TEST

    // An async function will return a promise

    // rendering recipe
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // Get search query
    let query = searchView.getQuery();
    if (!query) return;
    // 2 ) Load search results
    await model.loadSearchResults(query);

    // 3) Render Results
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);

    // 4 ) render initial pagination buttons
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // render new results

  // render new pagination results

  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

// controlRecipes();

// publisher subscriber pattern

// window.addEventListener('hashchange', controlRecipes);
// // window.addEventListener('load', controlRecipes);

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);

  // Update the recipe view
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    // Upload the new Recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render the recipe

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    // changing the ID in the url with the history API

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // window.history.back() automatically going back to last page

    // Sucess Message For uploading correctly

    // Close form window

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(`${err} AHHH`);
    recipeView.renderError(
      'Wrong Ingredient Format. Seperate each part of the recipe by a , (A comma)'
    );
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
