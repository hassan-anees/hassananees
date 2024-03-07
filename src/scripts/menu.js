function init() {
  const burger = document.getElementById("menuButton");
  const nav = document.getElementById("menuList");

  burger?.addEventListener("click", () => {
    nav?.classList.toggle("hidden");
  });

  // Clean up by destroying instances and removing event listeners
  document.addEventListener(
    "astro:before-swap",
    () => {
      // SomeClass.destroy()
      // document.removeEventListener(...)
    },
    { once: true }
  );
}

// Initialize on first load
init();

// Re-initialize after swapping pages
document.addEventListener("astro:after-swap", init);
