/* Importar variables */

import { endpointGifById, apiKey, tituloGenerico, nombreGenerico } from './variables.js';
import {crearGiF} from './modalFuncionalidad.js';

/* AGREGAR EVENTOS A BOTONES */

let myG = document.getElementById("misGifOpt");
let gifosLocal = localStorage.getItem("gifosLocal") ;


myG.addEventListener("click", () => {
    if(!gifosLocal || arregloLocal.length === 0){
        console.log("No hay favoritos");
        let panelNoGif = document.getElementById("noGifos");
        panelNoGif.style.display = 'block';
    }/* {
        for(let i=0; i < arregloLocal.length; i+=1) {
            obtenerGif(arregloLocal[i]);
            sessionStorage.setItem('numFav', i);
        }
    } */
});