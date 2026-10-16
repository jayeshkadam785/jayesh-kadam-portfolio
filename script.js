// ========================================
// JAYESH KADAM — PORTFOLIO JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const themeToggle = document.getElementById("themeToggle");

  // Mobile Navigation
  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");

      const isOpen = sidebar.classList.contains("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });
  }

  // Navigation Links
  const navigationLinks = document.querySelectorAll(
    '.sidebar a, .topnav a'
  );

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("href");

      navigationLinks.forEach((item) => {
        item.classList.toggle(
          "active",
          item.getAttribute("href") === target
        );
      });

      sidebar?.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // Dark / Light Theme
  if (themeToggle) {
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
      document.body.classList.add("light-mode");
    }

    updateThemeButton();

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");

      const theme = document.body.classList.contains("light-mode")
        ? "light"
        : "dark";

      localStorage.setItem("portfolio-theme", theme);
      updateThemeButton();
    });

    function updateThemeButton() {
      const isLight = document.body.classList.contains("light-mode");

      themeToggle.textContent = isLight ? "☾" : "☼";
      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
      );
    }
  }

  // Active Section Tracking
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.id;

            navigationLinks.forEach((link) => {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${currentId}`
              );
            });
          }
        });
      },
      {
        rootMargin: "-25% 0px -65% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
  }
});
