const features = [
    {
        title: 'Gruppen erstellen',
        description: 'Erstelle und verwalte Gruppen für verschiedene Zwecke wie WGs, Reisen oder andere gemeinschaftliche Ausgaben. Mit diesem Feature kannst du verschiedene Mitglieder zu einer Gruppe hinzufügen, Ausgaben hinzufügen und diese untereinander aufteilen, sodass jeder seinen Anteil bezahlen kann. Es ist die perfekte Lösung, um bei gemeinsamen Aktivitäten den Überblick über alle Ausgaben zu behalten und faire Abrechnungen zu gewährleisten.'
    },
    {
        title: 'Abrechnungslisten verwalten',
        description: 'Verwalte Ausgaben innerhalb von Gruppen und erstelle detaillierte Abrechnungslisten, die aufzeigen, wer was bezahlt hat und wer jemanden noch etwas schuldet. Die App ermöglicht es dir, Ausgaben nach Kategorien zu ordnen und zu verfolgen, ob alle Rechnungen beglichen wurden oder ob noch offene Posten bestehen. Eine effiziente Möglichkeit, finanzielle Transaktionen in Gruppen übersichtlich und transparent zu gestalten.'
    },
    {
        title: 'Vorhandene Templates',
        description: 'Nutze vorgefertigte Templates für verschiedene Szenarien wie Reisen, WGs oder regelmäßige Ausgaben. Diese Templates enthalten bereits vordefinierte Kategorien und Einstellungen, sodass du schnell starten kannst. Du kannst die Templates an deine Bedürfnisse anpassen und sie für zukünftige Projekte wiederverwenden.'
    },
    {
        title: 'Schulden & Abrechnungsarten',
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

// Features rendern
const featuresList = document.getElementById('features-list');
features.forEach((feature, i) => {
    const div = document.createElement('div');
    div.className = 'feature-item step';
    div.dataset.index = i;

    div.innerHTML = `
        <div class="feature-text ${i % 2 === 0 ? 'text-left' : 'text-right'}">
            <h2>${feature.title}</h2>
            <p>${feature.description}</p>
        </div>
    `;

    featuresList.appendChild(div);
});

// Bild und Handy Container
const phoneContainer = document.getElementById('phone-container');
const screenImg = document.getElementById('screen-img');
screenImg.src = 'assets/features/feature1.png';  // Setze das Bild von Anfang an


// Funktion zum Aktualisieren der Handy-Position und Rotation
function updatePhonePosition(index, progress) {
    const phoneContainer = document.getElementById('phone-container');
    if (!phoneContainer) return;

    const isEven = index % 2 === 0;

    // Ausgangs- und Endpositionen für das Handy
    const startX = isEven ? -200 : 200; // Startposition (außerhalb des Bildschirms)
    const endX = 0; // Endposition (zentriert neben dem Text)

    // Berechnung der Position basierend auf dem Fortschritt
    const translateX = startX + (endX - startX) * progress;

    // Update der transform-Eigenschaften
    phoneContainer.style.transform = `translateX(${translateX}px)`;
    phoneContainer.style.opacity = progress; // Sichtbarkeit basierend auf dem Fortschritt
}

// Funktion zum Aktualisieren des Bildes und Flip-Effekt
function updateImage(index) {
    const screenImg = document.getElementById('screen-img');
    const phoneFrame = document.querySelector('.phone-frame');
    const phoneContainer = document.getElementById('phone-container');

    if (!screenImg || !phoneFrame || !phoneContainer) return;

    // Flip starten
    phoneFrame.classList.add('flip');

    // Nach 250ms (halb geklappt): Bild wechseln
    setTimeout(() => {
        screenImg.src = `assets/features/feature${index + 1}.png`;
    }, 250);

    // Nach 500ms (Flip zu Ende): Flip zurücknehmen + Seite wechseln
    setTimeout(() => {
        phoneFrame.classList.remove('flip');

        // Seite aktualisieren (nach der Animation!)
        phoneContainer.classList.remove('phone-position-left', 'phone-position-right');
        if (index % 2 === 0) {
            phoneContainer.classList.add('phone-position-right');
        } else {
            phoneContainer.classList.add('phone-position-left');
        }
    }, 500);
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
        // Bild aktualisieren
        updateImage(index);

        // Handy-Position ändern
        const phoneContainer = document.getElementById('phone-container');
        phoneContainer.classList.remove('phone-position-left', 'phone-position-right');
        if (index % 2 === 0) {
            phoneContainer.classList.add('phone-position-right');
        } else {
            phoneContainer.classList.add('phone-position-left');
        }

        // Handy nur ab dem ersten Feature einblenden
        if (index === 0) {
            phoneContainer.style.opacity = '1';
            phoneContainer.style.pointerEvents = 'auto';
        }


        // Aktive Klasse setzen
        element.classList.add('is-active');

        // Debugging: Index ausgeben
        console.log(`Aktueller Index: ${index}`);
    })

        .onStepExit(({ element, index, direction }) => {
        // Handy ausblenden, wenn man über das erste Feature nach oben raus scrollt
        if (index === 0 && direction === 'up') {
            const phoneContainer = document.getElementById('phone-container');
            phoneContainer.style.opacity = '0';
            phoneContainer.style.pointerEvents = 'none';
        }
        element.classList.remove('is-active');
    });


const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

// Menü öffnen/schließen
menuToggle.addEventListener('click', () => {
    const isVisible = mobileMenu.style.display === 'flex';
    mobileMenu.style.display = isVisible ? 'none' : 'flex';
});
document.getElementById('menuToggle').addEventListener('click', function () {
  var menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open'); // `open` muss in CSS definiert sein
});

document.querySelectorAll('#mobileMenu a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Menü schließen
        mobileMenu.style.display = 'none';

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const firebaseConfig = {
    apiKey: "AIzaSyDybxy3EbqWz29usNOGOBqBeRVFAaXY3EU",
    authDomain: "ioweu-landing.firebaseapp.com",
    projectId: "ioweu-landing",
    storageBucket: "ioweu-landing.firebasestorage.app",
    messagingSenderId: "432758041786",
    appId: "1:432758041786:web:3964ba3665bdcf65abe683",
    measurementId: "G-3MHN7V0HFG"
  };
  
  // Firebase initialisieren
  const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();