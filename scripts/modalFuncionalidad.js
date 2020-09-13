import { arregloFavoritos } from './variables.js';


let contador = 0;
let modal = document.getElementById("modal");
const imagenModal = document.getElementById("centralImg");
const imgUser = document.getElementById("imgUser");

export function crearGiF(idGif, urlGif, name, title, idContainer, className){    
    let contenedor = document.getElementById(idContainer);
    let card = document.createElement("img");

    card.src = urlGif;
    card.id = idGif;
    card.alt = title;
    card.setAttribute("class", className);
    contenedor.append(card);

    card.addEventListener("click", () => {
        modal.style.display="block";
        imagenModal.src = card.src;
        imagenModal.id = card.id;
        imgUser.textContent = name;
 
        let titulo = document.createElement("span");
        titulo.innerText = title;
        imgUser.append(titulo);

        isFavorite(card.id)
    });
    contador+=1;
}

/* Eventos para manejar favoritos */

let btnFavoritos = document.getElementById("btnFavoritos");

btnFavoritos.addEventListener("click", () => {
    let rutaImg = (btnFavoritos.src).slice(49, 68);
    let imagenSelecionada = document.getElementsByClassName("centralImg");

    if( rutaImg == 'icon-favoritos.svg') {
        // Si ya está seleccionado, está eliminando de favoritos
        console.error("ya está seleccionada");
        deleteFavorite( imagenSelecionada[0].id );
    }
    else {
        // Si es la primera vez, la agrega como favoritos
        //let imagenSelecionada = document.getElementsByClassName("centralImg");
        btnFavoritos.src = "./images/icons/icon-favoritos.svg";
        console.warn("a penas se va a seleccionar");

        // Se obtiene la imagen seleccionada y se obtiene su ID para guardar en arreglo
        arregloFavoritos.push( imagenSelecionada[0].id );
        localStorage.setItem('favoritos', JSON.stringify(arregloFavoritos));
        console.log("localStorage"+ localStorage.favoritos);
    }
});



function isFavorite(cardId) {
    //Permite validar si la imagen mostrara ya se encuentra en favoritos

    if(!localStorage.getItem("favoritos")){
        return 0;
    }
    else {
        //console.warn("Entro else");
        let favoritos = localStorage.getItem("favoritos") ;
        let arregloLocal = JSON.parse(favoritos);

        //console.warn("Tamaño arreglo local: " + arregloLocal.length);

        for (let i=0; i < arregloLocal.length; i+=1){
            if(cardId === arregloLocal[i]) {
                //console.log("Encontré elemento en local: " + cardId);
                btnFavoritos.src = "./images/icons/icon-favoritos.svg";
                break;
            }
            else {
                //console.log("No encontró: " + cardId);
                btnFavoritos.src = "./images/icons/icon-fav-active.svg";
            }
        }
    }
}

function deleteFavorite(cardId){
    //Permite eliminar una gif de mis favoritos

    console.log(arregloFavoritos);

    for (let i=0; i < arregloFavoritos.length; i+=1){
        if(cardId === arregloFavoritos[i]) {
            arregloFavoritos.pop(cardId);
            btnFavoritos.src = "./images/icons/icon-fav-active.svg";
            break;
        }
    }

    localStorage.setItem('favoritos', JSON.stringify(arregloFavoritos));
}