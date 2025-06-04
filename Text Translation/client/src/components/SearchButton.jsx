import { useTranslation } from '../context/TranslationContext';
import { Sparkles } from "lucide-react";
import axios from "axios";

export default function SearchButton() {
  const {
    text, sourceLang, targetLang,
    setTranslatedText, setIsLoading, isLoading
  } = useTranslation();

  const handleTranslate = async () => {
    if (!text.trim()) {
      alert("Please enter text to translate.");
      return;
    }

    setIsLoading(true);
    setTranslatedText("");

    try {
      const res = await axios.get('https://api.mymemory.translated.net/get', {
        params: {
          q: text,
          langpair: `${sourceLang}|${targetLang}`
        }
      });

      setTranslatedText(res.data.responseData.translatedText);
    } catch (err) {
      console.error('Translation error:', err);
      setTranslatedText("Translation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleTranslate}
      disabled={isLoading || !text.trim()}
      className="cursor-pointer w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-red-700 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
          <span>Translating...</span>
        </>
      ) : (
        <>
          <Sparkles className="w-5 h-5" />
          <span>Translate</span>
        </>
      )}
    </button>
  );
}
