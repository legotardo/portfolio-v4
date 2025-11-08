export function toggleWin95Theme() {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");
  const next = current === "win95" ? "modern" : "win95";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

export function initTheme() {
  const saved = localStorage.getItem("theme") || "modern";
  document.documentElement.setAttribute("data-theme", saved);
}
