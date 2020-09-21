/* Importar variables */

import { constraints } from './variables.js';

/* Recuperar elementos y añadir eventos */

let comenzarGrab = document.getElementById("comenzarGrab");
let info1 = document.getElementById("info1");
let info2 = document.getElementById("info2");
let info3 = document.getElementById("info3");
let step1 = document.getElementById("step1");
let step2 = document.getElementById("step2");
let step3 = document.getElementById("step3");
let crear = document.getElementById("ownGif"); 
let videoContainer = document.getElementById("videoContainer");
let video = document.getElementById("videoGif");
let instrucciones = document.getElementById("ownGifContainer");

comenzarGrab.addEventListener("click", ()=>{
    if (crear.classList.contains("darkOwn")) {
        step1.style.backgroundColor = "#FFF";
        step1.style.color = "#37383C";
    }
    else {
        step1.style.backgroundColor = "#572EE5";
        step1.style.color = "#FFF ";
    }

    info1.innerText = "¿Nos das acceso a tu cámara?";
    info2.innerText = "El acceso a tu cámara será válido sólo";
    info2.innerText = "por el tiempo que estemos creado tu GIFO";

    obtenerPermisos();
});

comenzarGrab.addEventListener("mouseover", ()=>{
    if (crear.classList.contains("darkOwn")) {
        comenzarGrab.style.backgroundColor = "#FFF";
        comenzarGrab.style.color = "#37383C";
    }
    else {
        comenzarGrab.style.backgroundColor = "#572EE5";
        comenzarGrab.style.color = "#FFF ";
    }
});

comenzarGrab.addEventListener("mouseout" , ()=>{
    if (crear.classList.contains("darkOwn")) {
        comenzarGrab.style.backgroundColor = "#37383C";
        comenzarGrab.style.color = "#FFF";
    }
    else {
        comenzarGrab.style.backgroundColor = "#FFF";
        comenzarGrab.style.color = "#572EE5";
    }
});


/* FUNCIONES PARA GRABACIÓN */

function obtenerPermisos() {
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (mediaStream) {
            instrucciones.style.display = "none";
            videoContainer.style.display = "block";

            video.srcObject = mediaStream;
            video.onloadedmetadata = function (e) {
                video.play();
            };
        })
        .catch(function (err) { console.log(err.name + ": " + err.message); });
}