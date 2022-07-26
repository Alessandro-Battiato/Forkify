//utile l'api url cosi perchè questa è la BASE e poi si aggiungo GLI ID e ti da la ricetta
export const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes/";
export const API_KEY = "<key>";
export const TIMEOUT_SEC = 10; //questi sono i cosiddetti "magic numbers" cioè numeri che nei codici spuntano dal nulla e altri developers non sanno che aczzo fare e quindi li metti in variabili in un file comprendendo a che servono
export const RES_PER_PAGE = 10;
export const MODAL_CLOSE_SEC = 2.5;
/*SONO DEI MODULES OVVERO TALI ATTREZZI ANZICHè TENERLI TUTTI IN QUESTO FILE
LI EXPORTI COSI DA USARLI IN OGNI FILE JS CUI OGNUNO SI DEDICA A UN'ATTIVITà DIVERSA
E LI UTILIZZERAI IN QUEI FILE TRAMITE IMPORT
e per exportare funzioni fai export {nomefunzione SENZA()} stessa cosa per importare ma aggiungerai from '.cartella'
QUANDO VEDI IMPORTARE CON L'ASTERISCO * è PERCHè STAI IMPORTANDO TUTTO QUANTO DA UN FILE
ANZICHè IMPORTARE LE SINGOLE FUNZIONI O CONST
tipo import * as mainfunctions from '.cartella'
e conterrà TUTTE le funzioni che richiami COME metodi ad esempio
ALL'INTERNO di mainfunctions c'è una funzione che hai scritto chiamata miaolizer
e allora la applicherai al codice cosi
mainfunctions.miaolizer(argument)
RICORDATI CHE è SEMPLICE SE VEDI export { funzione }
O  import { funzione } è TUTTO SPIEGATO QUI*/
