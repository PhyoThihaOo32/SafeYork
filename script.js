// Shared navigation and scroll animation behavior for all pages.
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const themeText = document.querySelector(".theme-text");

// Day/night theme toggle. The selected mode is saved for every page.
function applyTheme(theme) {
  const isNight = theme === "night";

  document.body.classList.toggle("night-theme", isNight);

  if (themeToggle && themeIcon && themeText) {
    themeToggle.setAttribute("aria-label", isNight ? "Switch to day theme" : "Switch to night theme");
    themeIcon.textContent = isNight ? "NIGHT" : "DAY";
    themeText.textContent = isNight ? "Night" : "Day";
  }
}

const savedTheme = localStorage.getItem("safesignal-theme") || "day";
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("night-theme") ? "day" : "night";
    localStorage.setItem("safesignal-theme", nextTheme);
    applyTheme(nextTheme);
  });
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Reveal cards and sections as they enter the viewport.
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Project page demo: convert selected sample signals into a danger level.
const signalForm = document.querySelector("#signal-form");
const analyzeButton = document.querySelector("#analyze-btn");
const resetButton = document.querySelector("#reset-btn");
const dangerLevel = document.querySelector("#danger-level");
const dangerMessage = document.querySelector("#danger-message");
const levelMeter = document.querySelector(".level-meter");

function updateDangerLevel(level) {
  const messages = {
    1: {
      title: "Level 1: Caution",
      text: "The app checks if the user is okay and prepares support options.",
    },
    2: {
      title: "Level 2: Warning",
      text: "Trusted contacts and nearby helpers are alerted with the user's live location.",
    },
    3: {
      title: "Level 3: Emergency",
      text: "Trusted contacts, nearby helpers, and emergency services receive urgent alert details.",
    },
  };

  dangerLevel.textContent = messages[level].title;
  dangerMessage.textContent = messages[level].text;

  const meterBars = levelMeter.querySelectorAll("span");
  meterBars.forEach((bar, index) => {
    bar.classList.toggle("active", index < level);
  });
}

if (signalForm && analyzeButton && resetButton && dangerLevel && dangerMessage && levelMeter) {
  analyzeButton.addEventListener("click", () => {
    const selectedSignals = signalForm.querySelectorAll("input[name='signal']:checked");
    const signalValues = Array.from(selectedSignals).map((input) => input.value);
    let level = 1;

    if (signalValues.length >= 2 || signalValues.includes("voice") || signalValues.includes("movement")) {
      level = 2;
    }

    if (
      signalValues.length >= 3 ||
      signalValues.includes("response") ||
      (signalValues.includes("heart") && signalValues.includes("movement"))
    ) {
      level = 3;
    }

    updateDangerLevel(level);
  });

  resetButton.addEventListener("click", () => {
    window.setTimeout(() => updateDangerLevel(1), 0);
  });
}
