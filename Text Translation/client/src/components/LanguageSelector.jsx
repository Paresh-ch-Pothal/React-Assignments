import { useTranslation } from '../context/TranslationContext';
import { ArrowRightLeft } from "lucide-react";

export default function LanguageSelector() {
  const {
    sourceLang, setSourceLang,
    targetLang, setTargetLang,
    languages,
    isLoading
  } = useTranslation();

  const swapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-4 mb-6">
      <div className="flex-1 mb-4 lg:mb-0">
        <label className="block mb-2 font-semibold text-slate-300" htmlFor="source-lang">From</label>
        <select
          id="source-lang"
          className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white"
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
        >
          {languages.map(({ code, name }) => (
            <option key={code} value={code} className="bg-slate-800">{name}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-center lg:mb-0 mb-4">
        <button
          onClick={swapLanguages}
          className="p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl border border-slate-600 transition-all duration-300"
          disabled={isLoading}
        >
          <ArrowRightLeft className="w-5 h-5 text-slate-300" />
        </button>
      </div>

      <div className="flex-1">
        <label className="block mb-2 font-semibold text-slate-300" htmlFor="target-lang">To</label>
        <select
          id="target-lang"
          className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          {languages.map(({ code, name }) => (
            <option key={code} value={code} className="bg-slate-800">{name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
