let imagenGif = document.getElementById("imagenGif");
let modal = document.getElementById("modal");
let btnCerrar = document.getElementById("btnCloseModal");
let imagenModal = document.getElementById("centralImg");

imagenGif.addEventListener("click", () => {
    modal.style.display="block";
    imagenModal.src = imagenGif.src;
});

btnCerrar.addEventListener("click", () => {
    modal.style.display="none";
});



