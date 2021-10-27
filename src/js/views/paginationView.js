import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector(`.pagination`);

  addHandlerClick(handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      const btn = e.target.closest(`.btn--inline`);
      if (!btn) return;
      console.log(btn);

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // Page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return this._generateNextButton(curPage);
    }
    // Page 1, and there are no other pages
    if (this._data.page === 1) {
      return ``;
    }
    // Last page
    if (this._data.page === numPages && numPages > 1) {
      return this._generatePreviousButton(curPage);
    }
    // Other page
    if (this._data.page < numPages) {
      return `
        ${this._generatePreviousButton(curPage)}
        ${this._generateNextButton(curPage)}`;
    }
  }

  _generatePreviousButton(curPage) {
    return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>`;
  }
  _generateNextButton(curPage) {
    return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;
  }
}

export default new PaginationView();
