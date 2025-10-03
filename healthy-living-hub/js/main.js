document.addEventListener("DOMContentLoaded", () => {
  // Footer info
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;

  // Hamburger menu
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("open");
  });

  // Dark mode toggle
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  // Apply saved theme
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    root.classList.add("dark");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    root.classList.toggle("dark");
    const darkMode = root.classList.contains("dark");
    themeToggle.textContent = darkMode ? "☀️" : "🌙";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  });
});


export function initGlobal() {
  // your global initialization code
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const lastModified = document.getElementById("lastModified");
  if (lastModified) {
    lastModified.textContent = document.lastModified;
  }

  // nav toggle, theme toggle etc.
}
