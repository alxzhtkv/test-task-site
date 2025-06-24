const buttons = document.querySelectorAll(".subscribe-option");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((b) => b.setAttribute("data-selected", "false"));
    button.setAttribute("data-selected", "true");
  });
});

const getLang = () => {
  const languages = ["de", "en", "es", "fr", "ja", "pt"];
  const params = new URLSearchParams(window.location.search);
  const lang = languages.includes([...params.keys()][0]) ? [...params.keys()][0] : "en";
  return lang;
};

const loadTranslation = async (lang) => {
  try {
    const response = await fetch(`./i18n/${lang}.json`);
    if (!response.ok) {
      console.error("Translation file not found");
      return {};
    }
    return await response.json();
  } catch (e) {
    console.error("Translation load error:", e);
    return {};
  }
};

const translatePage = (translations, lang) => {
  document.documentElement.setAttribute("data-lang", lang);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    let translation = translations[key];

    if (!translation) return;

    const vars = el.getAttribute("data-i18n-vars");
    if (vars) {
      const values = JSON.parse(vars);
      Object.keys(values).forEach((k) => {
        const regex = new RegExp(`{{\\s*${k}\\s*}}`, "g");
        translation = translation.replace(regex, values[k]);
      });
    }

    el.innerHTML = translation;
  });
};

const initTranslation = async () => {
  const lang = getLang();
  const translations = await loadTranslation(lang);
  translatePage(translations, lang);
};

initTranslation();
