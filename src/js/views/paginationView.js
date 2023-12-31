import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      // It searches for parents
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    // computing how many pages there
    console.log(this._data);
    const curPage = this._data.page;
    // the state contains the currentPage

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // the numPages equals the length of the resultsarray
    // divided by configuration variable the resultsPerPage

    console.log(numPages);
    if (curPage === 1 && numPages > 1) {
      return `<button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
    // const numPages =
    //   this._data.search.results.length / this._data.resultsPerPage;
    // Page 1 and there are other pages
    // We are on page 1 and there are no other pages
    // Last Page
    if (curPage === numPages && numPages > 1) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${curPage - 1}</span>
            </button>`;
    }

    // Some intermediate page

    // Refactor this return of the button mark up to its own function

    if (curPage < numPages) {
      return `<button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>  
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${curPage - 1}</span>
            </button>`;
    }

    return '';
  }
}

export default new PaginationView();
