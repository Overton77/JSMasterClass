import View from './View.js';
import previewView from './previewView.js';
import icons from '../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'We could not find that recipe. Please try another one ';
  _successMessage = 'Success My Boy';

  _generateMarkup() {
    console.log(this._data);

    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
