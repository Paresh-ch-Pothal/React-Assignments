
import LanguageSelector from '../components/LanguageSelector';
import SearchButton from '../components/SearchButton';
import TranslatedText from '../components/TranslatedText';
import InputSearch from '../components/InputSearch';
import logo from '../assets/logo.png'

export default function TranslatorPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
            <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 max-w-4xl w-full p-8">
                <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center space-x-3">
                        <img className="w-12 h-12 rounded-2xl" src={logo} alt="" />
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                TextNinja
                            </h1>
                            <p className="text-slate-400 text-sm">Break language barriers with style</p>
                        </div>
                    </div>
                </div>
                <InputSearch />
                <LanguageSelector />
                <SearchButton />
                <TranslatedText />
            </div>
        </div>
    );
}
