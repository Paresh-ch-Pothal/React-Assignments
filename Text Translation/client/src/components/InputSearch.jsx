import { useTranslation } from '../context/TranslationContext';

export default function InputSearch() {
  const { text, setText } = useTranslation();

  return (
    <div className="mb-6">
      <label className="block mb-3 font-semibold text-slate-300">
        Enter text to translate
      </label>
      <textarea
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none backdrop-blur-sm"
        placeholder="Type your message here..."
      />
    </div>
  );
}
