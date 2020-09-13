/* Importar variables */

import { endpointSearch, apiKey, endpointAutocomplete } from './variables.js';

/* EVENTOS Y FUNCIONALIDAD PARA AUTOMPLETAR */

let txtBusqueda = document.getElementById("barraBuscadora");

//Cuando cambie el input, hacer la búsqueda

txtBusqueda.addEventListener("keydown", () => {
    /* console.log("Entra");
    console.log("Nuevo valor: " + txtBusqueda.value ); */

    conectarAutocompetar();

});


async function conectarAutocompetar(){
    let response = await fetch(endpointAutocomplete + "?api_key="+ apiKey + "&q=" + txtBusqueda.value);
    let tagsAuto = await response.json();
    let status = tagsAuto.meta.status;

    try {
        if (status === 200 && tagsAuto.data.length > 0) {
            console.log("Con resultados");
            limpiarLista();
            actualizarTags(tagsAuto.data);
        }
        else if (status === 404){
            throw new Error("Error - recurso no encontrado");
        }
        else {
            throw new Error("Error al recuperar la información")
        }
    }
    catch(error) {
        console.error(error);
    }
}

function limpiarLista(){
    let numeroItems = document.querySelectorAll('#coincidencias div');
    let lista = document.getElementById('coincidencias');
    let div;

    for(let i=0; div=numeroItems[i]; i++) {
        console.log("elimina");
        div.parentNode.removeChild(div);
    }
    
    console.log(lista.outerHTML);
}

function actualizarTags(valores) {
    let panelBusqueda = document.getElementById('panelControl');
    

    
    let lista = document.getElementById("coincidencias");

    for ( let a=0; a < valores.length ; a+=1 ) {
        let listContainer = document.createElement("div");
        let imgLista = document.createElement("img");
        let itemList = document.createElement("li");

        itemList.innerText = valores[a].name;
        imgLista.src = "./images/icons/icon-search.svg";
        listContainer.append(imgLista);
        listContainer.append(itemList);
        lista.append(listContainer);
    }
}



/* EVENTOS Y FUNCIONALIDAD PARA BUSQUEDA */