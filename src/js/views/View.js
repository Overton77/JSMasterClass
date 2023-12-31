import icons from '../../img/icons.svg';

// All of the child view inherit the render, the update, the renderError, the renderSpinner and the renderMessage
// the render method is one that calls the generateMarkup protected class method of each child View

/**
 *
 * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
 * @param {boolean} [render=true]  If false, create markup string instead of rendering to the DOM
 * @returns {undefined | string} A markup string is returned if render = false
 * @this {Object} View instance
 * @auth Overton Bell
 * @todo Finish implementation
 *  */
export default class View {
  _data;
  render(data, render = true) {
    // Each of the child Views will have access to the data that is passed into them
    // the class variable this._data will thus equal that data and then be rendered
    // if !render then return the mark up rather than the function call to _generateMarkup
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    // document.createRange().createContextualFragment(themarkuptobeinsterted)
    const newElements = Array.from(newDom.querySelectorAll('*'));

    // select all of these contextualFragment elements with Array.from(newDom.querySelectorAll('*'))

    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // retrieve the curElements by selectingAll with the parentElement

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // An array of equal length: each of the elements can use the same index in mapping, for each, reduce method so as to compare

      if (
        !newEl.isEqualNode(curEl) &&
        // if the newEl Node is not equal to the curEl and the newEl.firstChild?.nodeValue.trim isn't equal to an emptry string
        // then set the textContent of the curEl to the newEls textContent
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          // After having set the textContent if the !newEl.isEqualNode(curEl) then Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value))
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
     <div>
       <svg>
         <use href="src/img/${icons}#icon-alert-triangle"></use>
       </svg>
     </div>
     <p>${message}</p>
   </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._successMessage) {
    const markup = `<div class="recipe">
    <div class="message">
      <div>
        <svg>
          <use href="src/img/${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
