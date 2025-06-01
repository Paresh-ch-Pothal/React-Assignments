import React, { useState, useEffect } from "react";
import { Search, Film, Star, Calendar, Clock, Award, Play } from "lucide-react";
import axios from 'axios'
import logo from '../assets/logo.png'

export default function MovieInterface() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState({});
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);

    const RAPIDAPI_KEY = import.meta.env.VITE_API_RAPID_KEY;

    useEffect(() => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        //fetching the suggestions of user searched movie
        const fetchSuggestions = async () => {
            setLoading(true);
            try {
                const response = await axios.request({
                    method: 'GET',
                    url: 'https://imdb236.p.rapidapi.com/api/imdb/autocomplete',
                    params: { query },
                    headers: {
                        'x-rapidapi-key': RAPIDAPI_KEY,
                        'x-rapidapi-host': 'imdb236.p.rapidapi.com'
                    }
                });

                // console.log(response.data);

                if (response.data && response.data) {
                    setSuggestions(response.data);
                } else {
                    setSuggestions([]);
                }
            } catch (error) {
                console.error(error);
                setSuggestions([]);
            }
            setLoading(false);
        };

        const debounceTimer = setTimeout(fetchSuggestions, 500);
        return () => clearTimeout(debounceTimer);

    }, [query]);


    // fetching the user selected movie details
    const fetchMovieDetails = async (id) => {
        setLoading(true);
        try {
            suggestions.forEach(e => {
                if (e.id == id) {
                    setSelectedMovie(e)
                    return
                }
            });
        } catch (err) {
            setSelectedMovie(null);
        }
        setLoading(false);
    };

    const clearSearch = () => {
        setQuery("");
        setSelectedMovie(null);
        setSuggestions([]);
    };

    // console.log(selectedMovie)

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
            {/* Animated Background with Movie Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Subtle gradient orbs */}
                <div className="absolute -inset-10 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-500"></div>
                </div>

                {/* Floating Movie Elements */}
                <div className="absolute inset-0 opacity-10">
                    {/* Film strips */}
                    <div className="absolute top-10 left-10 w-8 h-32 bg-gradient-to-b from-yellow-400 to-orange-500 rounded transform rotate-12 animate-pulse"></div>
                    <div className="absolute top-32 right-20 w-6 h-24 bg-gradient-to-b from-red-400 to-pink-500 rounded transform -rotate-45 animate-pulse delay-300"></div>
                    <div className="absolute bottom-20 left-1/4 w-10 h-40 bg-gradient-to-b from-blue-400 to-cyan-500 rounded transform rotate-45 animate-pulse delay-700"></div>

                    {/* Movie reels */}
                    <div className="absolute top-1/3 right-1/4 w-20 h-20 border-4 border-gray-600 rounded-full animate-spin" style={{ animationDuration: '20s' }}>
                        <div className="absolute inset-2 border-2 border-gray-500 rounded-full">
                            <div className="absolute inset-2 bg-gray-600 rounded-full"></div>
                        </div>
                    </div>
                    <div className="absolute bottom-1/3 left-1/3 w-16 h-16 border-4 border-gray-600 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                        <div className="absolute inset-2 border-2 border-gray-500 rounded-full">
                            <div className="absolute inset-2 bg-gray-600 rounded-full"></div>
                        </div>
                    </div>

                    {/* Stars */}
                    <div className="absolute top-20 left-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-1000"></div>
                    <div className="absolute top-40 right-1/3 w-1 h-1 bg-white rounded-full animate-ping delay-500"></div>
                    <div className="absolute bottom-40 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-1500"></div>
                    <div className="absolute bottom-60 left-1/5 w-1 h-1 bg-cyan-400 rounded-full animate-ping delay-2000"></div>

                    {/* Camera elements */}
                    <div className="absolute top-1/2 left-10 w-12 h-8 bg-gray-700 rounded transform rotate-12 animate-pulse delay-800">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-gray-600 rounded-full"></div>
                    </div>
                    <div className="absolute bottom-1/4 right-10 w-10 h-6 bg-gray-700 rounded transform -rotate-12 animate-pulse delay-1200">
                        <div className="absolute right-1 top-1 w-2 h-2 bg-gray-600 rounded-full"></div>
                    </div>
                </div>

                {/* Subtle grid pattern overlay */}
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                }}></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Header with Logo */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                        {/* Logo placeholder - replace with your image */}
                        <img className="w-16 h-16 rounded-2xl" src={logo} alt="FlickPick" />
                        <div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                                FlickPick
                            </h1>
                            <p className="text-gray-300 text-lg">Find it. Watch it. Love it.</p>
                        </div>
                    </div>
                </div>

                {/* Search Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-700/50 relative overflow-hidden">
                        {/* Subtle inner glow effect for search container */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5 rounded-2xl"></div>
                        <div className="relative z-10">
                            <div className="relative mb-6">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        className="w-full pl-12 pr-12 py-4 bg-slate-700/80 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg backdrop-blur-sm"
                                        placeholder="Search for movies, series, documentaries..."
                                        value={query}
                                        onChange={(e) => {
                                            setQuery(e.target.value);
                                            setSelectedMovie(null);
                                        }}
                                        autoComplete="off"
                                    />
                                    {query && (
                                        <button
                                            onClick={clearSearch}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>

                                {/* Search Loading */}
                                {searchLoading && (
                                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
                                    </div>
                                )}
                            </div>

                            {/* Suggestions Dropdown */}
                            {!searchLoading && suggestions.length > 0 && (
                                <div className="bg-slate-700/80 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-600 max-h-80 overflow-auto">
                                    {suggestions.map((movie, index) => (
                                        <div
                                            key={movie.id}
                                            className={`flex items-center p-4 hover:bg-slate-600/50 cursor-pointer transition-all duration-200 ${index !== suggestions.length - 1 ? 'border-b border-slate-600/50' : ''
                                                }`}
                                            onClick={() => fetchMovieDetails(movie.id)}
                                        >
                                            <div className="flex-shrink-0 w-12 h-16 bg-slate-600 rounded-lg overflow-hidden mr-4">
                                                {movie.primaryImage && movie.primaryImage !== "N/A" ? (
                                                    <img
                                                        src={movie.primaryImage}
                                                        alt={movie.originalTitle}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Film className="w-4 h-4 text-slate-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-white font-semibold text-lg">{movie.originalTitle}</h3>
                                                <p className="text-slate-300 flex items-center">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    {movie.releaseDate}
                                                </p>
                                            </div>
                                            <div className="text-blue-400">
                                                <Play className="w-5 h-5" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Movie Details */}
                        {loading && (
                            <div className="mt-8 bg-slate-800/60 backdrop-blur-xl rounded-2xl p-12 shadow-2xl border border-slate-700/50">
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                                    <span className="text-gray-300 text-lg">Loading movie details...</span>
                                </div>
                            </div>
                        )}

                        {selectedMovie && !loading && (
                            <div className="mt-8 bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
                                {selectedMovie && (
                                    <div className="flex flex-col lg:flex-row">
                                        {/* Movie Poster */}
                                        {selectedMovie.primaryImage && (
                                            <div className="lg:w-1/3 p-8 flex justify-center lg:justify-start">
                                                {selectedMovie.primaryImage && selectedMovie.primaryImage !== "N/A" ? (
                                                    <img
                                                        src={selectedMovie.primaryImage}
                                                        alt={selectedMovie.originalTitle}
                                                        className="w-full max-w-sm rounded-xl shadow-2xl"
                                                    />
                                                ) : (
                                                    <div className="w-full max-w-sm h-96 bg-slate-700 rounded-xl flex items-center justify-center">
                                                        <Film className="w-16 h-16 text-slate-400" />
                                                    </div>
                                                )}
                                            </div>)}

                                        {/* Movie Info */}
                                        <div className="lg:w-2/3 p-8">
                                            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                                {selectedMovie.originalTitle}
                                            </h1>

                                            {/* Movie Meta Info */}
                                            <div className="flex flex-wrap gap-4 mb-6">
                                                {selectedMovie.releaseDate && (
                                                    <div className="flex items-center bg-slate-700/50 px-3 py-2 rounded-lg">
                                                        <Calendar className="w-4 h-4 text-blue-400 mr-2" />
                                                        <span className="text-gray-300">{selectedMovie.releaseDate}</span>
                                                    </div>)}
                                                {selectedMovie.Runtime && (
                                                    <div className="flex items-center bg-slate-700/50 px-3 py-2 rounded-lg">
                                                        <Clock className="w-4 h-4 text-blue-400 mr-2" />
                                                        <span className="text-gray-300">{selectedMovie.runtimeMinutes}</span>
                                                    </div>
                                                )}
                                                {selectedMovie.averageRating
                                                    && selectedMovie.averageRating
                                                    !== "N/A" && (
                                                        <div className="flex items-center bg-slate-700/50 px-3 py-2 rounded-lg">
                                                            <Star className="w-4 h-4 text-yellow-400 mr-2" />
                                                            <span className="text-gray-300">{selectedMovie.averageRating
                                                            }/10</span>
                                                        </div>
                                                    )}
                                                {/* {selectedMovie.Awards && selectedMovie.Awards !== "N/A" && (
                                                <div className="flex items-center bg-slate-700/50 px-3 py-2 rounded-lg">
                                                    <Award className="w-4 h-4 text-blue-400 mr-2" />
                                                    <span className="text-gray-300">Awarded</span>
                                                </div>
                                            )} */}
                                            </div>

                                            {/* Genre */}
                                            {selectedMovie.genres && (
                                                <div className="mb-4">
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedMovie.genres.map((genre, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm"
                                                            >
                                                                {genre}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Plot */}
                                            {selectedMovie.description && selectedMovie.description !== "N/A" && (
                                                <div className="mb-6">
                                                    <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                                                    <p className="text-slate-300 leading-relaxed text-lg">
                                                        {selectedMovie.description}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>)}
                            </div>
                        )}

                        {/* No Results */}
                        {!searchLoading && query.length >= 3 && suggestions.length === 0 && !selectedMovie && (
                            <div className="mt-8 bg-slate-800/60 backdrop-blur-xl rounded-2xl p-12 shadow-2xl border border-slate-700/50 text-center">
                                <Film className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
                                <p className="text-slate-400">Try searching with different keywords</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-12">
                        <p className="text-gray-500">
                            Faster Search • Your gateway to cinematic universe
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
