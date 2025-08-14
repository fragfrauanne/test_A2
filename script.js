const tasks = [
    { question: "ich - erst spät - einschlafen - .", answer: "Ich bin erst spät eingeschlafen." },
    { question: "wir - im Park - spazieren gehen - .", answer: "Wir sind im Park spazieren gegangen." },
    { question: "du - heute um eins aus der Schule kommen - .", answer: "Du bist heute um eins aus der Schule gekommen." },
    { question: "wir - ein Bier trinken - .", answer: "Wir haben ein Bier getrunken." },
    { question: "ich - meine Freunde - treffen - .", answer: "Ich habe meine Freunde getroffen." },
    { question: "was - passieren - ?", answer: "Was ist passiert?" },
    { question: "ich - am Goetheplatz aussteigen - .", answer: "Ich bin am Goetheplatz ausgestiegen." },
    { question: "mein Freund - mich am Bahnhof abholen - .", answer: "Mein Freund hat mich am Bahnhof abgeholt." },
    { question: "Samira - in Bagdad Medizin studieren - .", answer: "Samira hat in Bagdad Medizin studiert." },
    { question: "Luis - nach Kuba fliegen - .", answer: "Luis ist nach Kuba geflogen." },
    { question: "ich - meine Eltern anrufen - .", answer: "Ich habe meine Eltern angerufen." },
    { question: "ich - den Bus verpassen - .", answer: "Ich habe den Bus verpasst." },
    { question: "er - die Hausaufgabe vergessen - .", answer: "Er hat die Hausaufgabe vergessen." },
    { question: "Angelika - ihr Handy verlieren - .", answer: "Angelika hat ihr Handy verloren." },
    { question: "er - mich verstehen - .", answer: "Er hat mich verstanden." },
    { question: "er - mir helfen - .", answer: "Er hat mir geholfen." },
    { question: "ich - um 7 Uhr aufstehen - .", answer: "Ich bin um 7 Uhr aufgestanden." },
    { question: "der Film - schon beginnen - .", answer: "Der Film hat schon begonnen." }
];



const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        // card.addEventListener("click", () => {
        //     if (!card.classList.contains("flipped")) {
        //         card.classList.add("flipped");
        //     }
        // });


        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });


        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Prevent card flip
            card.classList.add("fade-out"); // fades out a card when you click the "checked" sign

            // Wait for the transition to finish before removing
            setTimeout(() => {
                card.remove();
                checkEnd();
            }, 600); // Match the CSS transition duration
        };


        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}



// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);

// layout toggling logic

const toggleBtn = document.getElementById("toggleLayoutBtn");
let isStacked = false;

toggleBtn.addEventListener("click", () => {
    isStacked = !isStacked;
    container.classList.toggle("stack-mode", isStacked);
    container.classList.toggle("grid-mode", !isStacked);
});

