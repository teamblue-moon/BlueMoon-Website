// A single object to manage all UI elements
const UI = {
  // Mobile menu toggle
  hamburger: document.getElementById("hamburger"),
  navLinks: document.getElementById("navLinks"),

  setupMenuToggle() {
    if (this.hamburger && this.navLinks) {
      this.hamburger.addEventListener("click", () => {
        this.navLinks.classList.toggle("active");
      });
    }
  },

  // Typing animation for H1 "BlueMoon" title
  h1Container: document.querySelector(".hero h1"),
  heroLogo: document.getElementById("hero-logo"),
  blueTextElement: document.getElementById("blue-text"),
  moonTextElement: document.getElementById("moon-text"),

  h1BluePart: "Blue",
  h1MoonPart: "Moon",

  typeH1() {
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < this.h1BluePart.length) {
        this.blueTextElement.textContent += this.h1BluePart.charAt(charIndex);
      } else if (charIndex < (this.h1BluePart.length + this.h1MoonPart.length)) {
        this.moonTextElement.textContent += this.h1MoonPart.charAt(charIndex - this.h1BluePart.length);
      }

      charIndex++;

      if (charIndex > (this.h1BluePart.length + this.h1MoonPart.length)) {
        clearInterval(typeInterval);
        this.h1Container.classList.add("color-swap-active");
        this.heroLogo.classList.add("logo-glow-active");
      }
    }, 150);
  },

  // Typing animation for hero text
  typingTextElement: document.getElementById("typing-text"),
  heroTextToType: "We build Stark naked",
  heroTextIndex: 0,

  typeHeroText() {
    if (this.heroTextIndex < this.heroTextToType.length) {
      this.typingTextElement.textContent += this.heroTextToType.charAt(this.heroTextIndex);
      this.heroTextIndex++;
      setTimeout(() => this.typeHeroText(), 200);
    }
  },

  startHeroTypingAnimation() {
    if (this.typingTextElement) {
      this.typingTextElement.textContent = "";
      this.heroTextIndex = 0;
      this.typeHeroText();
    }
  },

  // Set the playback speed of the background video
  setVideoSpeed() {
    window.addEventListener('load', () => {
      const heroVideo = document.querySelector('.hero-video');
      if (heroVideo) {
        heroVideo.playbackRate = 1.2;
      }
    });
  },

  // Fireflies follow the mouse cursor
  fireflies: document.querySelectorAll('.firefly'),

  setupFireflyFollow() {
    document.addEventListener('mousemove', (e) => {
      const {
        clientX: mouseX,
        clientY: mouseY
      } = e;

      this.fireflies.forEach((firefly, index) => {
        setTimeout(() => {
          const offsetX = Math.sin(index * 0.5) * 20;
          const offsetY = Math.cos(index * 0.5) * 20;

          firefly.style.left = `${mouseX + offsetX}px`;
          firefly.style.top = `${mouseY + offsetY}px`;
        }, index * 50);
      });
    });
  },

  // Typing animation for the About Us section
  aboutSection: document.getElementById("about"),
  aboutHeadingElement: document.getElementById("about-heading-typing"),
  aboutP1Element: document.getElementById("about-p1-typing"),
  aboutText: {
    heading: "About Us",
    p1: "Birthed by Anambra Web3 Starknet Class. BlueMoon a digital testament to our team's creative audacity and technical swagger on Starknet. We've bottled the chaos of late-night coding and the thrill of innovation into a sleek, interactive experience. Welcome to the future—it's less about the destination and more about how we got there (with a lot of caffeine).",
  },
  
  typeAboutSection() {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.typeContent(this.aboutHeadingElement, this.aboutText.heading, 200);
          
          setTimeout(() => {
            this.typeContent(this.aboutP1Element, this.aboutText.p1, 0);
          }, this.aboutText.heading.length * 20 + 300);

          observer.unobserve(this.aboutSection);
        }
      });
    }, {
      threshold: 0.5
    });

    if (this.aboutSection) {
      observer.observe(this.aboutSection);
    }
  },

  typeContent(element, text, delay) {
    if (!element || !text) return;
    let i = 0;
    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, 20);
      }
    };
    setTimeout(type, delay);
  },
};

// Initialize all functionality
document.addEventListener("DOMContentLoaded", () => {
  UI.setupMenuToggle();
  UI.typeH1();
  UI.startHeroTypingAnimation();
  setInterval(() => UI.startHeroTypingAnimation(), 10000);
  UI.setVideoSpeed();
  UI.setupFireflyFollow();
  UI.typeAboutSection();
});