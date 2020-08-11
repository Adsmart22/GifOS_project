/* recuperar opciones de menus */
let masOpcionesDiv = document.getElementById("moreOpt");
let modoOscuro = document.getElementById("nightModeOption");
let favoritos = document.getElementById("favoritesOption");
let misGif = document.getElementById("myGifOption");

/* Recuperar las secciones */

let bloqueGrabar = document.getElementById("ownGif");



/* (function agregarEventosMenu(){
    if(screen.width > 375){
        masOpcionesDiv.addEventListener( "click" , () => {
            bloqueGrabar.style.display = "block";
        });
    }
    else {
        bloqueGrabar.style.display = "none";
    }
})(); */


window.addEventListener('resize', (function agregarEventosMenu(){
    if(screen.width > 375){
        masOpcionesDiv.addEventListener( "click" , () => {
            bloqueGrabar.style.display = "block";
        });
    }
    else {
        bloqueGrabar.style.display = "none";
    }
}));