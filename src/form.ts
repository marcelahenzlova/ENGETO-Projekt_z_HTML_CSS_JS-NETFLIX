// Výběr HTML elementů
const form = document.querySelector(
  ".form-container",
) as HTMLFormElement | null;
const password = document.getElementById("password") as HTMLInputElement | null;
const passwordConfirm = document.getElementById(
  "passwordConfirm",
) as HTMLInputElement | null;
const passwordError = document.getElementById(
  "passwordError",
) as HTMLElement | null;
const passwordConfirmError = document.getElementById(
  "passwordConfirmError",
) as HTMLElement | null;

// Kontrola existence elementů
if (
  form &&
  password &&
  passwordConfirm &&
  passwordError &&
  passwordConfirmError
) {
  // Ošetření chyb
  try {
    // Pattern hesla
    const passwordPattern = new RegExp(password.pattern);

    // Pomocná funkce, která řeší upozornění ohledně hesel a jejich viditelnost
    const setMessage = (
      el: HTMLElement,
      text: string = "",
      show: boolean = false,
    ): void => {
      el.textContent = text;
      el.style.display = show ? "block" : "none";
    };

    // Pomocná funkce, která řeší vizualní stav upozornění ohledně hesel
    const setState = (
      elements: HTMLElement[],
      state: "" | "error" | "success",
    ): void => {
      elements.forEach((el) => {
        el.classList.toggle("error", state === "error");
        el.classList.toggle("success", state === "success");
      });
    };

    // Validace hesla
    const validatePassword = (): boolean => {
      const value = password.value.trim();

      if (!value) {
        setMessage(passwordError);
        setState([password], "");
        return false;
      }

      const valid = passwordPattern.test(value);

      setMessage(
        passwordError,
        valid
          ? "✅ Heslo je validní."
          : "❌ Heslo musí mít minimálně 6 znaků a obsahovat velké, malé písmeno a číslo!",
        true,
      );

      setState([password], valid ? "success" : "error");
      return valid;
    };

    // Kontrola shody hesel
    const checkPasswordsMatch = (): boolean => {
      const pass = password.value.trim();
      const confirm = passwordConfirm.value.trim();

      if (!pass && !confirm) {
        setState([password, passwordConfirm], "");
        setMessage(passwordConfirmError);
        return false;
      }

      if (!pass && confirm) {
        setState([password, passwordConfirm], "error");
        setMessage(
          passwordConfirmError,
          "❌ Vyplňte nejprve pole 'Vaše heslo'.",
          true,
        );
        return false;
      }

      const match = pass === confirm;
      setState([password, passwordConfirm], match ? "success" : "error");
      setMessage(
        passwordConfirmError,
        match ? "✅ Hesla se shodují." : "❌ Hesla se neshodují.",
        true,
      );
      return match;
    };

    // Spuštění validace hesla a kontroly shody hesel
    password.addEventListener("input", () => {
      validatePassword();
      checkPasswordsMatch();
    });

    passwordConfirm.addEventListener("input", checkPasswordsMatch);

    // Kontrola při odeslání formuláře
    form.addEventListener("submit", (e: Event) => {
      const isValidPassword = validatePassword();
      const doPasswordsMatch = checkPasswordsMatch();

      if (!isValidPassword || !doPasswordsMatch) {
        e.preventDefault();
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Nalezena chyba :", error.message);
    } else {
      console.error("Nalezena chyba :", error);
    }
  }
} else {
  console.warn("Nebyl nalezen některý z elementů formuláře.");
}
