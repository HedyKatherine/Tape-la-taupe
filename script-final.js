
        // Get the modal
        let modal = document.getElementById("rules");

        setTimeout(function openModal() {
            modal.style.display = "block";
        }, 1000);


        const holes = document.querySelectorAll('.hole');
        const scoreBoard = document.querySelector('.score');
        const moles = document.querySelectorAll('.mole');

        let lastHole;
        let timeUp = false;
        let score = 0;

        function randomTime(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }

        let molies = ["malus-1.svg", "malus-2.svg", "malus-3.svg", "malus-4.svg", "malus-5.svg", "ghost-1.svg", "ghost-2.svg", "ghost-3.svg", "ghost-4.svg", "ghost-5.svg", "bonus-1.png", "bonus-2.png"];


        function randomHole(holes) {
            const idx = Math.floor(Math.random() * holes.length);
            const hole = holes[idx];
            if (hole === lastHole) {
                console.log('Ah nah thats the same one bud');
                return randomHole(holes);
            }
            lastHole = hole;
            return hole;

        }

        function peep() {
            const time = randomTime(600, 1000);
            const hole = randomHole(holes);
            const molesChoice = randomHole(moles);
            const chosenMole = randomHole(molies);
            const iconSplit = chosenMole.split('-');
            const iconId = iconSplit[0];

            hole.classList.add('up');

            molesChoice.style.background = `url("./images/${chosenMole}") bottom center no-repeat`;

            if (iconId === "malus") {
                molesChoice.removeEventListener('click', bonkGhost);
                molesChoice.removeEventListener('click', bonkBonus);
                molesChoice.addEventListener('click', bonkMalus);

            }
            if (iconId === "bonus") {
                molesChoice.removeEventListener('click', bonkMalus);
                molesChoice.removeEventListener('click', bonkGhost);
                molesChoice.addEventListener('click', bonkBonus);
            }
            if (iconId === "ghost") {
                molesChoice.removeEventListener('click', bonkMalus);
                molesChoice.removeEventListener('click', bonkBonus);
                molesChoice.addEventListener('click', bonkGhost);
            }

            setTimeout(() => {
                hole.classList.remove('up');
                if (!timeUp) peep();
            }, time);



        }

        function myFunction() {
            hole.classList.remove('up');
            if (!timeUp) peep();
        }

        function startGame() {
            scoreBoard.textContent = 0;
            timeUp = false;
            score = 0;
            launch_count_down();
            peep();
            modal.style.display = "none";
            setTimeout(() => timeUp = true, 15000)
        }

        function bonkGhost() {
            score++;
            this.parentNode.classList.remove('up');
            scoreBoard.textContent = score;
            var sound = document.getElementById("sound1");
            sound.play();
        }
        function bonkMalus() {
            score -= 10;
            this.parentNode.classList.remove('up');
            scoreBoard.textContent = score;
            var sound = document.getElementById("sound2");
            sound.play();
        }
        function bonkBonus() {
            score += 10;
            this.parentNode.classList.remove('up');
            scoreBoard.textContent = score;
            var sound = document.getElementById("sound3");
            sound.play();
        }


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
                count_down_div.textContent = 'game over';
            }, total_delay);
        }