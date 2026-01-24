// Výběr HTML elementů
const form = document.querySelector(".form-container");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("passwordConfirm");
const passwordError = document.getElementById("passwordError");
const passwordConfirmError = document.getElementById("passwordConfirmError");
// Kontrola existence elementů
if (form &&
    password &&
    passwordConfirm &&
    passwordError &&
    passwordConfirmError) {
    // Ošetření chyb
    try {
        // Pattern hesla
        const passwordPattern = new RegExp(password.pattern);
        // Pomocná funkce, která řeší upozornění ohledně hesel a jejich viditelnost
        const setMessage = (el, text = "", show = false) => {
            el.textContent = text;
            el.style.display = show ? "block" : "none";
        };
        // Pomocná funkce, která řeší vizualní stav upozornění ohledně hesel
        const setState = (elements, state) => {
            elements.forEach((el) => {
                el.classList.toggle("error", state === "error");
                el.classList.toggle("success", state === "success");
            });
        };
        // Validace hesla
        const validatePassword = () => {
            const value = password.value.trim();
            if (!value) {
                setMessage(passwordError);
                setState([password], "");
                return false;
            }
            const valid = passwordPattern.test(value);
            setMessage(passwordError, valid
                ? "✅ Heslo je validní."
                : "❌ Heslo musí mít minimálně 6 znaků a obsahovat velké, malé písmeno a číslo!", true);
            setState([password], valid ? "success" : "error");
            return valid;
        };
        // Kontrola shody hesel
        const checkPasswordsMatch = () => {
            const pass = password.value.trim();
            const confirm = passwordConfirm.value.trim();
            if (!pass && !confirm) {
                setState([password, passwordConfirm], "");
                setMessage(passwordConfirmError);
                return false;
            }
            if (!pass && confirm) {
                setState([password, passwordConfirm], "error");
                setMessage(passwordConfirmError, "❌ Vyplňte nejprve pole 'Vaše heslo'.", true);
                return false;
            }
            const match = pass === confirm;
            setState([password, passwordConfirm], match ? "success" : "error");
            setMessage(passwordConfirmError, match ? "✅ Hesla se shodují." : "❌ Hesla se neshodují.", true);
            return match;
        };
        // Spuštění validace hesla a kontroly shody hesel
        password.addEventListener("input", () => {
            validatePassword();
            checkPasswordsMatch();
        });
        passwordConfirm.addEventListener("input", checkPasswordsMatch);
        // Kontrola při odeslání formuláře
        form.addEventListener("submit", (e) => {
            const isValidPassword = validatePassword();
            const doPasswordsMatch = checkPasswordsMatch();
            if (!isValidPassword || !doPasswordsMatch) {
                e.preventDefault();
            }
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Nalezena chyba :", error.message);
        }
        else {
            console.error("Nalezena chyba :", error);
        }
    }
}
else {
    console.warn("Nebyl nalezen některý z elementů formuláře.");
}
export {};
