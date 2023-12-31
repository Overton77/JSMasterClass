import View from './View.js';
import icons from '../../img/icons.svg';
import fracty from 'fracty';

// When importing from npm you acutally don't need to specify the full path just the package name
// It is easiest to start with the DATA

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  // inheriting from the View each of the child Views can set their _parentElement
  _errorMessage = 'We could not find that recipe. Please try another one ';
  _successMessage = 'Start By Searching For A Recipe And Have Fun';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      const { updateTo } = btn.dataset;
      // when there is a dash in the property name of a data set it will be converted to camel case
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `<figure class="recipe__fig">
    <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.serving
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--update-servings" data-update-to="${
          this._data.serving - 1
        }">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--update-servings" data-update-to="${
          this._data.serving + 1
        }">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div> 

    <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
    <svg>
      <use href="${icons}#icon-user"></use>
    </svg>
  </div>        
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}$#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
      </svg>
    </button>
  </div> 

  <div class="recipe__ingredients">
  <h2 class="heading--2">Recipe ingredients</h2>
  <ul class="recipe__ingredient-list">  
  ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}  
    </ul>
</div>





  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }

  _generateMarkupIngredient(ing) {
    // return fraccty to quantity after you determine you can change quantities per newServing size
    return `  
   
    <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${(ing.quantity = Number(ing.quantity)
      ? fracty(ing.quantity)
      : '')}</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
      ${ing.description}
    </div>
  </li>

    
    
    `;
  }
}

// This file will contain the recipeView view
// there will be a parent class called Views that extend to their children methods
// that all views will have

export default new RecipeView();
