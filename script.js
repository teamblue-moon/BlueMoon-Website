// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

if (localStorage.getItem("theme") === "light") {
    body.classList.add("light");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("light");

    if (body.classList.contains("light")) {
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
});


// Typing animation for H1 "BlueMoon" title
const h1Container = document.querySelector(".hero h1");
const blueTextElement = document.getElementById("blue-text");
const moonTextElement = document.getElementById("moon-text");

const h1BluePart = "Blue";
const h1MoonPart = "Moon";

function typeH1() {
    let charIndex = 0;
    const typeInterval = setInterval(() => {
        if (charIndex < h1BluePart.length) {
            blueTextElement.textContent += h1BluePart.charAt(charIndex);
        } else if (charIndex < (h1BluePart.length + h1MoonPart.length)) {
            moonTextElement.textContent += h1MoonPart.charAt(charIndex - h1BluePart.length);
        }

        charIndex++;

        if (charIndex > (h1BluePart.length + h1MoonPart.length)) {
            clearInterval(typeInterval);
            h1Container.classList.add("color-swap-active");
        }
    }, 150);
}

typeH1();

// Typing animation for hero text
const typingTextElement = document.getElementById("typing-text");
const textToType = "We build Stark naked";
let characterIndex = 0;

function typeText() {
    if (characterIndex < textToType.length) {
        typingTextElement.textContent += textToType.charAt(characterIndex);
        characterIndex++;
        setTimeout(typeText, 200);
    }
}

// NEW: Wrapper function to start and repeat the typing animation
function startHeroTypingAnimation() {
    typingTextElement.textContent = ""; // Clear the text
    characterIndex = 0;                 // Reset the character index
    typeText();                         // Start the typing animation
}

// NEW: Run the animation once, then start a timer to repeat it
startHeroTypingAnimation();
setInterval(startHeroTypingAnimation, 10000); // Repeat every 10 seconds (10000 ms)


// Set the playback speed of the background video
window.addEventListener('load', () => {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.playbackRate = 1.2;
    }
});


// Make fireflies follow the mouse cursor
const fireflies = document.querySelectorAll('.firefly');

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    fireflies.forEach((firefly, index) => {
        setTimeout(() => {
            const offsetX = Math.sin(index * 0.5) * 20;
            const offsetY = Math.cos(index * 0.5) * 20;

            firefly.style.left = `${mouseX + offsetX}px`;
            firefly.style.top = `${mouseY + offsetY}px`;
        }, index * 50);
    });
});


// Typing animation for the About Us section
const aboutSection = document.getElementById("about");
const aboutHeadingElement = document.getElementById("about-heading-typing");
const aboutP1Element = document.getElementById("about-p1-typing");
const aboutP2Element = document.getElementById("about-p2-typing");
const aboutP3Element = document.getElementById("about-p3-typing");

const aboutHeadingText = "About Us";
const aboutP1Text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const aboutP2Text = "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.";
const aboutP3Text = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.";

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function typeContent(element, text, delay) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 20);
        }
    }
    setTimeout(type, delay);
}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeContent(aboutHeadingElement, aboutHeadingText, 200);

            setTimeout(() => {
                typeContent(aboutP1Element, aboutP1Text, 0);
            }, aboutHeadingText.length * 20 + 300);

            setTimeout(() => {
                typeContent(aboutP2Element, aboutP2Text, 0);
            }, (aboutHeadingText.length * 20) + (aboutP1Text.length * 20) + 600);

            setTimeout(() => {
                typeContent(aboutP3Element, aboutP3Text, 0);
            }, (aboutHeadingText.length * 20) + (aboutP1Text.length * 20) + (aboutP2Text.length * 20) + 900);

            observer.unobserve(aboutSection);
        }
    });
}, {
    rootMargin: '0px',
    threshold: 0.5
});

observer.observe(aboutSection);