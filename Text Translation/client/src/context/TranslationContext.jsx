import React, { createContext, useContext, useState } from "react";

const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "ta", name: "Tamil" },
    { code: "te", name: "Telugu" },
    { code: "bn", name: "Bengali" },
];

const TranslationContext = createContext(null)

export const useTranslation = () => {
    return useContext(TranslationContext)
}

export const TranslationProvider = ({ children }) => {
    const [text, setText] = useState("");
    const [sourceLang, setSourceLang] = useState("en");
    const [targetLang, setTargetLang] = useState("es");
    const [translatedText, setTranslatedText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    return (
        <TranslationContext.Provider
            value={{text,setText,sourceLang,setSourceLang,targetLang,setTargetLang,translatedText,setTranslatedText,isLoading,setIsLoading,languages}} > {children}
        </TranslationContext.Provider>
    )
}