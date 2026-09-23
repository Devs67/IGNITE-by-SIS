const path = location.pathname;
const base = new URL(".", document.currentScript.src).href;
document.head.insertAdjacentHTML(
  "beforeend",
  `<link rel="stylesheet" href="${base}overrides.css">`,
);
const items = [
  ["About", "about/"],
  ["Challenges", "challenges/"],
  ["Schedule", "schedule/"],
  ["Rubrics", "rubrics/"],
  ["Resources", "resources/"],
  ["FAQ", "faq/"],
];
const active = (label) => (path.includes(label.toLowerCase()) ? "active" : "");
document
  .querySelectorAll("[data-header]")
  .forEach(
    (el) =>
      (el.innerHTML = `<header class="site-header"><nav class="nav"><a class="brand" href="${base}"><span>SREENIDHI</span><b>IGNITE</b></a><button class="menu" aria-label="Open navigation">MENU +</button><div class="navlinks">${items.map(([l, u]) => `<a class="${active(l)}" href="${base + u}">${l.toUpperCase()}</a>`).join("")}<a class="button" href="${base}register/">REGISTER <span class="arrow">→</span></a></div></nav></header>`),
  );
document.querySelectorAll("[data-footer]").forEach(
  (el) =>
    (el.innerHTML = `<footer class="footer"><div class="footer-in"><div><h3>SREENIDHI<br>IGNITE</h3><p>Build ideas. Make something real. Step into the challenge.</p></div><div><b>EXPLORE</b>${items
      .slice(0, 4)
      .map(([l, u]) => `<a href="${base + u}">${l}</a>`)
      .join(
        "",
      )}</div><div><b>TAKE PART</b><a href="${base}register/">Register</a><a href="${base}faq/">Questions</a><a href="#">[CONTACT DETAILS TO BE ADDED]</a></div><small>© Sreenidhi International School · Event details to be confirmed</small></div></footer>`),
);
document.querySelector(".menu")?.addEventListener("click", (e) => {
  document.querySelector(".navlinks").classList.toggle("open");
  e.currentTarget.textContent = document
    .querySelector(".navlinks")
    .classList.contains("open")
    ? "CLOSE ×"
    : "MENU +";
});
document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("pointermove", (event) => {
    const box = button.getBoundingClientRect(),
      x = ((event.clientX - box.left) / box.width) * 100,
      y = ((event.clientY - box.top) / box.height) * 100;
    button.style.setProperty("--x", `${x}%`);
    button.style.setProperty("--y", `${y}%`);
    button.style.setProperty("--mx", `${(x - 50) * 0.035}px`);
    button.style.setProperty("--my", `${(y - 50) * 0.025}px`);
  });
  button.addEventListener("pointerleave", () => {
    button.style.removeProperty("--mx");
    button.style.removeProperty("--my");
  });
});
addEventListener("scroll", () =>
  document
    .querySelector(".site-header")
    ?.classList.toggle("scrolled", scrollY > 30),
);
const motion = ["motion-clip", "motion-left", "motion-right", "motion-pop"];
const revealItems = [...document.querySelectorAll(".reveal")];
const heroContent = document.querySelector(".hero-content");

if (heroContent) {
  heroContent.classList.remove("reveal");
  heroContent.style.opacity = "1";
  heroContent.style.transform = "none";
}

revealItems.forEach((e, index) => {
  if (e === heroContent) return;

  e.classList.add(motion[index % motion.length]);
  if (e.classList.contains("challenge")) {
    e.classList.remove("motion-clip", "motion-left", "motion-right");
    e.classList.add("motion-pop");
  }
});

const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      entry.target.classList.toggle("visible", entry.isIntersecting);
    }),
  { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
);

revealItems
  .filter((e) => e !== heroContent)
  .forEach((e) => io.observe(e));
document.querySelectorAll(".faq-q").forEach((q) =>
  q.addEventListener("click", () => {
    const i = q.parentElement;
    i.classList.toggle("open");
    q.querySelector("i").textContent = i.classList.contains("open") ? "−" : "+";
  }),
);
document.querySelector("form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const n = document.querySelector("[data-form-status]");
  n.textContent =
    "Registration destination pending — please connect this form to the official registration service before publishing.";
});
