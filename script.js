
// ------------------------------------------------ MODAL REGLE DU JEU ---------------------------------------------------------

// Get the modal
let modal = document.getElementById("rules");

setTimeout( function openModal () {
    modal.style.display = "block";
  }, 1000);



//-------------------------------------------------- AFFICHAGE DES ICONES -------------------------------------------------------
const boxes = document.querySelectorAll('.box');
        const boxesMalus = document.querySelectorAll('.malus');
        const boxesBonus = document.querySelectorAll('.bonus');
        const scoreBoard = document.querySelector('.score');
        let lastBox;
        let timeUp = false;
        let score = 0;

        function randomTime(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }

        function randomBox(boxes) {
            const idx = Math.floor(Math.random() * boxes.length);
            const Box = boxes[idx];
            if (Box === lastBox) {
                return randomBox(boxes);
            }
            lastBox = Box;
            return Box;
        }

        function show() {
            const time = randomTime(300, 2000);
            const Box = randomBox(boxes);
            Box.classList.add('up');
            setTimeout(() => {
                Box.classList.remove('up');
                if (!timeUp) show();
            }, time);
        }

        function myFunction() {
            Box.classList.remove('up');
            if (!timeUp) show();
        }

//-------------------------------------------------------- LE TIMER -------------------------------------------------------

        function heures_minutes_secondes(secondes) {
            let temps = new Date();// objet new date est un standard et se calque sur le navigateur
            temps.setTime(secondes * 1000);
            // if( secondes > 60 * 60) // supérieur à 1 heure
            // {
            //   return (temps.getHours()-1).toString().padStart(2,'0')+":"+temps.getMinutes().toString().padStart(2,'0')+":"+temps.getSeconds().toString().padStart(2,'0');
            // } else {
            return temps.getMinutes().toString().padStart(2, '0') + ":" + temps.getSeconds().toString().padStart(2, '0');
            //}
        }
        function launch_count_down() {
            //creation de la variable qui appelle la count_down_div
            let count_down_div = document.getElementById("count_down_div");
            // 1- le délai
            let total_delay = 15 * 1000; // toutes les 15 SECONDES
            //let total_delay = 30 * 60 * 1000; // toutes les 30 MINUTES
            // 2- Compte à rebours
            let count_down_delay = 1000 * 1; // affichage toutes les 1 secondes,
            let count_down = 0;
            count_down_div.textContent = heures_minutes_secondes((total_delay - count_down) / 1000);
            // setInterval pour que la fx se reitere 15 fois pour 15 sec
            let count_Interval = window.setInterval(function () {
                //iterration de +1 sur le count_down donc transform A REVOIR !!!
                count_down += count_down_delay;
                //count_down += 1000;
                count_down_div.textContent = heures_minutes_secondes((total_delay - count_down) / 1000);
                if (count_down >= total_delay) { count_down = 0; }
            }, count_down_delay);
            // 3- A LA FIN du compte à rebours
            setTimeout(function () {
                // on STOPPE
                clearInterval(count_Interval);
                // ICI : ACTION(S) à effectuer à la FIN du compte à rebours
                // ex : redirection
                // document.location.href='index.php';
                // ex : affichage
                count_down_div.textContent = 'C\'est fini ! vous avez un score de: ' + score + ' !';
            }, total_delay);
        }
//-------------------------------------------------- DEMARER LE JEU  -------------------------------------------------------

        function startGame() {
            scoreBoard.textContent = 0;
            timeUp = false;
            score = 0;
            modal.style.display = "none";
            show();
            launch_count_down();
            setTimeout(() => timeUp = true, 15000);
        }

//-------------------------------------------------- REACTION ONCLICK -------------------------------------------------------

        function bonk() {
            score++;
            this.parentNode.classList.remove('up');
            scoreBoard.textContent = score;
            var sound = document.getElementById("sound1");
            sound.play();
        }

        function bonkMalus() {
            score -= 5;
            this.parentNode.classList.remove('up');
            scoreBoard.textContent = score;
            var sound = document.getElementById("sound2");
            sound.play();
        }

        function bonkBonus() {
            score += 10;
            this.parentNode.classList.remove('up');
            scoreBoard.textContent = score;
            var sound = document.getElementById("sound2");
            sound.play();
        }

        boxes.forEach(boxclicked => boxclicked.addEventListener('click', bonk));
        boxesMalus.forEach(boxclicked => boxclicked.addEventListener('click', bonkMalus));
        boxesBonus.forEach(boxclicked => boxclicked.addEventListener('click', bonkBonus));