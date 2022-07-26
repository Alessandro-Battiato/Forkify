// SENON HO CAPITO MALE LO STATE.RECIPE DI SOTTO IN SOSTANZA COPIA TUTTO IL RECIPE OBJECT NEL CONST STATE
//e poi ne usufruirà il controller
// L'HA MESSO PARCEL MA VEDI SE SERVE PURE A TE import { async } from "regenerator-runtime"; //CONTROLLA SE DEVI IMPORTARLO IN OGNI MODULO (filejs)
import { API_URL } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
};
//inizialmente la rticetta è un oggetto vuoto perchè non c'è nulla, e lo esportiamo per poterlo usare nel controller

//la seguente funzione è letteralmente QUELLA CHE VA A FETCHARE l'api
//LA SEGUENTE FUNZIONE è UN ASYNC FUNCTION CHE CHIAMA UN ALTRA ASYNC FUNCTION OVVERO GETJSON
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`); //USI AWAIT PERCHè APPUNTO ANCHE GETJSON è ASYNC E STA LUI STESSO ASPETTANDO UNA RISPOSTA
    //NEL SEGUENTE USI IL DESTRUCTURING CON RECIPE perchè la variabile tanto la devi comunque chiamare RECIPE e tu stavi ACCEDENDO facendo data.data.recipe PER CUI PER PULIRE E DATO CHE VUOI CHIAMARLO RECIPE USI IL DESTRUCTURING
    //perchè l'object che ti ritorna ha le keys che si chiamano tipo cooking_recipe STI UNDERSCORE NON VANNO BENE
    //id: assegnerai all'id l'id del RECIPE OTTENUTO DALL'API infatti recipe.id accedendo all'object è tutto facile se ci pensi
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    }; //ABBIAMO CREATO UN OBJECT NUOVO DAL RECIPE OTTENUTO per cambiare a nostra volontà i nomi delle chiavi come vedi
    console.log(state.recipe);
  } catch (err) {
    //Temporary error handling, verrà rivisitato
    console.error(`${err} 💥💥💥💥`);
  }
};
