let clickMenu = document.getElementById("checkMenu");
let menu = document.getElementById("burgerMenu");
let btnOpen = document.getElementById("menuIcon");
let btnClose = document.getElementById("closeMenu");

clickMenu.addEventListener("click", openCloseMenu);

function openCloseMenu(){
    if (clickMenu.checked == true) {
        menu.style.display = "block";
        menu.style.transition = "ease-out 0.4s linear;"
        btnOpen.style.display = "none";
        btnClose.style.display = "block";
    }
    else {
        menu.style.display = "none";
        btnOpen.style.display = "block";
        btnClose.style.display = "none";
    }
}


let mainSection = document.getElementById("main");
let favoriteSection = document.getElementById("favorites");
let myGifosSection = document.getElementById("myGifos");
//let searchGifsSection = document.getElementById("searchGifs");}
let searchImage = document.getElementById("searchImg");

function showSection(opcion){
    mainSection.style.display ="none";
    favoriteSection.style.display ="none";
    myGifosSection.style.display ="none";
   //searchGifsSection.style.display ="none";

    switch(opcion.id){
        case "nightModeOption":
            colapseMenu();
            break;
        case "favoritesOption":
            favoriteSection.style.display = "block";
            colapseMenu();
            break;
        case "myGifOption":
            myGifosSection.style.display = "block";
            colapseMenu();
            break;
        default:
            mainSection.style.display ="block";
    }
}

function colapseMenu(){
    menu.style.display = "none";
    btnOpen.style.display = "block";
    btnClose.style.display = "none";
    searchImage.setAttribute("class", "imgBusqueda");
}

let logoStart = document.getElementById("logoStart");
let reiniciar = () => {
    favoriteSection.style.display ="none";
    myGifosSection.style.display ="none";
    //searchGifsSection.style.display ="none";
    mainSection.style.display = "block";
};
logoStart.addEventListener("click", reiniciar);
