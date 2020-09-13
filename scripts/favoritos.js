/* Importar variables */

import { endpointGifById, apiKey, tituloGenerico, nombreGenerico } from './variables.js';
import {crearGiF} from './modalFuncionalidad.js';

/* AGREGAR EVENTOS A BOTONES */

let favoritosMenu = document.getElementById("favoritosOpt");
let favoritosLocal = localStorage.getItem("favoritos") ;
let arregloLocal = JSON.parse(favoritosLocal);

favoritosMenu.addEventListener("click", () => {
    for(let i=0; i < arregloLocal.length; i+=1) {
        obtenerGif(arregloLocal[i]);
        sessionStorage.setItem('numFav', i);
    }
});

/* RECUPERAR LOCAL STORAGE Y CONECTAR API */

async function obtenerGif(idGif) {
    let response = await fetch(endpointGifById + idGif + "?api_key="+ apiKey);
    let gifResult = await response.json();
    let status = gifResult.meta.status;

    try {
        if (status === 200 && !(gifResult.data === "")) {
            crearTarjeta(gifResult.data);
        } else if (status === 404){
            throw new Error("Error - recurso no encontrado");
        }
        else {
            throw new Error("Error de conexión, intente más tarde")
        }
    }catch (error) {
        console.error(error);
    } 
}

function crearTarjeta(data){
    let url = data.images.fixed_height_downsampled.url;
    let idGif = data.id;
    let name;
    let title;

    try {
        if(data.username === ""){
            throw new Error("No existe el username - asignar genérico");
        } else {
            name = data.username;
        } 
    }
    catch(error){
        name = nombreGenerico;
        console.error(error);
    }

    try {
        if(data.title === ""){
            throw new Error("No existe el display - asignar genérico");
        }else{
            title = data.title;
        } 
    }
    catch(error){
        title = tituloGenerico;
        console.error(error);
    }

    crearGiF(idGif, url, name, title, "favoriteItems", "gifResult");
}


/* VER MAS */

let bntMasFavoritos = document.getElementById("masFavoritos");

bntMasFavoritos.addEventListener("click", () => {
    alert("No hay más información para mostrar");
})