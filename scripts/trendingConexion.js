let botonIzquierdo = document.getElementById("controlLeft");
let botonDerecho = document.getElementById("controlRight");
let imgFlechaIzq = document.getElementById("tredingLeft"); 
let imgFlechaDer = document.getElementById("controlRight");


//window.addEventListener('resize', (function agregarEventosMenu(){
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
//}));