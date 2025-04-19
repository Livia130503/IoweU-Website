const features = [
    {
        title: 'Gruppen erstellen',
        description: 'Erstelle und verwalte Gruppen für verschiedene Zwecke wie WGs, Reisen oder andere gemeinschaftliche Ausgaben. Mit diesem Feature kannst du verschiedene Mitglieder zu einer Gruppe hinzufügen, Ausgaben hinzufügen und diese untereinander aufteilen, sodass jeder seinen Anteil bezahlen kann. Es ist die perfekte Lösung, um bei gemeinsamen Aktivitäten den Überblick über alle Ausgaben zu behalten und faire Abrechnungen zu gewährleisten.'
    },
    {
        title: 'Abrechnungslisten verwalten',
        description: 'Verwalte Ausgaben innerhalb von Gruppen und erstelle detaillierte Abrechnungslisten, die aufzeigen, wer was bezahlt hat und wer noch was schuldet. Die App ermöglicht es dir, Ausgaben nach Kategorien zu ordnen und zu verfolgen, ob alle Rechnungen beglichen wurden oder ob noch offene Posten bestehen. Eine effiziente Möglichkeit, finanzielle Transaktionen in Gruppen übersichtlich und transparent zu gestalten.'
    },
    {
        title: 'Vorhandene Templates',
        description: 'Nutze vorgefertigte Templates für verschiedene Szenarien wie Reisen, WGs oder regelmäßige Ausgaben. Diese Templates enthalten bereits vordefinierte Kategorien und Einstellungen, sodass du schnell starten kannst, ohne jede Transaktion und jeden Detail von Grund auf neu erstellen zu müssen. Du kannst die Templates an deine Bedürfnisse anpassen und sie für zukünftige Projekte wiederverwenden.'
    },
    {
        title: 'Schuldner & Abrechnungsarten',
        description: 'Das Feature bietet dir verschiedene Abrechnungsarten, um die Ausgaben gerecht zu teilen. Du kannst zwischen prozentualer oder anteiliger Abrechnung wählen, abhängig davon, wie du die Kosten aufteilen möchtest. Ob du gleichmäßig oder nach bestimmten Anteilen teilen willst – mit dieser Funktion kannst du für jede Situation die passende Methode auswählen. Außerdem behältst du immer den Überblick darüber, wer noch Geld schuldet und wer bereits bezahlt hat.'
    },
    {
        title: 'Wiederkehrende Kosten',
        description: 'Automatisiere die Verwaltung von wiederkehrenden Ausgaben, wie etwa monatliche Mieten, Abonnements oder andere regelmäßige Zahlungen. Du kannst wiederkehrende Ausgaben festlegen, die automatisch zu den jeweiligen Terminen in deiner Abrechnung erscheinen. Das spart Zeit und stellt sicher, dass du keine Zahlungen vergisst und immer über deine regelmäßigen Verpflichtungen im Klaren bist.'
    },
    {
        title: 'Gesamtbilanz & Archiv',
        description: 'Behalte den Überblick über alle deine finanziellen Aktivitäten mit der Gesamtbilanz. Hier siehst du auf einen Blick, wie viel Geld du ausgegeben hast, wie viel du zurückbekommen hast und wie viel du noch schuldet. Zusätzlich wird dir ein Archiv zur Verfügung gestellt, in dem du alle früheren Abrechnungen und Transaktionen einsehen und nach Bedarf darauf zugreifen kannst. So hast du immer eine umfassende Übersicht über deine finanziellen Angelegenheiten und kannst auf historische Daten zugreifen.'
    }
];


// Team Members (Unverändert)
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
            <h2>${feature.title}</h2>
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
        <h3>${member.name}</h3>
        <p>${member.role}</p>
    `;
    teamContainer.appendChild(div);
});

// Bild und Handy Container
const phoneContainer = document.getElementById('phone-container');
const screenImg = document.getElementById('screen-img');
screenImg.src = 'assets/features/feature1.png';  // Setze das Bild von Anfang an

function updateImage(index) {
    const screenImg = document.getElementById('screen-img');
    if (!screenImg) return;  // Sicherstellen, dass screenImg existiert
    screenImg.src = `assets/features/feature${index + 1}.png`;  // Dynamisches Setzen des Bildes basierend auf dem Index
}

// Funktion zum Aktualisieren der Handy-Position (nur horizontale Bewegung)
function updatePhonePosition(index, progress) {
    const phone = document.getElementById('phone-frame');
    const phoneContainer = document.getElementById('phone-container');
    if (!phone || !phoneContainer) return;

    const isEven = index % 2 === 0;

    // Ausgangs- und Endpositionen für das Handy
    const startX = isEven ? -200 : 200;
    const endX = isEven ? 200 : -200;

    // Position des Handys berechnen
    let translateX = startX + (endX - startX) * progress;

    // Update der transform-Eigenschaften für den Container
    phoneContainer.style.transition = 'transform 0.2s ease';
    phoneContainer.style.transform = `translateX(${translateX}px)`;
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
        updateImage(i);

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
        updatePhonePosition(index, progress);  // Position des Handys aktualisieren
    });

// Resize Event zum Anpassen der Scrollama-Positionen
window.addEventListener("resize", scroller.resize);
