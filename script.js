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


// Team Members
const teamMembers = [
    { name: 'Jakob Laschober', role: 'Backend Developer', photo: 'public/assets/Jakob.jpg' },
    { name: 'Livia Hochstöger', role: 'Frontend & Design', photo: 'public/assets/Livia.jpg' },
    { name: 'Mateusz Osmanski', role: 'Backend & Scrum', photo: 'public/assets/Mateusz.jpg' },
    { name: 'Michaela Kopf', role: 'Frontend & Design', photo: 'public/assets/Michaela.jpg' },
    { name: 'Sophie Plaskacz', role: 'Frontend & Design', photo: 'public/assets/Sophie.jpg' }
];

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

const featuresList = document.getElementById('features-list');
features.forEach((feature, i) => {
    const div = document.createElement('div');
    div.className = 'feature-item step';
    div.dataset.index = i;
    div.dataset.step = i;
    div.innerHTML = `
        <div class="feature-text ${i % 2 === 0 ? 'text-left' : 'text-right'}">
            <h2>${feature.title}</h2>
            <p>${feature.description}</p>
        </div>
    `;
    featuresList.appendChild(div);
});


const phoneContainer = document.getElementById('phone-container');
const screenImg = document.getElementById('screen-img');
screenImg.src = 'public/assets/features/feature1.png';

function updatePhonePosition(index, progress) {
    const isEven = index % 2 === 0;
    const startX = isEven ? -200 : 200;
    const endX = 0;
    const translateX = startX + (endX - startX) * progress;
    phoneContainer.style.transform = `translateX(${translateX}px)`;
    phoneContainer.style.opacity = progress;
}

function updateImage(index) {
    const screenImg = document.getElementById('screen-img');
    const phoneFrame = document.querySelector('.phone-frame');
    const phoneContainer = document.getElementById('phone-container');

    if (!screenImg || !phoneFrame || !phoneContainer) return;

    phoneFrame.classList.add('flip');

    setTimeout(() => {
        screenImg.src = `public/assets/features/feature${index + 1}.png`;
    }, 150);

    setTimeout(() => {
        phoneFrame.classList.remove('flip');
        phoneContainer.classList.remove('phone-position-left', 'phone-position-right');
        phoneContainer.classList.add(index % 2 === 0 ? 'phone-position-right' : 'phone-position-left');
    }, 300);
}

// ========== SCROLLAMA ==========
const scroller = scrollama();
scroller
    .setup({
        step: '.step',
        offset: 0.5,
        debug: false
    })
    .onStepEnter(({ element, index }) => {
        updateImage(index);

        phoneContainer.classList.remove('phone-position-left', 'phone-position-right');
        phoneContainer.classList.add(index % 2 === 0 ? 'phone-position-right' : 'phone-position-left');

        if (index === 0) {
            phoneContainer.style.opacity = '1';
            phoneContainer.style.pointerEvents = 'auto';
        }

        element.classList.add('is-active');
        console.log(`Aktueller Index: ${index}`);
    })
    .onStepExit(({ element, index, direction }) => {
        if (index === 0 && direction === 'up') {
            phoneContainer.style.opacity = '0';
            phoneContainer.style.pointerEvents = 'none';
        }
        element.classList.remove('is-active');
    });



// ========== BURGER MENÜ ==========
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            mobileMenu.classList.toggle('visible');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('visible');
            });
        });

        document.addEventListener('click', (event) => {
            const clickedOutside = !mobileMenu.contains(event.target) && !menuToggle.contains(event.target);
            if (clickedOutside) {
                mobileMenu.classList.remove('visible');
            }
        });
    }

    // Cookie-Banner prüfen
    handleCookieBanner();
});

// ========== FIREBASE ==========
const firebaseConfig = {
    apiKey: "AIzaSyDybxy3EbqWz29usNOGOBqBeRVFAaXY3EU",
    authDomain: "ioweu-landing.firebaseapp.com",
    projectId: "ioweu-landing",
    storageBucket: "ioweu-landing.firebasestorage.app",
    messagingSenderId: "432758041786",
    appId: "1:432758041786:web:3964ba3665bdcf65abe683",
    measurementId: "G-3MHN7V0HFG"
};

let analytics; // nur wenn akzeptiert

function initFirebaseAnalytics() {
    // Firebase App SDK laden
    const appScript = document.createElement('script');
    appScript.src = 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js';
    appScript.onload = () => {
        // Analytics SDK laden
        const analyticsScript = document.createElement('script');
        analyticsScript.src = 'https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics-compat.js';
        analyticsScript.onload = () => {
            const app = firebase.initializeApp(firebaseConfig);
            analytics = firebase.analytics();
        };
        document.head.appendChild(analyticsScript);
    };
    document.head.appendChild(appScript);
}


// ========== COOKIE-BANNER ==========

document.addEventListener('DOMContentLoaded', () => {
    handleCookieBanner();
});

function handleCookieBanner() {
    const banner = document.getElementById('cookie-backdrop');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');

    const cookieChoice = localStorage.getItem('cookie-consent');

    // Banner anzeigen, wenn NICHT 'accepted'
    if (cookieChoice !== 'accepted' && banner) {
        banner.style.display = 'block';
    }

    acceptBtn?.addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'accepted');
        banner.style.display = 'none';
        initFirebaseAnalytics(); // Tracking aktivieren
    });

    declineBtn?.addEventListener('click', () => {
        // Kein Tracking, aber Entscheidung nicht merken – damit Banner wieder kommt
        banner.style.display = 'none';
    });

    if (cookieChoice === 'accepted') {
        initFirebaseAnalytics();
    }
}




const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
        }
    });
}, {
    rootMargin: "-50% 0px -50% 0px", // Bereich mittig im Viewport
    threshold: 0
});

document.querySelectorAll("main section[id]").forEach(section => {
    observer.observe(section);
});


navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});


