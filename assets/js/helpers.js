//ovviamente helpers fa parte della sfera model visto che ci comunica
// L'HA MESSO PARCEL MA VEDI SE SERVE PURE A TE import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config";
//AVEVI MESSO TIMEOUTSEC IN TIMEOUT COME ARGUMENT INIZIALMENTE CON ${} PERò SI STRINGA MOLTIPLICATA PER UN NUMERO FUNZIONA COMUNQUE NELLA CONSOLE ALMENO

//è come dire function timeout() {} tranqui
// ENTRAMBI I FUNCTION SE NOTI STANNO SOSTITUENDO LA SCRITTURA AD ARROW FUNCTION INFATTI NON VI è ALCUNA FRECCIA E DUNQUE ALCUN RETURN
//QUESTO TMEOUT VIENE USATO PER LE CONNESSIONI SUPER LENTE ALTRIMENTI FETCH RUNNEREBBE PER SEMPRE
//INFATTI DOPO TOT SECONDI LA PROMESSA CHE è STATA CREATA DENTRO LA FUNZNIONE REJECTERA
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000); //quindi per ripetere, DOPO che sono passati s secondi, setiimeout RUNNA e vince LA RACE e fetch si sta zitto e logga l'errore
  });
};

//TIMEOUT VIENE USATO COME VEDI DENTRO GETJSON, E VIENE USATO IL COSIDDETTO PROMISE.RACE CHE PRENDE 2 PROMISES COME PARAMETRI
// E' LETTERALMENTE A CHI VINCE PRIMA, LA TUA CONNESSIONE DEV'ESSERE DECENTE ALTRIMENTI FALLIRò E REFRESHERAI
/*FA MOLTA ATTENZIONE AL PROMISE RACE. inizialmente avevi fatto promise.race[2 promise] ma vs code faceva
promise.race[(2promise)] IL FATTO è CHE COSI ERA SOLO 1 ELEMENTO DENTRO UNARRAY E NON 2 PROMISES DISTINTE
e quindi crashava, ma perchè NON AVEVI CALLATO RACE FACENDO .race() ATTENZIONE*/
export const getJSON = async function (url) {
  try {
    //è l'id del controller che lo consegna qui come argument e come fetch api
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); // `${API_URL}${id}` è STATO TRASFERITO nel model e QUI non serve ripeterlo DA url e basta
    const data = await res.json();
    //RICORDA CHE IL JSON è CONTENUTO NEL RESPONSE TUTTO IN BUILT NELLE FUNZIONI, IL SEGUENTE DATA MESSAGE DELL'ERRORE è ANCHE IN BUILT TU NON HAI FATTO NULLA
    if (!res.ok) throw new Error(`${data.message} (${res.status})`); //se la risposta NON è ok quando per esempio l'id è sbagliato e allora nella response c'è tipo sotto recipes id bla bla un "ok" che equivarrà a FALSO
    return data; //questi DATA saranno il valore RESOLVED della promise che è stata JSONNATA dal res.json
  } catch (err) {
    throw err; /*TI SPIEGO QUESTO THROW: IN SOSTANZA PRIMA ERA console.log(err) MA NON ANDAVA BENE PERCHè
    LA PROMISE NONOSTANTE L'ERRORE SI FULFILLAVA COMUNQUE E NELLA CONSOLE LOGGAVA UN ERRORE MA DATO CHE GETJSON
    VIENE USATO NEL MODEL E ANCHE LI VIENE LOGGATO L'ERRORE, TALE DOVREBBE ESSERE RISOLTO ESCLUSIVAMENTE
    NEL MODEL CHE è IL POSTO PRINCIPALE INVECE ERA IL CONTRARIO ERA COME SE GETJSON FOSSE PIU "IMPORTANTE"
    DUNQUE HAI FATTO throw err PERCHè SE SI INCONTRA UN ERRORE ALLORA LA PROMISE RIFIUTA PROPRIO REJECTA
    E L'ERRORE VIENE TRASFERITO NEL MODEL CHE APPUNTO LO RISOLVERà
    traparentesi questo throw error viene espresso se timeout vince la CORSA*/
  }
};
