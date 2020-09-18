

/* Modo oscuro */

let modoOscuro = document.getElementById("modoOscuroOpt");

modoOscuro.addEventListener("click", () => {
    let header = document.getElementsByTagName("header");
    let menu = document.getElementById("burgerMenu");
    let main = document.getElementById("main");
    let fav = document.getElementById("favorites");
    let misG = document.getElementById("myGifos");
    let crear = document.getElementById("ownGif");
    let trend = document.getElementById("trend");
    let footer = document.getElementsByTagName("footer");

    header[0].classList.toggle("darkModeHeader");
    menu.classList.toggle("darkMenu");
    main.classList.toggle("darkMain");
    favorites.classList.toggle("darkMain");
    misG.classList.toggle("darkMain");
    crear.classList.toggle("darkOwn");
    trend.classList.toggle("darkTrending");
    footer[0].classList.toggle("darkFooter");
})