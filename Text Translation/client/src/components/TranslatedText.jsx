import { useTranslation } from '../context/TranslationContext';

export default function TranslatedText() {
  const { translatedText, isLoading } = useTranslation();

  return (
    <div className="mt-8">
      <label className="block mb-3 font-semibold text-slate-300">Translation</label>
      <div className="p-6 bg-slate-700/30 border border-slate-600 rounded-xl min-h-[120px] backdrop-blur-sm">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center space-x-3 text-slate-400">
              <div className="animate-bounce w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="animate-bounce w-2 h-2 bg-purple-500 rounded-full delay-100"></div>
              <div className="animate-bounce w-2 h-2 bg-purple-500 rounded-full delay-200"></div>
              <span className="ml-3">Processing your translation...</span>
            </div>
          </div>
        ) : translatedText ? (
          <p className="text-white text-lg leading-relaxed break-words">
            {translatedText}
          </p>
        ) : (
          <p className="text-slate-400 text-center">
            Your translation will appear here...
          </p>
        )}
      </div>
    </div>
  );
}
