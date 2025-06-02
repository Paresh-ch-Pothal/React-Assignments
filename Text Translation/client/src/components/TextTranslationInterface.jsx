import React, { useState } from "react";
import { Languages, ArrowRightLeft, Sparkles } from "lucide-react";
import axios from 'axios'
import { useEffect } from "react";
import logo from '../assets/logo.png'


export default function LinguaFlowTranslator() {
  const [text, setText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [languages, setLanguages] = useState([])

  const SetLanguages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "ta", name: "Tamil" },
    { code: "te", name: "Telugu" },
    { code: "bn", name: "Bengali" }
  ]


  const handleTranslate = async () => {
    if (!text.trim()) {
      alert("Please enter text to translate.");
      return;
    }

    setIsLoading(true);
    setTranslatedText("");

    try {
      const res = await axios.get('https://api.mymemory.translated.net/get', {
        params : {
          q: text,
          langpair: `${sourceLang}|${targetLang}`
        }
      });

      console.log(res)
      setTranslatedText(res.data.responseData.translatedText);
    } catch (err) {
      console.error('Translation error:', err);
      setTranslatedText("Translation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  // basically for swapping the languages
  const swapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
        </div>
      </div>

      <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 max-w-4xl w-full p-8">

        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-3">

            {/* <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Languages className="w-6 h-6 text-white" />
            </div> */}
            <img className="w-12 h-12 rounded-2xl" src={logo} alt="" />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                TextNinja
              </h1>
              <p className="text-slate-400 text-sm">Break language barriers with style</p>
            </div>
          </div>
        </div>

        {/* Input Text Area */}
        <div className="mb-6">
          <label className="block mb-3 font-semibold text-slate-300">
            Enter text to translate
          </label>
          <textarea
            rows={5}
            className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none backdrop-blur-sm"
            placeholder="Type your message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Language Selection */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-4 mb-6">
          <div className="flex-1 mb-4 lg:mb-0">
            <label className="block mb-2 font-semibold text-slate-300" htmlFor="source-lang">
              From
            </label>
            <select
              id="source-lang"
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
            >
              {SetLanguages.map(({ code, name }) => (
                <option key={code} value={code} className="bg-slate-800">
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center lg:mb-0 mb-4">
            <button
              onClick={swapLanguages}
              className="p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl border border-slate-600 transition-all duration-300 group"
              disabled={isLoading}
            >
              <ArrowRightLeft className="w-5 h-5 text-slate-300 group-hover:text-purple-400 transition-colors duration-300" />
            </button>
          </div>

          <div className="flex-1">
            <label className="block mb-2 font-semibold text-slate-300" htmlFor="target-lang">
              To
            </label>
            <select
              id="target-lang"
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            >
              {SetLanguages.map(({ code, name }) => (
                <option key={code} value={code} className="bg-slate-800">
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Translate Button */}
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

        {/* Translation Result */}
        <div className="mt-8">
          <label className="block mb-3 font-semibold text-slate-300">
            Translation
          </label>
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

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            Fast • Accurate • Seamless
          </p>
        </div>
      </div>
    </div>
  );
}