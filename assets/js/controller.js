// JONAS FA import icons from 'url:../img/iconsECC' PER PARCEL MA TU NON LO USI QUINDI NON USI IMPORT PER QUELLE COSE
/*INVECE I SEGUENTI DUE IMPORT SONO PER I PACKAGES SCARICATI TRAMITE NPM CHE SI OCCUPANO DI 
RENDERE IL CODICE CHE HAI CHE è POST ES6 COMPATIBILE CON I VECCHI BROWSER
ALTRIMENTI IL TUO SITO è FOTTUTO E QUINDI TUTTO IL CODICE è CONVERTITO
AUTOMATICAMENTE GRAZIE A QUESTI PACKAGES*/
/*
DEVI FAR FUNZIONARE ANCHE QUESTO QUA SOTTO
import * as model from "./model"; //DATO CHE HAI EXPORT CON FUNZIONI CON NOME IMPORTI DIRETTAMENTE TUTTO DAL MODEL A QUI
import "core-js/stable"; //QUESTO POYLIFILLA TUTTO IL RESTO
import "regenerator-runtime/runtime"; //QUESTO "POLYFILLA" cioè converte SOLO ASYNC AWAIT
import recipeView from "./views/recipeView";
*/

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2 TOGLILO QUANDO HAI FINITO

/* RICORDA REGOLA SACROSANTA DELL'ASYNC FUNCTION, LA FUNZIONE EFFETTIVAMENTE
SI STOPPA LETTERALMENTE ALL'AWAIT PERCHè ASPETTA CHE FETCH VADA A PRENDERE
LA RISPOSTA PER CIò CHE HAI CERCATO TUTTAVIA ESSENDO ASYNC TALE FUNZIONE
STA IN "BACKGROUND" CIò VUOL DIRE CHE SE HAI ALTRE FUNZIONI E SE TU AVESSI
USATO FETCH SENZA ASYNC LETTERALMENTE BLOCCAVI TUTTO QUANTO IN ATTESA DELLA RISPOSTA
SLOWANDO IL SITO INVECE IN QUESTA MANIERA JS VA AVANTI MENTRE ASPETTA LA RISPOSTA
*/

//controlrecipes PRIMA SI CHIAMAVA showRecipes MA è PER TENERE FEDE AL CONTROLLER

const controlRecipes = async function () {
  try {
    //il seguente non è BUSINESS LOGIC ma più application logic quindi FAR FUNZIONARE l'app
    const id = window.location.hash.slice(1);

    if (!id) return; //è FATTO PERCHè SE CARICHI LA PAGINA E NON HA ALCUN ID nell'url TI RITORNERà ERRORE
    recipeView.renderSpinner(); //l'argument ERA recipeContainer MA IL PARENTELEMENT è GIà DENTRO COME SAI
    // 1 Loading the recipe dunque loadrecipe con l'id ottenuto
    await model.loadRecipe(id); //RICORDA CHE UN ASYNC FUNCTION TORNA SEMPRE UNA PROMISE ECCO PERCHè AWAIT
    // const { recipe } = model.state; NON NE HAI PIU BISOGNO DOPO IL RECIPEVIEW
    // 2 rendering the recipe il model.state.recipe della ricetta viene passato al render
    recipeView.render(model.state.recipe); //render NON è una IN BUILT function la stai creando tu ma anche su react s ichiama render
    //IL RENDER DI SOPRA SOSTITUISCE IL SEGUENTE const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

//NON PANICKARE QUESTO ARRAY DI SOTTO è SOLO PER PULIRE IL CODICE DEI DUE WINDOW CHE AVEVI FATTO SOTTO MA FA LA STESSA IDENTICA COSA IN UNA RIGA DI CODICE

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipes)
);

//HAI SPOSTATO LA FUNCTION ALL'EVENTLISTENER DI SOTTO showRecipe(); ricorda che devi sempre chiamare la funzione altrimenti l'hai solo di chiarata
//window.addEventListener("hashchange", showRecipe); //ricorda non è un ONCLICK ma è un ONHASCHCHANGE
/*#560abkxokaodf l'id tutto ciò che viene dopo l'#, compreso l'# si chiama HASH e dunque dato che
l'hai messo nell'a href come ESEMPIO quando l oCLICCHI l'a cambia nel'URL l'HASH E ALLORA grazie all'eventlistener si ATTIVA la funzione enorme che mette l'html e tutto il resto
l'id che cerchi cosi window.location.hash.slice(1) va a prendere l'id dalla barra di ricerca quando CAMBIA e tu lo SLICI perchè vuoi tutta la stringa SENZA l'#*/
/*window.addEventListener(
  "load",
  showRecipe
); QUESTO IMMAGINO SIA IL DOMCONTENTLOADED
E SI PROCCA INVECE DOPO CHE HA FINITO DI FARE UN QUALSIASI CARICAMENTO TIPO JONAS
HA COPIA INCOLLATO L'URL CON L'HASH CON L'ID IN UNA NUOVA SCHEDA
MA NON APPARIVA LA RICETTA PERCHè NON ERA AVVENUTO NESSUN HASHCHANGE, QUESTO ALLORA RISOLVE IL PROBLEMA PERCHè SI PROCCA AL CARICAMENTO*/
