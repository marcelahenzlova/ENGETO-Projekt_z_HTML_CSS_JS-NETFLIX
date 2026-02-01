// Výběr HTML elementů
const select = document.querySelector(".select") as HTMLSelectElement | null;
const gallery = document.querySelector(".gallery") as HTMLElement | null;

// Kontrola existence elementů
if (select && gallery) {
  // Ošetření chyb
  try {
    // Deaktivace defaultní možnosti roletky
    const defaultOption = select.options[0]!;
    defaultOption.disabled = true;

    // Funkce pro načtení obrázků z API
    const loadShows = async (): Promise<void> => {
      // Vyprázdnění galerie v případě žádné či defaultní hodnoty
      const value = select.value;
      if (!value || value === "default") {
        gallery.innerHTML = "";
        return;
      }

      const url = `https://api.tvmaze.com/search/shows?q=${value}`;

      try {
        // Odeslání požadavku a vrácení dat jako JSON
        const response = await fetch(url);
        if (!response.ok) throw new Error("❌ Síťová chyba při načítání dat");
        const data = await response.json();

        // Vyprázdnění galerie
        gallery.innerHTML = "";

        // Vytvoření nového elementu img a přidání obrázků do galerie
        data.forEach((item: any) => {
          const show = item.show;

          if (!show.image || !show.image.medium) return;

          const img = document.createElement("img");
          img.src = show.image.medium;
          img.alt = `Obrázek seriálu: ${show.name}`;
          img.classList.add("img");

          gallery.appendChild(img);
        });

        // Vypsání upozornění v případě, že nebude nalezen žádný obrázek
        if (gallery.children.length === 0) {
          gallery.innerHTML = "<p>❌ Žádné obrázky nebyly nalezeny.</p>";
        }
        // Zachycení chyb
      } catch (error) {
        console.error("Chyba při načítání dat:", error);
        gallery.innerHTML =
          "<p>❌ Chyba při načítání dat. Zkuste stránku obnovit.</p>";
      }
    };

    // Událost, která vyvolá při změně hodnoty v roletce funkci pro načtení obrázků
    select.addEventListener("change", loadShows);
  } catch (error) {
    console.error("Nalezena chyba :", error);
  }
} else {
  console.warn("Jeden z elementů nebyl nalezen.");
}
