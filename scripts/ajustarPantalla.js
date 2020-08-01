
function cambiarMenu(){
    let nocturno = document.getElementById("nightModeOption");
    let favoritos = document.getElementById("favoritesOption");
    let myGif = document.getElementById("myGifOption");
    let imagenLogo = document.getElementById("logo");
    let contMasOpciones = document.createElement("div");
    let masOpciones = document.createElement("img");
    let container = document.getElementById("logoStart");
    console.log(container);

    if (screen.width > 375) {
        //Modificar texto
        nocturno.innerHTML = "MODO NOCTURNO";
        favoritos.innerHTML = "FAVORITOS";
        myGif.innerHTML = "MIS GIFOS";

        //Anexar nuevo botón
        imagenLogo.src = "./images/logos/logo-desktop.svg";
        imagenLogo.setAttribute("class", "logoDesktop" );

        //anexar opciones imagen
        masOpciones.src = "./images/buttons/button-crear-gifo.svg";
        masOpciones.setAttribute("class", "moreImg");
        contMasOpciones.append(masOpciones);
        contMasOpciones.setAttribute("class", "masOpciones");

        contMasOpciones.addEventListener('mouseover', () => {
            contMasOpciones.style.backgroundColor = "#572EE5";
            masOpciones.style.opacity="100%";
        });
        contMasOpciones.addEventListener('mouseout', () => {
            contMasOpciones.style.backgroundColor = "#FFF";
        });

        container.append(contMasOpciones);
    }
    else {
        nocturno.innerHTML = "Modo nocturno";
        favoritos.innerHTML = "Favoritos";
        myGif.innerHTML = "Mis Gifos";
        imagenLogo.src = "./images/logos/logo-mobile.svg";
        imagenLogo.setAttribute("class", "mainLogo" );
    }
}



cambiarMenu(); 






/* window.addEventListener('resize', resize);

function resize()
{
    location.reload();
    let nocturno = document.getElementById("nightModeOption");
    let favoritos = document.getElementById("favoritesOption");
    let myGif = document.getElementById("myGifOption");
    let imagenLogo = document.getElementById("logo");
    let contMasOpciones = document.createElement("div");
    let masOpciones = document.createElement("img");
    let container = document.getElementById("logoStart");

    if (screen.width > 375) {
        //Modificar texto
        nocturno.innerHTML = "MODO NOCTURNO";
        favoritos.innerHTML = "FAVORITOS";
        myGif.innerHTML = "MIS GIFOS";

        //Anexar nuevo botón
        imagenLogo.src = "./images/logos/logo-desktop.svg";
        imagenLogo.setAttribute("class", "logoDesktop" );

        //anexar opciones imagen

        masOpciones.src = "./images/buttons/button-crear-gifo.svg";
        masOpciones.setAttribute("class", "moreImg");
        contMasOpciones.append(masOpciones);
        contMasOpciones.setAttribute("class", "masOpciones");
        container.append(contMasOpciones);
    }
    else {
        nocturno.innerHTML = "Modo nocturno";
        favoritos.innerHTML = "Favoritos";
        myGif.innerHTML = "Mis Gifos";
        imagenLogo.src = "./images/logos/logo-mobile.svg";
        imagenLogo.setAttribute("class", "mainLogo" );
    }
}
 */