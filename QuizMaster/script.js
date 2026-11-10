
// Întrebările quizului
const intrebari = [
    {
        text: "Care este cea mai mare planetă din Sistemul Solar?",
        variante: ["Jupiter", "Saturn", "Pământ"],
        corect: 0
    },
    {
        text: "Câte continente există pe Pământ?",
        variante: ["5", "7", "6"],
        corect: 1
    },
    {
        text: "Care este capitala Franței?",
        variante: ["Roma", "Madrid", "Paris"],
        corect: 2
    },
    {
        text: "Cât face 12 × 8?",
        variante: ["96", "86", "108"],
        corect: 0
    },
    {
        text: "Care este simbolul chimic al apei?",
        variante: ["CO2", "H2O", "O2"],
        corect: 1
    }
];

// Selectarea elementelor HTML
const butonStart = document.getElementById("start");
const butonNext = document.getElementById("next");
const butonRestart = document.getElementById("restart");

const ecranStart = document.getElementById("start-screen");
const ecranQuiz = document.getElementById("quiz-screen");
const ecranRezultat = document.getElementById("result-screen");

const zonaIntrebare = document.getElementById("intrebare");
const zonaRaspunsuri = document.getElementById("raspunsuri");
const zonaMesaj = document.getElementById("mesaj");

const zonaScor = document.getElementById("scor");
const zonaProgres = document.getElementById("progres");
const baraProgres = document.getElementById("progress-fill");

const scorFinal = document.getElementById("scor-final");
const rezultatMesaj = document.getElementById("rezultat-mesaj");

// Variabilele jocului
let scor = 0;
let indexCurent = 0;
let raspunsDat = false;

// Începerea jocului
butonStart.addEventListener("click", function() {

    ecranStart.classList.add("hidden");
    ecranQuiz.classList.remove("hidden");

    scor = 0;
    indexCurent = 0;

    actualizeazaScor();
    afiseazaIntrebare();
});

// Afișarea întrebării
function afiseazaIntrebare() {

    raspunsDat = false;

    const intrebare = intrebari[indexCurent];

    zonaIntrebare.textContent = intrebare.text;

    zonaRaspunsuri.innerHTML = "";
    zonaMesaj.textContent = "";

    butonNext.classList.add("hidden");

    zonaProgres.textContent =
        "Întrebarea " + (indexCurent + 1) +
        " din " + intrebari.length;

    baraProgres.style.width =
        ((indexCurent + 1) / intrebari.length * 100) + "%";

    // Crearea butoanelor pentru variante
    for (let i = 0; i < intrebare.variante.length; i++) {

        const buton = document.createElement("button");

        buton.textContent = intrebare.variante[i];

        buton.addEventListener("click", function() {
            verificaRaspuns(i);
        });

        zonaRaspunsuri.appendChild(buton);
    }
}

// Verificarea răspunsului
function verificaRaspuns(alegere) {

    // Oprește verificarea dacă s-a răspuns deja
    if (raspunsDat) {
        return;
    }

    raspunsDat = true;

    const intrebare = intrebari[indexCurent];
    const butoane = zonaRaspunsuri.querySelectorAll("button");

    // Dezactivarea tuturor butoanelor
    butoane.forEach(function(buton) {
        buton.disabled = true;
    });

    if (alegere === intrebare.corect) {

        scor = scor + 10;

        zonaMesaj.textContent = "Corect! +10 puncte 🎉";

        butoane[alegere].classList.add("corect");

    } else {

        zonaMesaj.textContent =
            "Greșit! Răspunsul corect era: " +
            intrebare.variante[intrebare.corect];

        butoane[alegere].classList.add("gresit");
        butoane[intrebare.corect].classList.add("corect");
    }

    actualizeazaScor();

    // Dacă mai există întrebări, afișăm butonul următor
    if (indexCurent < intrebari.length - 1) {

        butonNext.classList.remove("hidden");

    } else {

        butonNext.textContent = "Vezi rezultatul final";
        butonNext.classList.remove("hidden");
    }
}

// Actualizarea scorului
function actualizeazaScor() {

    zonaScor.textContent = "⭐ Scor: " + scor;
}

// Trecerea la următoarea întrebare
butonNext.addEventListener("click", function() {

    if (indexCurent < intrebari.length - 1) {

        indexCurent++;
        afiseazaIntrebare();

        butonNext.textContent = "Următoarea întrebare";

    } else {

        afiseazaRezultat();
    }
});

// Afișarea rezultatului final
function afiseazaRezultat() {

    ecranQuiz.classList.add("hidden");
    ecranRezultat.classList.remove("hidden");

    scorFinal.textContent = scor + " / 50";

    if (scor === 50) {

        rezultatMesaj.textContent =
            "Excelent! Ai răspuns corect la toate întrebările! 🏆";

    } else if (scor >= 30) {

        rezultatMesaj.textContent =
            "Foarte bine! Ai acumulat multe puncte! 👏";

    } else {

        rezultatMesaj.textContent =
            "Continuă să exersezi! Cu fiecare joc vei învăța mai mult! 💪";
    }
}

// Repornirea jocului
butonRestart.addEventListener("click", function() {

    scor = 0;
    indexCurent = 0;

    ecranRezultat.classList.add("hidden");
    ecranQuiz.classList.add("hidden");
    ecranStart.classList.remove("hidden");

    butonNext.textContent = "Următoarea întrebare";

    actualizeazaScor();
});
