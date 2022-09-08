import View from "./View";
import icons from "url:../../../images/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = parseInt(btn.dataset.goto);
      handler(goToPage);
    });
  }
  _generateMarkupButtons(currentPage) {
    return `
    <button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
    </button>
    <button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
       <svg class="search__icon">
         <use href="${icons}#icon-arrow-left"></use>
       </svg>
       <span>Page ${currentPage - 1}</span>
     </button>
    `;
  }
  _generateMarkupButtonNext(currentPage) {
    return `
    <button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
    </button>
    
    `;
  }
  _generateMarkupButtonPrev(currentPage) {
    return ` <button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
       <svg class="search__icon">
         <use href="${icons}#icon-arrow-left"></use>
       </svg>
       <span>Page ${currentPage - 1}</span>
     </button>
     `;
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButtonNext(currentPage);
    }
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButtonPrev(currentPage);
    }
    if (currentPage < numPages) {
      return this._generateMarkupButtons(currentPage);
    }
    return "";
  }
}

export default new PaginationView();
