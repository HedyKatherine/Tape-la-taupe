// ------------------------------------------------ MODAL REGLE DU JEU ---------------------------------------------------------

// Get the modal
let modal = document.getElementById("rules");

setTimeout( function openModal () {
    modal.style.display = "block";
  }, 1000);


 //-------------------------------------------------------- SCORE -------------------------------------------------------

// Déclaration et initialisation d'une variable i comme compteur
let i = 0;
// Fonction qui au clic ajoute 1 au compteur
function counting(){
    i++;
    document.getElementById("score").innerHTML=i;
}

 //-------------------------------------------------- ANIMATION CURSEUR  -------------------------------------------------------

//const score = document.querySelector(".score span")
const cursor = document.querySelector(".cursor img")

window.addEventListener("mousemove", (e) => {
    cursor.style.top = e.pageY + "px";
    cursor.style.left = e.pageX + "px";

    window.addEventListener("click", () => {
        cursor.style.animation = "hit 0.1s ease";
        setTimeout(() => {
            cursor.style.removeProperty("animation")
        }, 100);
    });
});