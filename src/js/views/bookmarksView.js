import View from './View.js';
import previewView from './previewView.js';
import icons from '../../img/icons.svg';

class BookMarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No Bookmarks yet. Find a nice recipe and bookmark it';
  _successMessage = 'Succesfully BookMarked Recipe';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    console.log(this._data);

    return this._data
      .map(bookmarks => previewView.render(bookmarks, false))
      .join('');
  }
}

export default new BookMarksView();
