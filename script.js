const messages = [
    "Are you sure, Doctor?",
    "I promise it will be a nice evening.",
    "Doctor's orders: You should probably say yes.",
    "Don't make me get a second opinion!",
    "I might need medical attention if you keep trying to click no...",
    "Okay, the 'No' button is officially broken."
];

let messageIndex = 0;
let yesScale = 1;
let noScale = 1; // Nouvelle variable pour rétrécir le bouton Non

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionText = document.getElementById('question-text');
const questionContainer = document.getElementById('question-container');
const successContainer = document.getElementById('success-container');
const successMessage = document.getElementById('success-message');

// --- LOGIQUE DU BOUTON NON (Il rétrécit au lieu de fuir) ---
noBtn.addEventListener('click', function(e) {
    e.preventDefault(); 
    
    // Petite vibration si le téléphone le permet
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }

    // Change le texte pour la taquiner
    questionText.style.opacity = 0;
    setTimeout(() => {
        questionText.innerText = messages[messageIndex % messages.length];
        questionText.style.opacity = 1;
        messageIndex++;
    }, 150);

    // Le bouton OUI grossit
    yesScale += 0.25;
    yesBtn.style.transform = `scale(${yesScale})`;

    // Le bouton NON rétrécit
    noScale -= 0.15;
    if (noScale < 0.2) {
        // S'il devient trop petit, on le fait disparaître complètement !
        noBtn.style.display = 'none';
    } else {
        noBtn.style.transform = `scale(${noScale})`;
    }
});

// --- LOGIQUE DU BOUTON OUI ---
yesBtn.addEventListener('click', () => {
    // Effet de fondu et de flou sur la carte
    questionContainer.style.opacity = 0;
    questionContainer.style.filter = 'blur(20px)';
    questionContainer.style.transform = 'scale(0.9)';
    
    // Cache le bouton Non au cas où il serait encore là
    noBtn.style.display = 'none';
    
    setTimeout(() => {
        questionContainer.classList.add('hidden');
        successContainer.classList.remove('hidden');
        
        // Le message final personnalisé !
        typeWriterEffect("Thank you, Doctor Houda. See you after Ramadan ✨");
        createNatureExplosion();
    }, 800);
});

// Effet machine à écrire
function typeWriterEffect(text) {
    let i = 0;
    successMessage.innerHTML = '';
    const speed = 90; 

    function type() {
        if (i < text.length) {
            successMessage.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    setTimeout(type, 1000); // Commence avec un léger délai
}

// Explosion Botanique / Nature
function createNatureExplosion() {
    const emojis = ['🍃', '✨', '🌸', '🌿', '🌼', '🦋', '🌾'];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDuration = Math.random() * 5 + 5 + 's'; 
            particle.style.fontSize = Math.random() * 20 + 10 + 'px';
            
            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 10000);
        }, i * 40);
    }
}