// Výběr HTML elementů
const scrollBtn: HTMLElement | null = document.getElementById("scrollToTop");
const showAfter: number = 300;

// Kontrola existence elementů
if (scrollBtn) {
  // Ošetření chyb
  try {
    // Funkce pro zobrazení / skrytí ikonky
    const toggleScrollBtn = (): void => {
      if (window.scrollY > showAfter) {
        scrollBtn.classList.add("show");
      } else {
        scrollBtn.classList.remove("show");
      }
    };

    // Událost, která při scrollu vyvolá funkci pro zobrazení/skrytí ikonky
    window.addEventListener("scroll", toggleScrollBtn);

    // Událost, která při kliknutí na ikonku vrátí stránku nahoru a ikonka zmizí
    scrollBtn.addEventListener("click", (e: MouseEvent): void => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      scrollBtn.classList.remove("show");
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Nalezena chyba:", error.message);
    } else {
      console.error("Nalezena neznámá chyba:", error);
    }
  }
} else {
  console.warn("Element ikonky s id 'scrollToTop' nebyl nalezen.");
}
