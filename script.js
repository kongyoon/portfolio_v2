// Initialize year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme handling
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.querySelector(".theme-label");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  if (theme === "dark") {
    themeIcon.textContent = "☼";
    themeLabel.textContent = "Light";
  } else {
    themeIcon.textContent = "☾";
    themeLabel.textContent = "Dark";
  }
}

(function initTheme() {
  const stored = window.localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") {
    applyTheme(stored);
  } else {
    const prefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }
})();

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  window.localStorage.setItem("theme", next);
});

// Scroll reveal (Framer Motion-like)
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

reveals.forEach((el) => observer.observe(el));
