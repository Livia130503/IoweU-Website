const features = [
    { title: 'Gruppen erstellen', description: 'Erstelle Gruppen für WG, Reisen usw.', image: 'assets/feature1.png' },
    { title: 'Abrechnungslisten verwalten', description: 'Verwalte Ausgaben mit verschiedenen Personen.', image: 'assets/feature2.png' },
    { title: 'Vorhandene Templates', description: 'Nutze Templates mit Extra-Funktionen.', image: 'assets/feature3.png' },
    { title: 'Schuldner & Abrechnungsarten', description: 'Prozentuale oder anteilige Abrechnung.', image: 'assets/feature4.png' },
    { title: 'Wiederkehrende Kosten', description: 'Automatische Wiederholung von Ausgaben.', image: 'assets/feature5.png' },
    { title: 'Gesamtbilanz & Archiv', description: 'Behalte offene Posten im Blick.', image: 'assets/feature6.png' }
];

const teamMembers = [
    { name: 'Jakob Laschober', role: 'Backend Developer', photo: 'assets/Jakob.jpg' },
    { name: 'Livia Hochstöger', role: 'Frontend & Design', photo: 'assets/Livia.jpg' },
    { name: 'Mateusz Osmanski', role: 'Backend & Scrum', photo: 'assets/Mateusz.jpg' },
    { name: 'Michaela Kopf', role: 'Frontend & Design', photo: 'assets/Michaela.jpg' },
    { name: 'Sophie Plaskacz', role: 'Frontend & Design', photo: 'assets/Sophie.jpg' }
];

// Features rendern
const featuresList = document.getElementById("features-list");
features.forEach((feature, i) => {
    const textAlignClass = i % 2 === 0 ? "text-left" : "text-right";
    const div = document.createElement("div");
    div.className = "feature-item step";
    div.dataset.index = i;

    div.innerHTML = `
        <div class="feature-text ${textAlignClass}">
<<<<<<< HEAD
            <h3>${feature.title}</h3>
=======
            <h2>${feature.title}</h2>
>>>>>>> ff035c0 (Refactor landing page structure and update content to reflect IoweU branding)
            <p>${feature.description}</p>
        </div>
    `;

    featuresList.appendChild(div);
});

// Team rendern
const teamContainer = document.getElementById("team-container");
teamMembers.forEach(member => {
    const div = document.createElement("div");
    div.className = "team-member";
    div.innerHTML = `
        <img src="${member.photo}" alt="${member.name}" />
<<<<<<< HEAD
        <h4>${member.name}</h4>
=======
        <h3>${member.name}</h3>
>>>>>>> ff035c0 (Refactor landing page structure and update content to reflect IoweU branding)
        <p>${member.role}</p>
    `;
    teamContainer.appendChild(div);
});

const phoneContainer = document.getElementById('phone-container');
const screenImg = document.getElementById('screen-img');

// Funktion zum Aktualisieren der Handy-Position (nur horizontale Bewegung)
function updatePhonePosition(index, progress) {
    const phone = document.getElementById('phone-frame');
    const phoneContainer = document.getElementById('phone-container');
    const screenImg = document.getElementById('screen-img');
    if (!phone || !phoneContainer || !screenImg) return;

    const feature = features[index];
    const isEven = index % 2 === 0;

    // Ausgangs- und Endpositionen für das Handy
    const startX = isEven ? -200 : 200;
    const endX = isEven ? 200 : -200;

    // Position des Handys berechnen
    let translateX = startX + (endX - startX) * progress;

    // Update der transform-Eigenschaften für den Container
    phoneContainer.style.transition = 'transform 0.2s ease';
    phoneContainer.style.transform = `translateX(${translateX}px)`;

    // Rotation entfernen, da keine Rotation gewünscht wird
    phone.style.transition = 'none'; // Keine Transition für Rotation
    phone.style.transform = `rotateY(0deg)`; // Keine Rotation mehr
}



// Scrollama Setup
const scroller = scrollama();

scroller
    .setup({
        step: '.step',
        offset: 0.5,
        debug: false
    })
    .onStepEnter(({ element, index }) => {
        const i = parseInt(index);

        // Bild aktualisieren, wenn das entsprechende Feature aktiv ist
        if (!screenImg.src.endsWith(features[i].image)) {
            screenImg.src = features[i].image;
        }

        // Handy-Position ändern
        phoneContainer.classList.remove('phone-position-left', 'phone-position-right');
        if (i % 2 === 0) {
            phoneContainer.classList.add('phone-position-right');
        } else {
            phoneContainer.classList.add('phone-position-left');
        }

        // Aktive Klasse setzen
        element.classList.add("is-active");
    })
    .onStepExit(({ element }) => {
        element.classList.remove("is-active");
    })
    .onStepProgress(({ index, progress }) => {
        updatePhonePosition(index, progress);  // Position und Rotation des Handys aktualisieren
    });

// Resize Event zum Anpassen der Scrollama-Positionen
window.addEventListener("resize", scroller.resize);
