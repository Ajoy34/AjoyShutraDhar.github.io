(function () {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  const roleEl = document.getElementById("typed-role");

  const roles = [
    "Data Scientist",
    "AI & ML Researcher",
    "Civic tech innovator @ UNDP"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeRole() {
    const current = roles[roleIndex];
    if (!deleting) {
      roleEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeRole, 2200);
        return;
      }
      setTimeout(typeRole, 80);
    } else {
      roleEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 400);
        return;
      }
      setTimeout(typeRole, 40);
    }
  }

  typeRole();

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  });

  toggle?.addEventListener("click", () => {
    links.classList.toggle("open");
  });

  links?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => links.classList.remove("open"));
  });

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__links a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((s) => observer.observe(s));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  const EMAIL = "ajoyshutradhar53@gmail.com";
  const toast = document.getElementById("toast");

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(() => toast.classList.remove("show"), 4500);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      return true;
    } catch {
      return false;
    }
  }

  document.querySelectorAll(".email-link").forEach((link) => {
    link.addEventListener("click", async () => {
      const copied = await copyEmail();
      const action = link.dataset.emailAction;
      const hint =
        action === "discussion"
          ? "Opening email for a discussion…"
          : "Opening email to contact you…";
      showToast(copied ? `Email copied: ${EMAIL}. ${hint}` : `${hint} (${EMAIL})`);
    });
  });
})();
