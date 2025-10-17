import React, { createContext, useContext, useState, useEffect } from "react";

export const translations = {
  en: {
    title: "🧮 Kids Math Trainer",
    selectOperations: "Select one or more operations",
    selectNumbers: "Select one or more numbers (1–20)",
    mode: "Mode",
    manual: "Manual Input",
    multiple: "Multiple Choice",
    numQuestions: "Number of Questions",
    timer: "⏱️ Time per Question",
    noTimer: "None",
    start: "Start Quiz",
    question: "Question",
    validate: "Validate",
    correct: "✅ Correct!",
    wrong: "❌ Wrong! Answer:",
    timeUp: "⏰ Time’s up!",
    finished: "🎉 Quiz Finished!",
    score: "You got {score} out of {total} correct.",
    backToMenu: "Back to Menu",
    resultExcellent: "Excellent! 🎉",
    resultGood: "Well done! 👍",
    resultWork: "Keep practicing 💪",
    selectWarning: "Please select at least one operation and one number!",
    info: "Information",
  },
  fr: {
    title: "🧮 Les opérations mathématiques",
    selectOperations: "Sélectionnez une ou plusieurs opérations",
    selectNumbers: "Sélectionnez un ou plusieurs nombres (1–20)",
    mode: "Mode",
    manual: "Saisie manuelle",
    multiple: "Choix multiple",
    numQuestions: "Nombre de questions",
    timer: "⏱️ Temps par question",
    noTimer: "Aucun",
    start: "Commencer le quiz",
    question: "Question",
    validate: "Valider",
    correct: "✅ Correct !",
    wrong: "❌ Faux ! Réponse :",
    timeUp: "⏰ Temps écoulé !",
    finished: "🎯 Résultat du quiz",
    score: "Vous avez {score} bonnes réponses sur {total}.",
    backToMenu: "Retour au menu",
    resultExcellent: "Excellent ! 🎉",
    resultGood: "Bien joué ! 👍",
    resultWork: "À retravailler 💪",
    selectWarning: "Veuillez sélectionner au moins une opération et un nombre !",
    info: "Information",
  },
};

// --- Context setup ---
const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const browserLang = navigator.language.startsWith("fr") ? "fr" : "en";
  const [lang, setLang] = useState(localStorage.getItem("lang") || browserLang);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = (key, params = {}) => {
    let text = translations[lang][key] || key;
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, v);
    });
    return text;
  };

  return (
    <TranslationContext.Provider value={{ t, lang, setLang }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
