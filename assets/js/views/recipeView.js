import { Fraction } from "fractional";
/* FRACTION è UNA NPM LIBRARY CHE HAI INSTALLATO PERCHè NELLE RICETTE AVEVI
AD ESEMPIO NUMERI TIPO 0.5 O COSE DEL GENERE MA è PIù UISATO NEL MONDO REALE COSE
COME 1/2 AL POSTO DI 0.5 PER CUI QUESTO FRACTION SI OCCUPA PèROPRIO DI QUESTO E DATO CHE FRACTION
è UN OBJECT CHE CONTIENE POI IL METODO FRACTION AL SUO INTERNO ANZICHè FARE fraction.fraction(numeri)
hai FATTO IL DESTRUCTURING E COSI PUOI USARE DOVE SERVE new Fraction.(this.quantity) AD ESEMPIO
TUTTAVIA SE VEDI QUANDO LO USI SOTTO NOTERAI CHE HAI USATO IL TERNARY OPERATOR
QUESTO è PER DIRE CHE SE IL NUMERO ESISTE DA FRAZIONARE DALLA LIBRARY ALLORA USI LA LIBRARY
ALTRIMENTI VUOL DIRE CHE NON C'è ALCUN NUMERO DA FRAZIONARE E METTI IL VUOTO ALTRIMENTI
LA LIBRERIA AVREBBE PROVATO A FUNZIONARE E TI AVREBBE TORNATO NELLE STRINGHE DELLE RICETTE
NaN

IN FONDO AL FILE TROVERAI generateMarkupIngredient HA SOSTITUITO IL SEGUENTE BLOCCO DI CODICE
(ingredient) => {
              return `
              <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="images/icons.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                ingredient.quantity
                  ? new Fraction(ingredient.quantity).toString()
                  : ""
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
              </div>
            </li>
            `;
            }
E AL MAP ANZICHè APPPUNTO METTERE STO CODICE SPORCO FARà SE CONTROLLI (this.#generatemarkupingredient)
*/
class RecipeView {
  #parentElement = document.querySelector(".recipe");
  #data;
  //IL SEGUENTE RENDER DATA opera DOPO che viene chiamato nel controller allo step 2
  render(data) {
    //sarà il RENDER dopo aver ottenuto l'html generato dal markup sotto a METTERLO tramite questi
    this.#data = data; //this.data uguale al dato CHE HA APPENA RICEVUTO
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup); //IL MARKUP è LA CONST CHE HAI CREATO TU CON TUTTO L'HTML DENTRO
    //il this QUI SOPRA sostituisce recipeContainer.insertadjacent ecc
  }

  #clear() {
    this.#parentElement.innerHTML = "";
    /*HAI SOSTITUITO IL RECIPECONTAINER QUA SOTTO CON QUESTO DI SOPRA PERCHè COSI
    è RIUTILIZZABILE PER TUTTI I VIEWS FINTANTO CHE HANNO UN parentElement E QUINDI
    PUOI USARE QUESTO METODO PER CLEARARE IL PARENTELEMENT
    recipeContainer.innerHTML =
      ""; RICORDI NEL TUTORIAL DEI MOVIES CHE PENSAVI FOSSE INUTILE? BENE
    IN REALTà QUESTA RIGA DI CODICE SERVE PROPRIO A TOGLIERE IL MESSAGGIO DI BASE DEL SITO SENZA RICETTE
    QUANDO DICE NEL CONTENITORE DI DESTRA cerca una ricetta :) APPARIVA SOTTO GLI ELEMENTI DOPO AVER 
    FATTO UNA RICERCA INVECE COSI L'HAI SETTATO solo per il recipecontainer che AGISCE DA CONTENITORE  A UNA STRINGA VUOTA E NON APPARE PIU
    */
  }

  //prima era const spinner ma era una FUNZIONE invece cosi l'hai reso METODO
  //(parentElement s'intende il recipeContainer) la seguente funzione aveva come ARGUMENT parentElement ma l'hai TOLTO PERCHè SARà GIà QUELLO L'ARGUMENT e anche i this l'hanno sostituito
  renderSpinner = function () {
    const markup = `
  <div class="spinner">
          <svg>
            <use href="images/icons.svg#icon-loader"></use>
          </svg>
        </div>
  `;
    this.#parentElement.innerHTML = "";
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }; //il parentelement è recipe container ovver orecipe e dunque con la funzione che chiami dopo stai mettendo a OGNI ricerca , per il lasso di tempo d'attesa, lo spinner allegato al recipe

  //il seguente è un PRIVATE method solo di questa classe mentre RENDER sarà condiviso in tutti i view
  #generateMarkup() {
    //hai TOLTO Il const markup = e messo return
    //prima i this erano RECIPE.IMAGE O RECIPE.QUALCOSA THIS STA SOSTITUENDO QUELLO
    return `
    <figure class="recipe__fig">
          <img src="${this.#data.image}" alt="${
      this.#data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.#data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="images/icons.svg#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this.#data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="images/icons.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this.#data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="images/icons.svg#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="images/icons.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="images/icons.svg#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="images/icons.svg#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this.#data.ingredients.map(this.#generateMarkupIngredient).join("")}
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this.#data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.#data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="images/icons.svg#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;
  }

  #generateMarkupIngredient(ingredient) {
    return `
              <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="images/icons.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                ingredient.quantity
                  ? new Fraction(ingredient.quantity).toString()
                  : ""
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
              </div>
            </li>
            `;
  }
}
//è IL RENDER METODO CHE HAI NEL CONTROLLER CHE CONSERVERà I DATI DENTRO IL RECIPEVIEW QUA SOPRA

//una class NON è UN OGGETTO ma un TEMPLATE per gli OBJECTS, infatti una class contiene un CONSTRUCTOR un metodo che CREA un oggetto con key value pairs che definisci tu

export default new RecipeView(); //default viene usato quando si exporta SOLO 1 cosa
