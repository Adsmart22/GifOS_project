/* Importar variables */

import { endpointTrending, apiKey, tituloGenerico, nombreGenerico, arregloFavoritos } from './variables.js';

/* Se agregan eventos a los botones */

let botonIzquierdo = document.getElementById("controlLeft");
let botonDerecho = document.getElementById("controlRight");
let imgFlechaIzq = document.getElementById("tredingLeft"); 
let imgFlechaDer = document.getElementById("controlRight");

    if(screen.width > 375){
        botonIzquierdo.addEventListener( "mouseover" , () => {
            botonIzquierdo.style.backgroundColor = "#572EE5";
            imgFlechaIzq.src = "./images/buttons/button-left-hover.svg";
        });
        botonIzquierdo.addEventListener( "mouseout" , () => {
            botonIzquierdo.style.backgroundColor = "#FFF";
            imgFlechaIzq.src = "./images/buttons/button-left.svg";
        }); 
        botonDerecho.addEventListener( "mouseover" , () => {
            botonDerecho.style.backgroundColor = "#572EE5";
            imgFlechaDer.src = "./images/buttons/button-right-hover.svg";
        });
        botonDerecho.addEventListener( "mouseout" , () => {
            botonDerecho.style.backgroundColor = "#FFF";
            imgFlechaDer.src = "./images/buttons/button-right.svg";
        });
    }


const limit = 12;

async function conectar () {
    let response = await fetch(endpointTrending + "?api_key="+ apiKey + "&limit=" + limit + "&rating=15");
    let gifInfo = await response.json();
    let status = gifInfo.meta.status;

    console.warn(gifInfo);

    console.log(status);
    console.log("Tmaño " + gifInfo.data.length);

    try {
        if (status === 200 && gifInfo.data.length > 0) {

            for (let i = 0; i < gifInfo.data.length; i+=1 ){
                let url = gifInfo.data[i].images.fixed_height_downsampled.url;
                /* let name = gifInfo.data[i].username;
                let title = gifInfo.data[i].title;  */
                let name ;
                let title ; 
                let idGif = gifInfo.data[i].id;

                try{
                    //if(!!gifInfo.data[i].user.username || gifInfo.data[i].user.username === ""){
                    if(gifInfo.data[i].username === ""){
                        throw new Error("No existe el username - asignar genérico");
                    } else {
                        name = gifInfo.data[i].username;
                        //name = gifInfo.data[i].user.username;
                    }
                }
                catch (error){
                    name = nombreGenerico;
                    console.error(error);
                }

                try {
                    //if(!!gifInfo.data[i].user.display_name || gifInfo.data[i].user.display_name === ""){
                    if(gifInfo.data[i].title === ""){
                            throw new Error("No existe el display - asignar genérico");
                    }else{
                        title = gifInfo.data[i].title;
                        //title = gifInfo.data[i].user.display_name;
                    }
                } catch{
                    title = tituloGenerico;
                }
                crearGiF(idGif, url, name, title);
                //crearGiF(url, name, title);
            } 
            sessionStorage.setItem('indiceTrending', '12');
        } else if (status === 404){
            throw new Error("Error - recurso no encontrado");
        }
        else {
            throw new Error("Error de conexión, intente más tarde")
        }
    }catch (error) {
        console.error(error);
    }
};

let contador = 0;
let modal = document.getElementById("modal");
const imagenModal = document.getElementById("centralImg");
const imgUser = document.getElementById("imgUser");

function crearGiF(idGif, urlGif, name, title){
    let contenedor = document.getElementById("resultTrendingGif");
    let card = document.createElement("img");

    card.src = urlGif;
    card.id = idGif;
    card.alt = title;
    card.setAttribute("class", "cardTrending");
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

conectar();


/* Eventos para manejar favoritos */

let btnFavoritos = document.getElementById("btnFavoritos");

/* btnFavoritos.addEventListener("mouseover", () => {
    btnFavoritos.src = "./images/icons/icon-fav-hover.svg";
});

btnFavoritos.addEventListener("mouseout", () => {
    btnFavoritos.src = "./images/icons/icon-fav-active.svg";
});
 */
btnFavoritos.addEventListener("click", () => {
    let rutaImg = (btnFavoritos.src).slice(49, 68);
    //let imagenSelecionada = document.getElementsByClassName("centralImg");

    if( rutaImg == 'icon-favoritos.svg') {
        // Si ya está seleccionado, está eliminando de favoritos
        console.error("ya está seleccionada");
        //deleteFavorite( imagenSelecionada[0].id );
    }
    else {
        // Si es la primera vez, la agrega como favoritos
        let imagenSelecionada = document.getElementsByClassName("centralImg");
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

        console.warn("Tamaño arreglo: " + arregloLocal.length);

        for (let i=0; i < arregloLocal.length; i+=1){
            console.log(arregloLocal[i]);

            if(cardId === arregloLocal[i]) {
                console.log("Encontré elemento: " + cardId);
                btnFavoritos.src = "./images/icons/icon-favoritos.svg";
            }
            else {
                btnFavoritos.src = "./images/icons/icon-fav-active.svg";
            }
        }
    }
}

/* function deleteFavorite(cardId){
    //Permite eliminar una gif de mis favoritos
    console.info("Borrado: " + cardId);
    console.warn("Antes de borrar: " + arregloLocal );

    let favoritos = localStorage.getItem("favoritos") ;
    let arregloLocal = JSON.parse(favoritos);

    for (let i=0; i < arregloLocal.length; i+=1){
        //console.log(arregloLocal[i]);

        if(cardId === arregloLocal[i]) {
            arregloLocal.pop(cardId);
        }
    }

    localStorage.setItem('favoritos', JSON.stringify(arregloLocal));
    console.warn("Después de borrar: " + arregloLocal );
} */

