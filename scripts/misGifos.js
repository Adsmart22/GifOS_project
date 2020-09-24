/* Importar variables */

import { constraints, endpointCargar, apiKey} from './variables.js';

/* Recuperar elementos y añadir eventos */

let comenzar = document.getElementById("comenzarGrab");
let grabar = document.getElementById("grabar");
let finalizar = document.getElementById("finalizar");
let subir = document.getElementById("subir");
let info1 = document.getElementById("info1");
let info2 = document.getElementById("info2");
let info3 = document.getElementById("info3");
let step1 = document.getElementById("step1");
let step2 = document.getElementById("step2");
let step3 = document.getElementById("step3");
let crear = document.getElementById("ownGif"); 
let video = document.getElementById("videoGif");
let idGif = null;
let status;
let arregloGifLocal;

/* EVENTOS PARA MANIPULAR TEXTOS Y CAMARAS CUANDO SE SELECCIONA LA OPCIÓN GRABAR */

comenzar.addEventListener("click", ()=>{
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

comenzar.addEventListener("mouseover", ()=>{
    if (crear.classList.contains("darkOwn")) {
        comenzarGrab.style.backgroundColor = "#FFF";
        comenzarGrab.style.color = "#37383C";
    }
    else {
        comenzarGrab.style.backgroundColor = "#572EE5";
        comenzarGrab.style.color = "#FFF ";
    }
});

comenzar.addEventListener("mouseout" , ()=>{
    if (crear.classList.contains("darkOwn")) {
        comenzarGrab.style.backgroundColor = "#37383C";
        comenzarGrab.style.color = "#FFF";
    }
    else {
        comenzarGrab.style.backgroundColor = "#FFF";
        comenzarGrab.style.color = "#572EE5";
    }
});

grabar.addEventListener("click", ()=> {
    grabarGif();
    contador();

    if (crear.classList.contains("darkOwn")) {
        step1.style.backgroundColor = "#37383C";
        step1.style.color = "#FFF";
        step2.style.backgroundColor = "#FFF";
        step2.style.color = "#37383C";
    }
    else {
        step1.style.backgroundColor = "#FFF";
        step1.style.color = "#572EE5";
        step2.style.backgroundColor = "#572EE5";
        step2.style.color = "#FFF ";
    }

    grabar.style.display = "none";
    finalizar.style.display = "block";
});

finalizar.addEventListener("click", () => {
    detenerGif();
    detenerCronometro();

    if (crear.classList.contains("darkOwn")) {
        step2.style.backgroundColor = "#FFF";
        step2.style.color = "#37383C";
    }
    else {
        step2.style.backgroundColor = "#572EE5";
        step2.style.color = "#FFF ";
    }

    finalizar.style.display = 'none';
    subir.style.display = "block";
});

subir.addEventListener("click", ()=>{
    realizarCargaGif(videoBlob);

    if (crear.classList.contains("darkOwn")) {
        step2.style.backgroundColor = "#37383C";
        step2.style.color = "#FFF";
        step3.style.backgroundColor = "#FFF";
        step3.style.color = "#37383C";
    }
    else {
        step2.style.backgroundColor = "#FFF";
        step2.style.color = "#572EE5";
        step3.style.backgroundColor = "#572EE5";
        step3.style.color = "#FFF ";
    }
})


/* FUNCIONES PARA INICIAR CAM - GRABAR - TERMINAR */
let stream = null;
let videoBlob = null;
let recorder;

async function obtenerPermisos() {
    comenzar.style.display = "none";
    grabar.style.display = "block";

    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (mediaStream) {
            info1.style.display = "none";
            info2.style.display = "none";
            info3.style.display = "none";
            video.style.display = "block";

            video.srcObject = mediaStream;
            video.onloadedmetadata = function (e) {
                video.play();
            };
        })
        .catch(function (err) { 
            console.log(err.name + ": " + err.message); 
        });
}

function grabarGif(){
    navigator.mediaDevices.getUserMedia(constraints)
        .then(async function (stream) {
            recorder = new RecordRTC(stream, {
                type: 'gif',
                mimeType: 'video/webm',
                recorderType: GifRecorder,
                disableLogs: true,
                quality: 6,
                width: 400,
                height: 320
            });
            recorder.startRecording();
            recorder.stream = stream;
        })
}

function detenerGif(){
    recorder.stopRecording( detenerCallBack);
}

function detenerCallBack(){
    videoBlob = recorder.getBlob();

    /* video.src = video.srcObject = null;
    video.src = URL.createObjectURL(videoBlob);

    recorder.stream.stop();
    recorder.destroy();
    recorder = null;

    invokeSaveAsDialog(videoBlob); */

    recorder.stream.stop();
}

function realizarCargaGif(vBloob){
    let form = new FormData();
    form.append('file', vBloob, 'myGif.gif');
    console.log("info file");
    console.info(form.get('file'));

    cargarGif(form);
}

function cargarGif(gifForm) {
    console.warn("entra a método final");
    fetch(endpointCargar + '?api_key=' + apiKey , {
        method: 'POST',
        body: gifForm
    }).then(response => response.json())
    .then( jsonResult => {
        localStorage.setItem("misGifos", "");
        console.log("Resultado en json");
        console.log(jsonResult);
        console.log(jsonResult.meta.status);
        console.log(jsonResult.data.id);
 
        recorder.destroy();
        recorder = null; 

        idGif = jsonResult.data.id;
        status = jsonResult.meta.status; 
        
        console.log("ID gif " + idGif);
        console.log("status " + status);
    }).catch(function (error) {
        console.log("Ocurrió un error al cargar el endpoint");
        console.error(error);
    })
} 

let cronometro;

function contador(){
    let segundos = 0;
    let minutos = 0;
    let contador = document.getElementById("contador");

    cronometro = setInterval(
        function(){        
            if( segundos == 60) {
                segundos = 0;
                minutos += 1;
            }

            contador.innerHTML = "00:0" + minutos + ":" + segundos;
            segundos += 1;
        }, 1000);
}

function detenerCronometro() {
    clearInterval(cronometro);
}