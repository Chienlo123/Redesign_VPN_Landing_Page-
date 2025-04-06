/* Smooth Scrolling for Anchor Links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* Lazy Loading for Images */
document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          img.classList.remove("lazy");
          obs.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => observer.observe(img));
  }
});

/* Animate Cards on Scroll */
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".vpn-card, .ep-card");
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
};
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

/* Track CTA Button Clicks */
document.querySelectorAll(".cta-button").forEach(button => {
  button.addEventListener("click", function () {
    const vpnName = this.closest(".vpn-card").querySelector("h3").textContent;
    console.log(`CTA clicked for ${vpnName}`);
  });
});

/* Editor's Picks Interactions */
document.querySelectorAll(".ep-card").forEach(card => {
  card.addEventListener("click", (e) => {
    if (!e.target.closest("a, button")) {
      const link = card.querySelector(".ep-button");
      if (link) {
        window.open(link.href, "_blank");
      }
    }
  });
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const link = card.querySelector(".ep-button");
      if (link) {
        window.open(link.href, "_blank");
      }
    }
  });
  card.setAttribute("tabindex", "0");
});
