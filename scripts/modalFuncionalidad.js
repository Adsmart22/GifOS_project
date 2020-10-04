import { arregloFavoritos } from './variables.js';

let modal = document.getElementById("modal");
const imagenModal = document.getElementById("centralImg");
const imgUser = document.getElementById("imgUser");

//export function crearGiF(idGif, urlGif, name, title, idContainer, className,){    
export function crearGiF(idGif, urlGif, name, title, idContainer, className, modalViewClass, mainContainerClass){        
    let contenedor = document.getElementById(idContainer);
    let mainContainer = document.createElement("div"); 
    let modalOver = document.createElement("div"); 
    let card = document.createElement("img"); 

    /* Incia Elementos de modal */
    let divDown = document.createElement("div");
    let imgDownload = document.createElement("img");
    let divMax = document.createElement("div");
    let imgAgrandar = document.createElement("img");
    let divFav = document.createElement("div");
    let imgFavorito = document.createElement("img");
    let cardName = document.createElement("p");
    let cardTitle = document.createElement("p");
    let divContNew = document.createElement("div");

    imgDownload.src = "./images/icons/icon-download.svg";
    imgDownload.setAttribute("class", "imagesFunc");
    imgFavorito.src = "./images/icons/icon-fav-active.svg";
    imgFavorito.setAttribute("class", "imagesFunc");
    imgAgrandar.src =" ./images/icons/icon-max.svg";
    imgAgrandar.setAttribute("class", "imagesFunc");
    cardName.innerText = idGif;
    cardName.setAttribute("class", "cardName");
    cardTitle.innerText = title;
    cardTitle.setAttribute("class", "cardTitle");

    divDown.setAttribute("class", "divLogos");
    divFav.setAttribute("class", "divLogos");
    divMax.setAttribute("class", "divLogos");
    divContNew.setAttribute("class", "divContNew");

    divDown.append(imgDownload);
    divFav.append(imgFavorito);
    divMax.append(imgAgrandar);

    divContNew.append(divFav);
    divContNew.append(divMax);
    divContNew.append(divDown);

    modalOver.append(divContNew);
    modalOver.append(cardName);
    modalOver.append(cardTitle);

    /* Termina Elementos de modal */
  
    card.src = urlGif;
    card.id = idGif;
    card.alt = title;
    card.setAttribute("class", className);
    modalOver.setAttribute("class", modalViewClass);
    mainContainer.setAttribute("class", mainContainerClass);
    mainContainer.append(card);
    mainContainer.append(modalOver);
    contenedor.append(mainContainer);

    //modalOver.style.display = "block";

    if ( screen.width > 375) {
        mainContainer.addEventListener("mouseover", () =>{
            modalOver.style.display = "block";
        });
    
        mainContainer.addEventListener("mouseout", () =>{
            modalOver.style.display = "none";
        });
    }

    mainContainer.addEventListener("click", () => {
        modal.style.display="block";
        imagenModal.src = card.src;
        imagenModal.id = card.id;
        imgUser.textContent = name;
 
        let titulo = document.createElement("span");
        titulo.innerText = title;
        imgUser.append(titulo);
        isFavorite(card.id)

        downloadImagen(urlGif).then(blob => {
            const url2 = URL.createObjectURL(blob);
            let a = document.getElementById("descarga");
            a.href = url2;
            a.download = name + '.gif';
            a.title = 'Descargar';
            a.textContent = 'Descargar';
        }).catch(console.error); 
    })
}

/* Funcionalidad para descarga de gif */

async function downloadImagen(url) {
    //console.info("Valor de URL" + url);
    let response = await fetch(url);
    let gifBlob = await response.blob();
    /* console.log ("Entra a la transformación en blob");
    console.log("Response: " + response);
    console.info("Blob: " + gifBlob); */
    return gifBlob;
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
                btnFavoritos.src = "./images/icons/icon-favoritos.svg";
                break;
            }
            else {
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


/* AGREGAR FUNCIONALIDAD DE LOS OTROS CONTROLES DE MODAL */

let botonIzq = document.getElementById("btnLeft");
let botonDer = document.getElementById("btnRight");
let spanLeft = document.getElementById("left"); 
let spanRight = document.getElementById("right");

    if(screen.width > 375){
        spanLeft.addEventListener( "mouseover" , () => {
            if (modal.classList.contains("darkModeModal")) {
                spanLeft.style.backgroundColor = "#FFF";
                botonIzq.src = "./images/buttons/left_dark.svg";
            }
            else {
                spanLeft.style.backgroundColor = "#572EE5";
                botonIzq.src = "./images/buttons/button-left-hover.svg";
            }
        });
        spanLeft.addEventListener( "mouseout" , () => {
            if (modal.classList.contains("darkModeModal")) {
                spanLeft.style.backgroundColor = "#37383C";
                botonIzq.src = "./images/buttons/button-left-hover.svg";
            }
            else {
                spanLeft.style.backgroundColor = "#FFF";
                botonIzq.src = "./images/buttons/button-left.svg";
            }
        }); 
        spanRight.addEventListener( "mouseover" , () => {
            if (modal.classList.contains("darkModeModal")) {
                spanRight.style.backgroundColor = "#FFF";
                botonDer.src = "./images/buttons/right_dark.svg";
            }
            else {
                spanRight.style.backgroundColor = "#572EE5";
                botonDer.src = "./images/buttons/button-right-hover.svg";
            }
        });
        spanRight.addEventListener( "mouseout" , () => {
            if (modal.classList.contains("darkModeModal")) {
                spanRight.style.backgroundColor = "#37383C";
                botonDer.src = "./images/buttons/button-right-hover.svg";
            }
            else {
                spanRight.style.backgroundColor = "#FFF";
                botonDer.src = "./images/buttons/button-right.svg";
            }
        });
    }

    let btnCerrar = document.getElementById("btnCloseModal");

    btnCerrar.addEventListener("click", () => {
        modal.style.display="none";
    });
    