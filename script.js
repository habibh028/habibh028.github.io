/* =====================================================
   HABIB HUBADDILAH – PORTFOLIO SCRIPT
   ===================================================== */

"use strict";

/* ===================== LOADER ===================== */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hidden");
      document.body.style.overflow = "";
    }, 800);
  }
});
document.body.style.overflow = "hidden";

/* ===================== AOS INIT ===================== */
AOS.init({
  duration: 700,
  easing: "ease-out-cubic",
  once: true,
  offset: 60,
});

/* ===================== TYPED.JS – Hero Terminal ===================== */
document.addEventListener("DOMContentLoaded", () => {
  const typedEl = document.getElementById("typed-role");
  if (typedEl && typeof Typed !== "undefined") {
    new Typed("#typed-role", {
      strings: [
        "Network Engineer",
        "Network Administrator",
        "Linux Sysadmin",
        "MikroTik Specialist",
        "NOC Engineer",
      ],
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 2000,
      loop: true,
      showCursor: false,
    });
  }
});

/* ===================== NAVBAR – Scroll & Active ===================== */
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const updateNav = () => {
  const scrollY = window.scrollY;

  // Scrolled state
  if (scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Active link highlight
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
};

window.addEventListener("scroll", updateNav, { passive: true });
updateNav();

/* ===================== HAMBURGER MENU ===================== */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger?.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".mobile-menu .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

/* ===================== DARK / LIGHT THEME TOGGLE ===================== */
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const htmlEl = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "dark";
htmlEl.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggle?.addEventListener("click", () => {
  const current = htmlEl.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  htmlEl.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  if (!themeIcon) return;
  themeIcon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

/* ===================== SCROLL PROGRESS BAR ===================== */
const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = `${pct}%`;
}, { passive: true });

/* ===================== BACK TO TOP ===================== */
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop?.classList.add("visible");
  } else {
    backToTop?.classList.remove("visible");
  }
}, { passive: true });

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ===================== SKILL BAR ANIMATION ===================== */
const skillFills = document.querySelectorAll(".skill-bar-fill");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const width = el.getAttribute("data-width");
        el.style.width = `${width}%`;
        skillObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.3 }
);

skillFills.forEach((fill) => skillObserver.observe(fill));

/* ===================== PARTICLES CANVAS ===================== */
(function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let W, H, particles;

  const isDark = () => document.documentElement.getAttribute("data-theme") === "dark";

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function createParticles() {
    const count = Math.min(80, Math.floor((W * H) / 12000));
    particles = Array.from({ length: count }, () => ({
      x:  randomBetween(0, W),
      y:  randomBetween(0, H),
      vx: randomBetween(-0.3, 0.3),
      vy: randomBetween(-0.3, 0.3),
      r:  randomBetween(1, 2.5),
    }));
  }

  function drawLine(p1, p2, dist) {
    const alpha = 1 - dist / 120;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = isDark()
      ? `rgba(37,99,235,${alpha * 0.35})`
      : `rgba(37,99,235,${alpha * 0.15})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);

    // Update
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });

    // Connect
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) drawLine(particles[i], particles[j], dist);
      }
    }

    // Draw dots
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = isDark()
        ? "rgba(59,130,246,0.5)"
        : "rgba(37,99,235,0.25)";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  const resizeObserver = new ResizeObserver(() => {
    resize();
    createParticles();
  });
  resizeObserver.observe(canvas.parentElement || document.body);

  resize();
  createParticles();
  animate();
})();

/* ===================== CONTACT FORM (demo) ===================== */
const contactForm = document.getElementById("contact-form");
const formFeedback = document.getElementById("form-feedback");

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = contactForm.querySelector("#f-name").value.trim();
  const email = contactForm.querySelector("#f-email").value.trim();
  const message = contactForm.querySelector("#f-message").value.trim();

  if (!name || !email || !message) {
    formFeedback.textContent = "Please fill in all required fields.";
    formFeedback.className = "form-feedback error";
    return;
  }

  // Simulate submission (replace with Formspree / EmailJS for production)
  const btn = contactForm.querySelector("button[type=submit]");
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

  setTimeout(() => {
    formFeedback.textContent = "✓ Message sent! I'll get back to you soon.";
    formFeedback.className = "form-feedback success";
    contactForm.reset();
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  }, 1400);
});

/* ===================== SMOOTH SCROLL OFFSET ===================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"), 10) || 72;
    const top = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: "smooth" });
  });
});
