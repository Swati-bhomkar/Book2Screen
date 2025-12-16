import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useNavigate, useParams } from 'react-router-dom';
import { Layout } from './components/Layout';
import { INITIAL_ADAPTATIONS, INITIAL_AUTHORS, INITIAL_REVIEWS } from './constants';
import { Adaptation, Author, Review, UserProfile, UserProgress } from './types';
import { Users, MapPin, Quote, Plus, Book, ArrowRight, Lock, Star, MessageSquare, BookOpen, Edit2, Check, User as UserIcon, Save, Search, Heart, CheckCircle, Calendar, ChevronLeft, Filter, Film, AlertTriangle, Eye, EyeOff, Play, ShoppingBag, Globe, Clock, Tv, Trash2, X, CheckSquare, Award, BarChart3, Image as ImageIcon, Scale, Clapperboard, Camera, Video, Navigation, Info, ExternalLink, Upload } from 'lucide-react';

// --- Page Components ---

const Home: React.FC<{ adaptations: Adaptation[]; isLoggedIn: boolean }> = ({ adaptations, isLoggedIn }) => {
  const comparisonItems = adaptations.filter(item => item.comparisonSummary).slice(0, 3);
  const featuredItems = adaptations.slice(0, 3);
  const navigate = useNavigate();

  const handleExploreClick = () => {
      if (isLoggedIn) {
          navigate('/adaptations');
      } else {
          navigate('/login');
      }
  };

  const backgroundIcons = useMemo(() => {
      const icons = [Film, Clapperboard, Camera, Video, Star, BookOpen, Tv];
      return Array.from({ length: 15 }).map((_, i) => ({
          id: i,
          Icon: icons[Math.floor(Math.random() * icons.length)],
          left: Math.floor(Math.random() * 95),
          size: Math.floor(Math.random() * (50 - 20 + 1) + 20),
          duration: Math.floor(Math.random() * (45 - 25 + 1) + 25),
          delay: Math.floor(Math.random() * 20),
          endRotation: Math.floor(Math.random() * 90 - 45)
      }));
  }, []);

  return (
    <div className="relative pb-20">
      <style>{`
        @keyframes float-up {
            0% { transform: translateY(110%) rotate(0deg) scale(0.8); opacity: 0; }
            10% { opacity: 0.15; }
            90% { opacity: 0.15; }
            100% { transform: translateY(-20%) rotate(var(--tw-rotate-end)) scale(1.1); opacity: 0; }
        }
      `}</style>

      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {backgroundIcons.map((item) => (
                <div 
                    key={item.id}
                    className="absolute bottom-0 text-slate-500/20"
                    style={{
                        left: `${item.left}%`,
                        width: `${item.size}px`,
                        height: `${item.size}px`,
                        animation: `float-up ${item.duration}s linear infinite`,
                        animationDelay: `-${item.delay}s`,
                        '--tw-rotate-end': `${item.endRotation}deg`
                    } as React.CSSProperties}
                >
                    <item.Icon strokeWidth={1.5} className="w-full h-full" />
                </div>
            ))}
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[100px] z-0"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[80px] z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 tracking-tight whitespace-nowrap">
            Where Stories Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600">Screens</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Discover the magic of adaptation where stories unite page and screen. Bringing readers and movie lovers together in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
                onClick={handleExploreClick}
                className="bg-purple-600 text-white px-8 py-4 rounded-full font-bold hover:bg-purple-500 transition-all duration-300 shadow-lg shadow-purple-900/30 transform hover:-translate-y-1"
            >
              Explore Adaptations
            </button>
            <Link 
                to="/map" 
                className="bg-transparent border border-slate-600 text-slate-200 px-8 py-4 rounded-full font-bold hover:bg-slate-800 hover:border-slate-500 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              Find Nearby Books
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-20 mb-20">
          <div className="text-center mb-16">
            <h3 className="text-white font-serif text-3xl mb-4">Featured Adaptations</h3>
            <p className="text-slate-400">Trending comparisons this week.</p>
          </div>
          
          <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
             {featuredItems.map((item) => (
                <div key={item.id} className="flex flex-col items-start justify-between bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg cursor-pointer" onClick={() => navigate(isLoggedIn ? `/adaptation/${item.id}` : '/login')}>
                    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl mb-6 group">
                         <div className="absolute inset-0 flex">
                             <img src={item.coverUrl} className="w-1/2 h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Book" />
                             <img src={item.moviePosterUrl} className="w-1/2 h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Movie" />
                         </div>
                         <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
                    </div>
                    <div className="max-w-xl w-full">
                        <div className="flex items-center gap-x-4 text-xs mb-3">
                             <span className="text-purple-400 font-bold">{item.releaseYear}</span>
                             <span className="relative z-10 rounded-full bg-slate-800 px-3 py-1 font-medium text-slate-300 border border-slate-700">{item.genre[0]}</span>
                        </div>
                        <div className="group relative">
                             <h3 className="text-xl font-bold leading-6 text-white group-hover:text-purple-400 transition-colors mb-2">
                                 {item.movieTitle}
                             </h3>
                             <p className="line-clamp-3 text-sm leading-relaxed text-slate-400">{item.comparisonSummary}</p>
                        </div>
                    </div>
                </div>
             ))}
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-20">
          <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-white">Discover More</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/authors" className="group bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-purple-900/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                      <Users className="w-6 h-6 text-purple-400 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Explore Authors</h3>
                  <p className="text-slate-400 text-sm">Meet the masterminds behind the stories.</p>
              </Link>
              
              <Link to="/novels" className="group bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-purple-900/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                      <Star className="w-6 h-6 text-purple-400 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Famous Novels</h3>
                  <p className="text-slate-400 text-sm">Browse curated lists of legendary books.</p>
              </Link>

              <Link to="/map" className="group bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all hover:-translate-y-1">
                   <div className="w-12 h-12 bg-purple-900/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                      <MapPin className="w-6 h-6 text-purple-400 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Sales Near You</h3>
                  <p className="text-slate-400 text-sm">Find book fairs and markets in your area.</p>
              </Link>

              <Link to="/reviews" className="group bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all hover:-translate-y-1">
                   <div className="w-12 h-12 bg-purple-900/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                      <MessageSquare className="w-6 h-6 text-purple-400 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Reviews</h3>
                  <p className="text-slate-400 text-sm">See what the community is saying.</p>
              </Link>
          </div>
      </div>

      <div className="bg-slate-900/50 py-20 border-y border-slate-800 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-16">
                 <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Book vs Movie</h2>
                 <p className="text-purple-400 text-lg tracking-widest uppercase font-semibold">Which tells it better?</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {comparisonItems.map((item) => (
                     <div key={item.id} className="relative bg-slate-950 border border-slate-800 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/10 group flex flex-col justify-between h-full">
                         
                         <div>
                            <h3 className="text-2xl font-bold text-white mb-6 text-center group-hover:text-purple-300 transition-colors">{item.bookTitle}</h3>
                            
                            <div className="bg-slate-900 rounded-2xl p-6 mb-6 border border-slate-800 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-pink-500 to-purple-600"></div>
                                <p className="text-slate-300 text-lg leading-relaxed italic text-center">
                                    "{item.comparisonSummary}"
                                </p>
                            </div>
                         </div>

                         <div className="text-center mt-auto">
                            <Link to={isLoggedIn ? "/adaptations" : "/login"} className="inline-flex items-center gap-2 text-purple-400 text-sm font-bold hover:text-white transition-colors uppercase tracking-wide bg-slate-900 px-6 py-3 rounded-full border border-slate-800 hover:bg-purple-600 hover:border-purple-500">
                                Full Analysis <ArrowRight className="w-4 h-4" />
                            </Link>
                         </div>
                     </div>
                 ))}
             </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <div className="inline-block p-3 rounded-full bg-slate-800 mb-6">
              <BookOpen className="w-8 h-8 text-purple-500" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-white mb-6">About Book2Screen</h2>
          <p className="text-lg text-slate-400 leading-relaxed">
              Book2Screen is your ultimate companion for navigating the intersection of literature and cinema. 
              We believe that every adaptation is a conversation between mediums. Our platform helps you track what you've read and watched, 
              compare artistic choices, and discover local literary events. Whether you're a purist who believes "the book was better" 
              or a cinephile who loves visual storytelling, there's a place for you here.
          </p>
      </div>
    </div>
  );
};

// ... (MapPage, FamousNovels, Authors, Admin, Login components are standard and will be included in full below) ...

interface MapLocation {
    id: string;
    name: string;
    type: 'Fair' | 'Store' | 'Market' | 'Library';
    date?: string;
    description: string;
    x: number;
    y: number;
    address: string;
}

const MOCK_LOCATIONS: MapLocation[] = [
    { id: '1', name: 'Downtown Literary Fair', type: 'Fair', date: 'Oct 25 - Oct 27', description: 'Annual book fair featuring local authors and rare collectibles.', x: 45, y: 35, address: '120 Main St, City Center' },
    { id: '2', name: 'The Old Page Shop', type: 'Store', description: 'Vintage bookstore specializing in first editions and classic sci-fi.', x: 25, y: 60, address: '45 Willow Ave, Old Town' },
    { id: '3', name: 'Riverside Book Market', type: 'Market', date: 'Every Sunday', description: 'Open-air market with second-hand books at bargain prices.', x: 70, y: 55, address: 'River Walk Promenade' },
    { id: '4', name: 'Central City Library', type: 'Library', description: 'Hosting a "Dune" reading marathon this weekend.', x: 55, y: 20, address: '800 Library Ln' },
    { id: '5', name: 'West End Comics & Books', type: 'Store', description: 'Huge selection of graphic novels and movie adaptations.', x: 15, y: 40, address: '22 West End Blvd' },
    { id: '6', name: 'University Scholar Sale', type: 'Fair', date: 'Nov 01', description: 'Academic texts and classic literature clearance sale.', x: 80, y: 30, address: 'University Campus, Hall B' },
];

const MapPage: React.FC = () => {
    const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
    const [filter, setFilter] = useState<string>('All');

    const filteredLocations = useMemo(() => {
        return filter === 'All' ? MOCK_LOCATIONS : MOCK_LOCATIONS.filter(l => l.type === filter);
    }, [filter]);

    const getPinColor = (type: string) => {
        switch(type) {
            case 'Fair': return 'text-purple-500';
            case 'Store': return 'text-blue-500';
            case 'Market': return 'text-orange-500';
            case 'Library': return 'text-green-500';
            default: return 'text-white';
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] bg-slate-950 overflow-hidden">
            <div className="w-full lg:w-1/3 bg-slate-900 border-r border-slate-800 flex flex-col z-20 shadow-2xl">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-2xl font-serif font-bold text-white mb-2">Book Sales & Events</h2>
                    <p className="text-slate-400 text-sm mb-6">Discover literary happenings near you.</p>
                    
                    <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                        {['All', 'Fair', 'Store', 'Market', 'Library'].map(f => (
                            <button 
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${filter === f ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {filteredLocations.map(loc => (
                        <div 
                            key={loc.id}
                            onClick={() => setSelectedLocation(loc)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer group ${selectedLocation?.id === loc.id ? 'bg-purple-900/20 border-purple-500' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h4 className={`font-bold ${selectedLocation?.id === loc.id ? 'text-purple-400' : 'text-white group-hover:text-purple-400'}`}>{loc.name}</h4>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-900 ${getPinColor(loc.type)}`}>{loc.type}</span>
                            </div>
                            <p className="text-slate-400 text-xs mb-2 line-clamp-2">{loc.description}</p>
                            <div className="flex items-center gap-2 text-slate-500 text-xs">
                                <MapPin className="w-3 h-3" /> {loc.address}
                            </div>
                            {loc.date && (
                                <div className="mt-2 text-xs text-green-400 font-bold flex items-center gap-1">
                                    <Calendar className="w-3 h-3" /> {loc.date}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative flex-1 bg-slate-950 overflow-hidden">
                <div 
                    className="absolute inset-0 w-full h-full bg-slate-900 opacity-50"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
                        backgroundSize: '40px 40px',
                    }}
                ></div>
                <div className="absolute top-0 left-1/3 w-20 h-full bg-slate-800/30 skew-x-12 blur-sm"></div>
                <div className="absolute top-1/2 left-0 w-full h-16 bg-slate-800/30 -skew-y-6 blur-sm"></div>
                
                {filteredLocations.map(loc => (
                    <div 
                        key={loc.id}
                        className="absolute cursor-pointer group z-10 transition-all duration-300"
                        style={{ top: `${loc.y}%`, left: `${loc.x}%`, transform: 'translate(-50%, -100%)' }}
                        onClick={(e) => { e.stopPropagation(); setSelectedLocation(loc); }}
                    >
                        <div className={`relative ${selectedLocation?.id === loc.id ? 'scale-125' : 'group-hover:scale-110'} transition-transform duration-300`}>
                            <MapPin className={`w-10 h-10 ${getPinColor(loc.type)} fill-slate-900`} strokeWidth={2} />
                            {selectedLocation?.id === loc.id && (
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-black/50 blur-sm rounded-full"></div>
                            )}
                        </div>
                        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                            {loc.name}
                        </div>
                    </div>
                ))}

                {selectedLocation && (
                    <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 shadow-2xl z-30 animate-fade-in-up">
                        <button 
                            onClick={() => setSelectedLocation(null)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded bg-slate-800 uppercase ${getPinColor(selectedLocation.type)}`}>
                                {selectedLocation.type}
                            </span>
                            {selectedLocation.date && (
                                <span className="text-xs text-green-400 font-bold flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {selectedLocation.date}
                                </span>
                            )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2 pr-6">{selectedLocation.name}</h3>
                        <p className="text-slate-300 text-sm mb-4 leading-relaxed">{selectedLocation.description}</p>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex items-start gap-3 text-sm text-slate-400">
                                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                <span>{selectedLocation.address}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-bold transition-colors">
                                <Navigation className="w-4 h-4" /> Directions
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-sm font-bold transition-colors border border-slate-700">
                                <ExternalLink className="w-4 h-4" /> Details
                            </button>
                        </div>
                    </div>
                )}

                <div className="absolute bottom-6 right-6 lg:right-auto lg:left-6 flex flex-col gap-2">
                    <button className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-white hover:bg-slate-700 shadow-lg">
                        <Plus className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-white hover:bg-slate-700 shadow-lg">
                        <div className="w-4 h-0.5 bg-current"></div>
                    </button>
                    <button className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-purple-500 hover:bg-slate-700 shadow-lg mt-2">
                        <Navigation className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const FamousNovels: React.FC<{ adaptations: Adaptation[] }> = ({ adaptations }) => {
    const famous = adaptations.filter(a => a.isFamous);
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-4xl font-serif font-bold text-white mb-4 text-center">Famous Novels</h2>
            <p className="text-slate-400 text-center mb-12">The most iconic stories that shaped literature and cinema.</p>
            
            <div className="space-y-12">
                {famous.map((item, idx) => (
                    <div key={item.id} className={`flex flex-col md:flex-row gap-8 items-center bg-slate-900/50 p-8 rounded-3xl border border-slate-800 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                         <div className="w-full md:w-1/3 h-80 shadow-2xl rounded-xl overflow-hidden relative group">
                             <img src={item.coverUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.bookTitle} />
                             <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
                         </div>
                         <div className="w-full md:w-2/3">
                             <h3 className="text-3xl font-bold text-white mb-2">{item.bookTitle}</h3>
                             <p className="text-purple-400 font-serif italic mb-4">Original Novel by {item.author}</p>
                             <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 relative">
                                 <Quote className="w-8 h-8 text-slate-700 absolute -top-4 -left-4 bg-slate-900 rounded-full p-1" />
                                 <p className="text-slate-300 text-lg font-serif italic text-center">"{item.famousQuote}"</p>
                             </div>
                             <div className="mt-6 flex gap-4">
                                 <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-400 border border-slate-700">{item.genre.join(', ')}</span>
                                 <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-400 border border-slate-700">{item.bookReleaseYear || item.releaseYear}</span>
                             </div>
                             <div className="mt-6">
                                <Link to={`/adaptation/${item.id}`} className="text-purple-500 hover:text-white font-bold text-sm flex items-center gap-1 transition-colors">
                                    See Adaptation Comparison <ArrowRight className="w-4 h-4" />
                                </Link>
                             </div>
                         </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Admin: React.FC<{
    adaptations: Adaptation[];
    authors: Author[];
    onAddAdaptation: (a: Adaptation) => void;
    onEditAdaptation: (a: Adaptation) => void;
    onDeleteAdaptation: (id: string) => void;
    onAddAuthor: (a: Author) => void;
    onEditAuthor: (a: Author) => void;
    onDeleteAuthor: (id: string) => void;
}> = ({ adaptations, authors, onAddAdaptation, onEditAdaptation, onDeleteAdaptation, onAddAuthor, onEditAuthor, onDeleteAuthor }) => {
    const [activeTab, setActiveTab] = useState<'adaptations' | 'authors'>('adaptations');
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<any>(null);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        
        const processedItem = { ...currentItem };
        
        if (activeTab === 'adaptations') {
            if (typeof processedItem.genre === 'string') processedItem.genre = processedItem.genre.split(',').map((s: string) => s.trim());
            if (typeof processedItem.moods === 'string') processedItem.moods = processedItem.moods.split(',').map((s: string) => s.trim());
            if (typeof processedItem.cast === 'string') processedItem.cast = processedItem.cast.split(',').map((s: string) => s.trim());
            
            if (processedItem.bookRating) processedItem.bookRating = Number(processedItem.bookRating);
            if (processedItem.movieRating) processedItem.movieRating = Number(processedItem.movieRating);

            if (processedItem.id) {
                onEditAdaptation(processedItem);
            } else {
                onAddAdaptation({ ...processedItem, id: Date.now().toString() });
            }
        } else {
            if (typeof processedItem.notableWorks === 'string') processedItem.notableWorks = processedItem.notableWorks.split(',').map((s: string) => s.trim());
            
            if (processedItem.id) {
                onEditAuthor(processedItem);
            } else {
                onAddAuthor({ ...processedItem, id: 'a' + Date.now().toString() });
            }
        }
        
        setIsEditing(false);
        setCurrentItem(null);
    };

    const handleAddNew = () => {
        setIsEditing(true);
        if (activeTab === 'adaptations') {
            setCurrentItem({
                bookTitle: '', movieTitle: '', author: '', releaseYear: '', genre: [], moods: [],
                famousQuote: '', comparisonSummary: '', spoilerAnalysis: '', isFamous: false,
                coverUrl: '', bookDescription: '', targetAudience: '', bookRating: 0, originalLanguage: '', bookReleaseYear: '', readLink: '', buyLink: '',
                moviePosterUrl: '', movieDescription: '', director: '', cast: [], movieTargetAudience: '', movieRating: 0, trailerUrl: '', ottLink: ''
            });
        } else {
            setCurrentItem({ name: '', bio: '', imageUrl: '', notableWorks: [] });
        }
    };

    const handleEdit = (item: any) => {
        setIsEditing(true);
        const editableItem = { ...item };
        if (editableItem.genre) editableItem.genre = editableItem.genre.join(', ');
        if (editableItem.moods) editableItem.moods = editableItem.moods.join(', ');
        if (editableItem.cast) editableItem.cast = editableItem.cast.join(', ');
        if (editableItem.notableWorks) editableItem.notableWorks = editableItem.notableWorks.join(', ');
        setCurrentItem(editableItem);
    };

    if (isEditing) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-2xl">
                    <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                        <h2 className="text-2xl font-bold text-white">
                            {currentItem.id ? 'Edit' : 'Add New'} {activeTab === 'adaptations' ? 'Adaptation' : 'Author'}
                        </h2>
                        <button onClick={() => { setIsEditing(false); setCurrentItem(null); }} className="text-slate-400 hover:text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSave} className="space-y-8">
                        {activeTab === 'adaptations' ? (
                            <>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-purple-400 uppercase tracking-wider border-b border-slate-800 pb-2">General Info</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Book Title</label>
                                            <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.bookTitle} onChange={e => setCurrentItem({...currentItem, bookTitle: e.target.value})} required />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Movie Title</label>
                                            <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.movieTitle} onChange={e => setCurrentItem({...currentItem, movieTitle: e.target.value})} required />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Author Name</label>
                                            <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.author} onChange={e => setCurrentItem({...currentItem, author: e.target.value})} required />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Movie Release Year</label>
                                            <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.releaseYear} onChange={e => setCurrentItem({...currentItem, releaseYear: e.target.value})} required />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Genres (comma separated)</label>
                                        <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.genre} onChange={e => setCurrentItem({...currentItem, genre: e.target.value})} placeholder="Sci-Fi, Drama, Action" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Famous Quote</label>
                                        <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.famousQuote} onChange={e => setCurrentItem({...currentItem, famousQuote: e.target.value})} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Comparison Summary</label>
                                            <textarea rows={3} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.comparisonSummary} onChange={e => setCurrentItem({...currentItem, comparisonSummary: e.target.value})} />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Spoiler Analysis</label>
                                            <textarea rows={3} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.spoilerAnalysis} onChange={e => setCurrentItem({...currentItem, spoilerAnalysis: e.target.value})} />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="isFamous" checked={currentItem.isFamous || false} onChange={e => setCurrentItem({...currentItem, isFamous: e.target.checked})} className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 bg-slate-950 border-slate-700" />
                                        <label htmlFor="isFamous" className="text-white text-sm">Feature in Famous Novels Hall of Fame?</label>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-purple-400 uppercase tracking-wider border-b border-slate-800 pb-2">Book Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Cover URL</label>
                                            <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.coverUrl} onChange={e => setCurrentItem({...currentItem, coverUrl: e.target.value})} placeholder="https://..." />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Book Release Year</label>
                                            <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.bookReleaseYear} onChange={e => setCurrentItem({...currentItem, bookReleaseYear: e.target.value})} />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Target Audience</label>
                                            <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.targetAudience} onChange={e => setCurrentItem({...currentItem, targetAudience: e.target.value})} />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Rating (0-5)</label>
                                            <input type="number" step="0.1" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.bookRating} onChange={e => setCurrentItem({...currentItem, bookRating: e.target.value})} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Book Description</label>
                                        <textarea rows={3} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.bookDescription} onChange={e => setCurrentItem({...currentItem, bookDescription: e.target.value})} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Read Link</label>
                                            <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.readLink} onChange={e => setCurrentItem({...currentItem, readLink: e.target.value})} />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Buy Link</label>
                                            <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.buyLink} onChange={e => setCurrentItem({...currentItem, buyLink: e.target.value})} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-purple-400 uppercase tracking-wider border-b border-slate-800 pb-2">Movie Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Poster URL</label>
                                            <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.moviePosterUrl} onChange={e => setCurrentItem({...currentItem, moviePosterUrl: e.target.value})} placeholder="https://..." />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Director</label>
                                            <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.director} onChange={e => setCurrentItem({...currentItem, director: e.target.value})} />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Cast (comma separated)</label>
                                            <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.cast} onChange={e => setCurrentItem({...currentItem, cast: e.target.value})} />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Rating (0-5)</label>
                                            <input type="number" step="0.1" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.movieRating} onChange={e => setCurrentItem({...currentItem, movieRating: e.target.value})} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Movie Description</label>
                                        <textarea rows={3} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.movieDescription} onChange={e => setCurrentItem({...currentItem, movieDescription: e.target.value})} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Trailer URL</label>
                                            <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.trailerUrl} onChange={e => setCurrentItem({...currentItem, trailerUrl: e.target.value})} />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">OTT Link</label>
                                            <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.ottLink} onChange={e => setCurrentItem({...currentItem, ottLink: e.target.value})} />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Author Name</label>
                                        <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.name} onChange={e => setCurrentItem({...currentItem, name: e.target.value})} required />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Image URL</label>
                                        <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.imageUrl} onChange={e => setCurrentItem({...currentItem, imageUrl: e.target.value})} placeholder="https://..." />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Bio</label>
                                    <textarea rows={5} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.bio} onChange={e => setCurrentItem({...currentItem, bio: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Notable Works (comma separated)</label>
                                    <input className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" value={currentItem.notableWorks} onChange={e => setCurrentItem({...currentItem, notableWorks: e.target.value})} />
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                            <button type="button" onClick={() => { setIsEditing(false); setCurrentItem(null); }} className="px-6 py-3 text-slate-400 hover:text-white font-bold transition-colors">
                                Cancel
                            </button>
                            <button type="submit" className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold shadow-lg shadow-purple-900/20 transition-all">
                                Save Details
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-4xl font-serif font-bold text-white mb-8">Admin Dashboard</h2>
            
            <div className="flex space-x-4 mb-8 border-b border-slate-800 pb-1">
                <button 
                    onClick={() => setActiveTab('adaptations')}
                    className={`pb-3 px-4 text-sm font-bold transition-colors border-b-2 ${activeTab === 'adaptations' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
                >
                    Manage Adaptations
                </button>
                <button 
                    onClick={() => setActiveTab('authors')}
                    className={`pb-3 px-4 text-sm font-bold transition-colors border-b-2 ${activeTab === 'authors' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
                >
                    Manage Authors
                </button>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                {activeTab === 'adaptations' && (
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">All Adaptations ({adaptations.length})</h3>
                            <button 
                                onClick={handleAddNew}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
                            >
                                <Plus className="w-4 h-4" /> Add Adaptation
                            </button>
                        </div>
                        <div className="space-y-2">
                            {adaptations.map(item => (
                                <div key={item.id} className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <img src={item.moviePosterUrl} alt="" className="w-10 h-14 object-cover rounded bg-slate-900" />
                                        <div>
                                            <div className="font-bold text-white">{item.movieTitle}</div>
                                            <div className="text-xs text-slate-500">Book: {item.bookTitle}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(item)} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded transition-colors" title="Edit">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => onDeleteAdaptation(item.id)}
                                            className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors" 
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'authors' && (
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">All Authors ({authors.length})</h3>
                            <button 
                                onClick={handleAddNew}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
                            >
                                <Plus className="w-4 h-4" /> Add Author
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {authors.map(author => (
                                <div key={author.id} className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <img src={author.imageUrl} alt="" className="w-12 h-12 object-cover rounded-full bg-slate-900" />
                                        <div>
                                            <div className="font-bold text-white">{author.name}</div>
                                            <div className="text-xs text-slate-500">{author.notableWorks.length} notable works</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(author)} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded transition-colors" title="Edit">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => onDeleteAuthor(author.id)}
                                            className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors" 
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const Login: React.FC<{ onLogin: (email: string, pass: string, name?: string) => void }> = ({ onLogin }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password, isSignUp ? name : undefined);
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] relative">
             <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
                <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 w-full max-w-md p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
                <div className="flex justify-center mb-6">
                    <div className="p-3 bg-slate-800 rounded-full border border-slate-700">
                        <Lock className="w-8 h-8 text-purple-500" />
                    </div>
                </div>
                <h2 className="text-3xl font-serif font-bold text-white text-center mb-2">
                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-slate-400 text-center mb-8">
                    {isSignUp ? 'Start your journey from page to screen.' : 'Sign in to track your watched adaptations.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {isSignUp && (
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                            <input 
                                type="text" 
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Your Name"
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-slate-500">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <span 
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-purple-400 cursor-pointer hover:underline"
                    >
                        {isSignUp ? 'Sign In' : 'Sign up'}
                    </span>
                </div>
            </div>
        </div>
    );
};

const Profile: React.FC<{ 
    user: UserProfile; 
    onUpdate: (u: UserProfile) => void; 
    userProgress: UserProgress;
    reviews: Review[];
}> = ({ user, onUpdate, userProgress, reviews }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<UserProfile>(user);
    const [showPassword, setShowPassword] = useState(false);

    const availableGenres = ["Sci-Fi", "Fantasy", "Drama", "Romance", "Horror", "Thriller", "Classic", "Mystery", "Biography"];

    const toggleGenre = (genre: string) => {
        if (!isEditing) return;
        const currentGenres = editForm.favoriteGenres || [];
        if (currentGenres.includes(genre)) {
            setEditForm({ ...editForm, favoriteGenres: currentGenres.filter(g => g !== genre) });
        } else {
            setEditForm({ ...editForm, favoriteGenres: [...currentGenres, genre] });
        }
    };

    const handleSave = () => {
        onUpdate(editForm);
        setIsEditing(false);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setEditForm({ ...editForm, avatarUrl: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const stats = useMemo(() => {
        let booksRead = 0, moviesWatched = 0, adaptationsDone = 0;
        let favBooks = 0, favMovies = 0, favAdaptations = 0;
        
        Object.keys(userProgress).forEach(key => {
            const p = userProgress[key];
            if (p.isBookRead) booksRead++;
            if (p.isMovieWatched) moviesWatched++;
            if (p.isBookRead && p.isMovieWatched) adaptationsDone++;
            if (p.isFavoriteBook) favBooks++;
            if (p.isFavoriteMovie) favMovies++;
            if (p.isFavoriteAdaptation) favAdaptations++;
        });
        return { booksRead, moviesWatched, adaptationsDone, favBooks, favMovies, favAdaptations };
    }, [userProgress]);

    const userReviews = reviews.filter(r => r.userName === user.name);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-serif font-bold text-white">My Profile</h2>
                {!isEditing ? (
                    <button 
                        onClick={() => setIsEditing(true)} 
                        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-purple-400 px-4 py-2 rounded-full font-medium transition-colors"
                    >
                        <Edit2 className="w-4 h-4" /> Edit Profile
                    </button>
                ) : (
                    <button 
                        onClick={handleSave} 
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium transition-colors shadow-lg shadow-purple-900/20"
                    >
                        <Save className="w-4 h-4" /> Save Changes
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 text-center sticky top-24">
                        <div className="relative w-32 h-32 mx-auto mb-6 group">
                            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-2xl overflow-hidden">
                                {editForm.avatarUrl ? (
                                    <img src={editForm.avatarUrl} alt={editForm.name} className="w-full h-full object-cover" />
                                ) : (
                                    <UserIcon className="w-16 h-16 text-slate-500" />
                                )}
                            </div>
                            {isEditing && (
                                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center pointer-events-none">
                                    <ImageIcon className="w-8 h-8 text-white opacity-80" />
                                </div>
                            )}
                        </div>
                        
                        {isEditing && (
                            <div className="mb-4">
                                <label className="block text-xs text-slate-400 mb-2 text-left">Profile Photo</label>
                                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-700 border-dashed rounded-xl cursor-pointer bg-slate-800/50 hover:bg-slate-800 hover:border-purple-500 transition-all group">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-6 h-6 text-slate-500 mb-1 group-hover:text-purple-400 transition-colors" />
                                        <p className="text-xs text-slate-500 group-hover:text-slate-300">Click to upload new picture</p>
                                    </div>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        className="hidden" 
                                        onChange={handleImageUpload}
                                    />
                                </label>
                            </div>
                        )}

                        <h3 className="text-xl font-bold text-white mb-1">{editForm.name}</h3>
                        <p className="text-purple-500 font-medium text-sm mb-4 uppercase tracking-wide">{editForm.role}</p>
                        <div className="text-slate-400 text-sm mb-6">{editForm.email}</div>
                        
                        <div className="grid grid-cols-2 gap-2 text-center border-t border-slate-800 pt-6">
                            <div>
                                <div className="text-2xl font-bold text-white">{stats.adaptationsDone}</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wide">Full Adaptations</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">{userReviews.length}</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wide">Reviews Given</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-green-500/10 rounded-lg"><BookOpen className="w-4 h-4 text-green-500" /></div>
                                <span className="text-slate-400 text-xs uppercase font-bold">Books Read</span>
                            </div>
                            <div className="text-3xl font-bold text-white">{stats.booksRead}</div>
                        </div>
                        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-500/10 rounded-lg"><Film className="w-4 h-4 text-blue-500" /></div>
                                <span className="text-slate-400 text-xs uppercase font-bold">Movies Watched</span>
                            </div>
                            <div className="text-3xl font-bold text-white">{stats.moviesWatched}</div>
                        </div>
                        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                             <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-purple-500/10 rounded-lg"><Award className="w-4 h-4 text-purple-500" /></div>
                                <span className="text-slate-400 text-xs uppercase font-bold">Adaptations</span>
                            </div>
                            <div className="text-3xl font-bold text-white">{stats.adaptationsDone}</div>
                        </div>
                        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-pink-500/10 rounded-lg"><Heart className="w-4 h-4 text-pink-500" /></div>
                                <span className="text-slate-400 text-xs uppercase font-bold">Fav Books</span>
                            </div>
                            <div className="text-3xl font-bold text-white">{stats.favBooks}</div>
                        </div>
                        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-pink-500/10 rounded-lg"><Heart className="w-4 h-4 text-pink-500" /></div>
                                <span className="text-slate-400 text-xs uppercase font-bold">Fav Movies</span>
                            </div>
                            <div className="text-3xl font-bold text-white">{stats.favMovies}</div>
                        </div>
                         <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-yellow-500/10 rounded-lg"><Star className="w-4 h-4 text-yellow-500" /></div>
                                <span className="text-slate-400 text-xs uppercase font-bold">Fav Adaptations</span>
                            </div>
                            <div className="text-3xl font-bold text-white">{stats.favAdaptations}</div>
                        </div>
                    </div>

                    <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
                        <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-2">Personal Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                             <div>
                                <label className="block text-sm text-slate-400 mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    disabled={!isEditing}
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                    className={`w-full bg-slate-800 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${isEditing ? 'border-slate-600' : 'border-transparent cursor-default'}`}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Email</label>
                                <input 
                                    type="email" 
                                    disabled
                                    value={editForm.email}
                                    className="w-full bg-slate-800/50 border border-transparent rounded-lg px-4 py-3 text-slate-400 cursor-not-allowed"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm text-slate-400 mb-1">Bio</label>
                            <textarea 
                                rows={3}
                                disabled={!isEditing}
                                value={editForm.bio}
                                onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                                className={`w-full bg-slate-800 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${isEditing ? 'border-slate-600' : 'border-transparent cursor-default'}`}
                            />
                        </div>
                         <div>
                            <label className="block text-sm text-slate-400 mb-1">Password</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    disabled={!isEditing}
                                    value={editForm.password}
                                    onChange={(e) => setEditForm({...editForm, password: e.target.value})}
                                    className={`w-full bg-slate-800 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-20 ${isEditing ? 'border-slate-600' : 'border-transparent cursor-default'}`}
                                />
                                {isEditing && (
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-purple-400 font-bold hover:text-purple-300"
                                    >
                                        {showPassword ? "HIDE" : "SHOW"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                     <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
                         <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-2 flex items-center gap-2">
                             <MessageSquare className="w-5 h-5 text-purple-500" /> My Reviews ({userReviews.length})
                         </h3>
                         {userReviews.length > 0 ? (
                             <div className="space-y-4">
                                 {userReviews.map(review => (
                                     <div key={review.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                                         <div className="flex justify-between mb-2">
                                             <span className="font-bold text-white">{review.itemName}</span>
                                             <div className="flex text-yellow-500 gap-0.5">
                                                 {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                                             </div>
                                         </div>
                                         <p className="text-slate-400 text-sm italic">"{review.comment}"</p>
                                         <div className="text-right mt-2 text-xs text-slate-600">{review.date}</div>
                                     </div>
                                 ))}
                             </div>
                         ) : (
                             <p className="text-slate-500 italic text-center py-4">You haven't submitted any reviews yet.</p>
                         )}
                     </div>

                    <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
                        <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-2">Favorite Genres</h3>
                        <div className="flex flex-wrap gap-3">
                            {availableGenres.map(genre => {
                                const isSelected = editForm.favoriteGenres?.includes(genre);
                                return (
                                    <button
                                        key={genre}
                                        onClick={() => toggleGenre(genre)}
                                        disabled={!isEditing}
                                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                                            isSelected 
                                            ? 'bg-purple-600 text-white border-purple-500' 
                                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600'
                                        } ${!isEditing && !isSelected ? 'opacity-50 cursor-default' : ''}`}
                                    >
                                        {genre}
                                        {isSelected && <Check className="w-3 h-3 inline-block ml-1" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdaptationList: React.FC<{ 
    adaptations: Adaptation[]; 
    progress: UserProgress;
    onToggleFavorite: (id: string, type: 'adaptation') => void; 
    onToggleWatched: (id: string) => void; 
}> = ({ adaptations, progress, onToggleFavorite, onToggleWatched }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [showCompleted, setShowCompleted] = useState(false);
  const navigate = useNavigate();

  const genres = ['All', 'Sci-Fi', 'Fantasy', 'Drama', 'Romance', 'Thriller', 'Classic', 'Adventure', 'Crime'];

  const filteredAdaptations = useMemo(() => {
    return adaptations.filter(item => {
        const matchesSearch = 
            item.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.movieTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.author.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesGenre = selectedGenre === 'All' || item.genre.includes(selectedGenre);

        const isDone = progress[item.id]?.isBookRead && progress[item.id]?.isMovieWatched;
        const matchesCompletion = showCompleted ? true : !isDone;

        return matchesSearch && matchesGenre && matchesCompletion;
    });
  }, [adaptations, searchQuery, selectedGenre, progress, showCompleted]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mb-10 text-center">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">Adaptation Library</h2>
          <p className="text-slate-400">Discover and track your journey from page to screen.</p>
      </div>

      <div className="sticky top-20 z-40 bg-slate-950/90 backdrop-blur-md py-4 mb-8 -mx-4 px-4 border-b border-slate-800/50">
          <div className="max-w-4xl mx-auto space-y-4">
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                      type="text"
                      placeholder="Search by author, book title, or movie title..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-lg"
                  />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar flex-1">
                      {genres.map(genre => (
                          <button
                              key={genre}
                              onClick={() => setSelectedGenre(genre)}
                              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                  selectedGenre === genre
                                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-600 hover:text-white'
                              }`}
                          >
                              {genre}
                          </button>
                      ))}
                  </div>
                  
                  <button 
                    onClick={() => setShowCompleted(!showCompleted)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                        showCompleted 
                        ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-600'
                    }`}
                  >
                      <CheckCircle className="w-4 h-4" />
                      {showCompleted ? 'Hiding Completed' : 'Show Completed'}
                  </button>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAdaptations.map((item) => (
          <div key={item.id} className="group bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/10 hover:-translate-y-1 relative flex flex-col">
             <div 
                className="aspect-[2/3] relative flex cursor-pointer bg-slate-950 overflow-hidden"
                onClick={() => navigate(`/adaptation/${item.id}`)}
             >
                <div className="w-1/2 h-full relative border-r border-slate-900/30">
                    <img 
                        src={item.coverUrl} 
                        alt="Book Cover" 
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black/10 transition-all"></div>
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded border border-white/10 shadow-sm">
                        BOOK
                    </div>
                </div>

                <div className="w-1/2 h-full relative">
                     <img 
                        src={item.moviePosterUrl} 
                        alt="Movie Poster" 
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black/10 transition-all"></div>
                    <div className="absolute bottom-2 right-2 bg-purple-600/90 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded border border-white/10 shadow-sm">
                        MOVIE
                    </div>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <span className="inline-block px-3 py-1 bg-slate-900/95 text-white text-xs font-bold rounded-full border border-slate-700 shadow-xl whitespace-nowrap">
                        {item.releaseYear}
                    </span>
                </div>
             </div>

             <div className="p-5 flex-grow flex flex-col">
                <div className="cursor-pointer" onClick={() => navigate(`/adaptation/${item.id}`)}>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-1" title={item.movieTitle}>
                        {item.movieTitle}
                    </h3>
                    <p className="text-slate-400 text-sm font-serif italic mb-3 line-clamp-1">
                        Based on "{item.bookTitle}"
                    </p>
                    <p className="text-sm text-purple-500 font-medium mb-3 flex items-center gap-2">
                        <Edit2 className="w-4 h-4" /> {item.author}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        {item.genre.slice(0, 3).map(g => (
                            <span key={g} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">{g}</span>
                        ))}
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id, 'adaptation'); }}
                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                            progress[item.id]?.isFavoriteAdaptation ? 'text-pink-500' : 'text-slate-500 hover:text-pink-400'
                        }`}
                        title="Favorite Adaptation"
                    >
                        <Heart className={`w-5 h-5 ${progress[item.id]?.isFavoriteAdaptation ? 'fill-current' : ''}`} />
                    </button>
                    
                    <button 
                         onClick={(e) => { e.stopPropagation(); onToggleWatched(item.id); }}
                         className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                             (progress[item.id]?.isBookRead && progress[item.id]?.isMovieWatched)
                             ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                             : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-white'
                         }`}
                         title="Mark Everything Done"
                    >
                        <CheckCircle className="w-4 h-4" />
                        {(progress[item.id]?.isBookRead && progress[item.id]?.isMovieWatched) ? 'Complete' : 'Mark Done'}
                    </button>
                </div>
             </div>
          </div>
        ))}
        {filteredAdaptations.length === 0 && (
            <div className="col-span-full text-center py-20">
                <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No matches found</h3>
                <p className="text-slate-400">Try adjusting your search or filters.</p>
            </div>
        )}
      </div>
    </div>
  );
};

const AdaptationDetails: React.FC<{ 
    adaptations: Adaptation[]; 
    progress: UserProgress; 
    reviews: Review[];
    onAddReview: (r: Review) => void;
    currentUser: UserProfile | null;
    onToggleFavorite: (id: string, type: 'book' | 'movie' | 'adaptation') => void; 
    onToggleRead: (id: string) => void;
    onToggleWatched: (id: string) => void;
}> = ({ adaptations, progress, reviews, onAddReview, currentUser, onToggleFavorite, onToggleRead, onToggleWatched }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const item = adaptations.find(a => a.id === id);
    const [showSpoilers, setShowSpoilers] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(5);

    const recommendations = useMemo(() => {
        if (!item) return [];
        return adaptations.filter(a => 
            a.id !== item.id && 
            (a.genre.some(g => item.genre.includes(g)) || a.author === item.author)
        ).slice(0, 3);
    }, [adaptations, item]);

    const handlePostReview = () => {
        if (!reviewText.trim() || !item) return;
        
        const newReview: Review = {
            id: Date.now().toString(),
            userName: currentUser?.name || 'Anonymous',
            rating: rating,
            comment: reviewText,
            itemId: item.id,
            itemName: item.movieTitle,
            date: new Date().toISOString().split('T')[0]
        };
        
        onAddReview(newReview);
        setReviewText('');
        setRating(5);
    };

    const itemReviews = reviews.filter(r => r.itemId === item?.id);

    if (!item) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Adaptation Not Found</h2>
                    <button onClick={() => navigate('/adaptations')} className="text-purple-500 hover:underline">Back to List</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20 pt-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                 <button 
                    onClick={() => navigate('/adaptations')}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" /> Back to Library
                </button>

                <div className="text-left border-b border-slate-800 pb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">{item.movieTitle}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-lg">
                                <Link to="/authors" className="text-purple-400 font-bold hover:underline flex items-center gap-1">
                                    <Edit2 className="w-4 h-4" /> {item.author}
                                </Link>
                                <span className="text-slate-600">•</span>
                                <span className="text-slate-300">{item.releaseYear}</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => onToggleFavorite(item.id, 'adaptation')}
                            className={`p-3 rounded-full border ${progress[item.id]?.isFavoriteAdaptation ? 'border-pink-500 text-pink-500 bg-pink-500/10' : 'border-slate-700 text-slate-400 hover:text-white'}`}
                            title="Favorite this Adaptation"
                        >
                            <Heart className={`w-6 h-6 ${progress[item.id]?.isFavoriteAdaptation ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {item.genre.map(g => (
                            <span key={g} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">
                                {g}
                            </span>
                        ))}
                    </div>
                </div>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Book className="w-6 h-6 text-purple-500" /> The Book
                    </h2>
                    <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden flex flex-col md:flex-row">
                        <div className="w-full md:w-64 shrink-0">
                            <img src={item.coverUrl} alt="Book Cover" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">{item.bookTitle}</h3>
                                <p className="text-slate-400 text-sm mb-4">Released in {item.bookReleaseYear || 'N/A'}</p>
                                
                                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <Users className="w-4 h-4 text-purple-500" /> 
                                        {item.targetAudience || 'General Audience'}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        {item.bookRating || '4.5'}/5
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <Globe className="w-4 h-4 text-blue-500" />
                                        {item.originalLanguage || 'English'}
                                    </div>
                                </div>
                                <p className="text-slate-300 leading-relaxed mb-6">{item.bookDescription}</p>
                            </div>

                            <div className="flex flex-wrap gap-3 mt-4">
                                <a href={item.readLink || '#'} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors">
                                    <BookOpen className="w-4 h-4" /> Read Preview
                                </a>
                                <a href={item.buyLink || '#'} target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg shadow-purple-900/20">
                                    <ShoppingBag className="w-4 h-4" /> Buy Book
                                </a>
                                <button onClick={() => onToggleFavorite(item.id, 'book')} className={`p-2 rounded-lg border ${progress[item.id]?.isFavoriteBook ? 'border-pink-500 text-pink-500 bg-pink-500/10' : 'border-slate-700 text-slate-400 hover:text-white'}`}>
                                    <Heart className={`w-5 h-5 ${progress[item.id]?.isFavoriteBook ? 'fill-current' : ''}`} />
                                </button>
                                <button onClick={() => onToggleRead(item.id)} className={`p-2 rounded-lg border ${progress[item.id]?.isBookRead ? 'border-green-500 text-green-500 bg-green-500/10' : 'border-slate-700 text-slate-400 hover:text-white'}`}>
                                    <Check className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Film className="w-6 h-6 text-pink-500" /> The Movie
                    </h2>
                    <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden flex flex-col md:flex-row">
                         <div className="w-full md:w-64 shrink-0 order-first md:order-last">
                            <img src={item.moviePosterUrl} alt="Movie Poster" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">{item.movieTitle}</h3>
                                <p className="text-slate-400 text-sm mb-4">Directed by <span className="text-white">{item.director || 'Unknown'}</span></p>
                                
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {item.cast?.map(actor => (
                                        <span key={actor} className="text-xs bg-slate-950 px-2 py-1 rounded text-slate-400 border border-slate-800">{actor}</span>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <Calendar className="w-4 h-4 text-pink-500" /> 
                                        {item.releaseYear || 'N/A'}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        {item.movieRating || '4.0'}/5
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <Users className="w-4 h-4 text-blue-500" />
                                        {item.movieTargetAudience || 'General Audience'}
                                    </div>
                                </div>
                                <p className="text-slate-300 leading-relaxed mb-4">{item.movieDescription || "Cinematic adaptation details..."}</p>
                            </div>

                            <div className="flex flex-wrap gap-3 mt-4">
                                <a href={item.trailerUrl || '#'} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors">
                                    <Play className="w-4 h-4 fill-current" /> Watch Trailer
                                </a>
                                <a href={item.ottLink || '#'} target="_blank" rel="noopener noreferrer" className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg shadow-pink-900/20">
                                    <Tv className="w-4 h-4" /> Watch on OTT
                                </a>
                                 <button onClick={() => onToggleFavorite(item.id, 'movie')} className={`p-2 rounded-lg border ${progress[item.id]?.isFavoriteMovie ? 'border-pink-500 text-pink-500 bg-pink-500/10' : 'border-slate-700 text-slate-400 hover:text-white'}`}>
                                    <Heart className={`w-5 h-5 ${progress[item.id]?.isFavoriteMovie ? 'fill-current' : ''}`} />
                                </button>
                                <button onClick={() => onToggleWatched(item.id)} className={`p-2 rounded-lg border ${progress[item.id]?.isMovieWatched ? 'border-green-500 text-green-500 bg-green-500/10' : 'border-slate-700 text-slate-400 hover:text-white'}`}>
                                    <CheckCircle className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-6">Book vs Movie – Quick Comparison</h2>
                    <div className="space-y-6">
                        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                             <div className="flex items-start gap-4">
                                <div className="p-3 bg-green-500/10 rounded-full">
                                    <Check className="w-6 h-6 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">Spoiler-Free Summary</h3>
                                    <p className="text-slate-300 leading-relaxed italic">"{item.comparisonSummary}"</p>
                                </div>
                             </div>
                        </div>

                        <div className="relative bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden min-h-[150px]">
                            {!showSpoilers && (
                                <div className="absolute inset-0 z-10 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-6">
                                    <AlertTriangle className="w-8 h-8 text-yellow-500 mb-2" />
                                    <h3 className="text-xl font-bold text-white mb-1">Contains Spoilers</h3>
                                    <p className="text-slate-400 mb-4">Analysis includes ending changes and major plot points.</p>
                                    <button 
                                        onClick={() => setShowSpoilers(true)}
                                        className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-full font-bold transition-colors flex items-center gap-2"
                                    >
                                        <Eye className="w-4 h-4" /> Reveal Spoilers
                                    </button>
                                </div>
                            )}
                            
                            <div className={`p-8 transition-opacity duration-500 ${showSpoilers ? 'opacity-100' : 'opacity-10'}`}>
                                <h3 className="text-lg font-bold text-white mb-4">Detailed Differences</h3>
                                <p className="text-slate-300 leading-relaxed">{item.spoilerAnalysis || "No detailed spoiler analysis available for this title yet."}</p>
                                {showSpoilers && (
                                    <button onClick={() => setShowSpoilers(false)} className="mt-4 text-sm text-slate-500 hover:text-white flex items-center gap-1">
                                        <EyeOff className="w-4 h-4" /> Hide Spoilers
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-6">Recommendations</h2>
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-4">Because you viewed {item.movieTitle}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {recommendations.map(rec => (
                                <Link key={rec.id} to={`/adaptation/${rec.id}`} className="bg-slate-900 p-4 rounded-xl border border-slate-800 hover:border-purple-500/50 transition-all flex gap-3">
                                    <img src={rec.coverUrl} className="w-16 h-24 object-cover rounded" alt={rec.bookTitle} />
                                    <div>
                                        <h4 className="font-bold text-white text-sm line-clamp-1">{rec.movieTitle}</h4>
                                        <p className="text-slate-500 text-xs mb-2">{rec.genre[0]}</p>
                                        <span className="text-xs text-purple-400 bg-purple-900/20 px-2 py-1 rounded">View</span>
                                    </div>
                                </Link>
                            ))}
                            {recommendations.length === 0 && <p className="text-slate-500 italic">No similar titles found.</p>}
                        </div>
                    </div>
                </section>

                <section>
                     <h2 className="text-2xl font-bold text-white mb-6">Community & Reviews</h2>
                     <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
                        <div className="flex items-center gap-8 mb-8 pb-8 border-b border-slate-800">
                             <div className="text-center">
                                 <div className="text-3xl font-bold text-white">4.8</div>
                                 <div className="text-xs text-slate-400 uppercase tracking-wide mt-1">Book Rating</div>
                             </div>
                             <div className="h-10 w-px bg-slate-700"></div>
                             <div className="text-center">
                                 <div className="text-3xl font-bold text-white">4.6</div>
                                 <div className="text-xs text-slate-400 uppercase tracking-wide mt-1">Movie Rating</div>
                             </div>
                        </div>
                        <div className="mb-8">
                            <label className="block text-sm font-bold text-slate-300 mb-2">Write a Review</label>
                            <div className="flex gap-2 mb-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button 
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`p-1 transition-transform hover:scale-110 ${star <= rating ? 'text-yellow-500' : 'text-slate-700'}`}
                                    >
                                        <Star className="w-5 h-5 fill-current" />
                                    </button>
                                ))}
                            </div>
                            <textarea 
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                rows={3}
                                placeholder="Share your thoughts on the adaptation..."
                            ></textarea>
                            <div className="flex justify-end mt-2">
                                <button 
                                    onClick={handlePostReview}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-bold text-sm"
                                >
                                    Post Review
                                </button>
                            </div>
                        </div>
                        <div className="space-y-6">
                            {itemReviews.length > 0 ? (
                                itemReviews.map(review => (
                                    <div key={review.id} className="flex gap-4 p-4 bg-slate-950/50 rounded-xl border border-slate-800/50">
                                        <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-300 font-bold shrink-0 text-sm">
                                            {review.userName.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-white">{review.userName}</span>
                                                <div className="flex text-yellow-500 gap-0.5">
                                                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                                                </div>
                                            </div>
                                            <p className="text-slate-300 text-sm leading-relaxed">{review.comment}</p>
                                            <p className="text-slate-600 text-xs mt-2">{review.date}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-500 italic text-center">No reviews yet. Be the first to share your thoughts!</p>
                            )}
                        </div>
                     </div>
                </section>

            </div>
        </div>
    );
};

const FavouritesPage: React.FC<{ adaptations: Adaptation[]; progress: UserProgress; onToggleFavorite: (id: string, type: 'book' | 'movie' | 'adaptation') => void }> = ({ adaptations, progress, onToggleFavorite }) => {
    const favBooks = adaptations.filter(a => progress[a.id]?.isFavoriteBook);
    const favMovies = adaptations.filter(a => progress[a.id]?.isFavoriteMovie);
    const favAdaptations = adaptations.filter(a => progress[a.id]?.isFavoriteAdaptation);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-4xl font-serif font-bold text-white mb-12 text-center">Your Favorites Collection</h2>

            <div className="mb-16">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 border-b border-slate-800 pb-3">
                    <Book className="w-6 h-6 text-purple-500" /> Favourite Books
                </h3>
                {favBooks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favBooks.map(item => (
                            <Link key={item.id} to={`/adaptation/${item.id}`} className="group flex bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl transition-all hover:shadow-purple-900/20 hover:-translate-y-1 h-32">
                                <div className="w-24 shrink-0 relative">
                                    <img src={item.coverUrl} alt={item.bookTitle} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-4 flex flex-col justify-center flex-grow relative">
                                    <h4 className="font-bold text-white truncate mb-1 pr-6">{item.bookTitle}</h4>
                                    <p className="text-slate-500 text-sm mb-1">by {item.author}</p>
                                    <div className="flex items-center gap-1 text-yellow-500 text-xs">
                                        <Star className="w-3 h-3 fill-current" /> {item.bookRating}
                                    </div>
                                    <button onClick={(e) => { e.preventDefault(); onToggleFavorite(item.id, 'book'); }} className="absolute top-2 right-2 text-pink-500 hover:text-white transition-colors">
                                        <Heart className="w-4 h-4 fill-current" />
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : <p className="text-slate-500 italic">No favorite books added yet.</p>}
            </div>

            <div className="mb-16">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 border-b border-slate-800 pb-3">
                    <Film className="w-6 h-6 text-pink-500" /> Favourite Movies
                </h3>
                {favMovies.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favMovies.map(item => (
                            <Link key={item.id} to={`/adaptation/${item.id}`} className="group flex bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl transition-all hover:shadow-pink-900/20 hover:-translate-y-1 h-32">
                                <div className="w-24 shrink-0 relative">
                                    <img src={item.moviePosterUrl} alt={item.movieTitle} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-4 flex flex-col justify-center flex-grow relative">
                                    <h4 className="font-bold text-white truncate mb-1 pr-6">{item.movieTitle}</h4>
                                    <p className="text-slate-500 text-sm mb-1">{item.releaseYear}</p>
                                    <div className="flex items-center gap-1 text-yellow-500 text-xs">
                                        <Star className="w-3 h-3 fill-current" /> {item.movieRating}
                                    </div>
                                    <button onClick={(e) => { e.preventDefault(); onToggleFavorite(item.id, 'movie'); }} className="absolute top-2 right-2 text-pink-500 hover:text-white transition-colors">
                                        <Heart className="w-4 h-4 fill-current" />
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : <p className="text-slate-500 italic">No favorite movies added yet.</p>}
            </div>

            <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 border-b border-slate-800 pb-3">
                    <Star className="w-6 h-6 text-yellow-500" /> Favourite Adaptations
                </h3>
                {favAdaptations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favAdaptations.map(item => (
                            <Link key={item.id} to={`/adaptation/${item.id}`} className="group flex bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl transition-all hover:shadow-yellow-900/20 hover:-translate-y-1 h-32">
                                <div className="w-24 shrink-0 relative flex">
                                    <div className="w-1/2 h-full">
                                        <img src={item.coverUrl} className="w-full h-full object-cover" alt="Book" />
                                    </div>
                                    <div className="w-1/2 h-full">
                                        <img src={item.moviePosterUrl} className="w-full h-full object-cover" alt="Movie" />
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col justify-center flex-grow relative">
                                    <h4 className="font-bold text-white group-hover:text-yellow-500 transition-colors truncate mb-1 pr-6">{item.movieTitle}</h4>
                                    <p className="text-xs text-slate-400 truncate mb-2">Based on {item.bookTitle}</p>
                                    <div className="flex gap-1">
                                        {item.genre.slice(0, 2).map(g => (
                                            <span key={g} className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">{g}</span>
                                        ))}
                                    </div>
                                    <button onClick={(e) => { e.preventDefault(); onToggleFavorite(item.id, 'adaptation'); }} className="absolute top-2 right-2 text-pink-500 hover:text-white transition-colors">
                                        <Heart className="w-4 h-4 fill-current" />
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : <p className="text-slate-500 italic">No general favorites added yet.</p>}
            </div>
        </div>
    );
};

const DonePage: React.FC<{ 
    adaptations: Adaptation[]; 
    progress: UserProgress; 
    onToggleRead: (id: string) => void;
    onToggleWatched: (id: string) => void;
}> = ({ adaptations, progress, onToggleRead, onToggleWatched }) => {
    
    const doneItems = adaptations.filter(a => progress[a.id]?.isBookRead || progress[a.id]?.isMovieWatched);

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-4xl font-serif font-bold text-white mb-4 text-center">Reading & Watching Log</h2>
            <p className="text-slate-400 text-center mb-12">Track your completed journey through pages and screens.</p>

            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-medium">Adaptation Title</th>
                                <th className="px-6 py-4 font-medium text-center">Book Status</th>
                                <th className="px-6 py-4 font-medium text-center">Movie Status</th>
                                <th className="px-6 py-4 font-medium text-center">Rating</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {doneItems.map(item => {
                                const isBookRead = progress[item.id]?.isBookRead;
                                const isMovieWatched = progress[item.id]?.isMovieWatched;
                                
                                return (
                                    <tr key={item.id} className="hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <Link to={`/adaptation/${item.id}`} className="block">
                                                <div className="font-bold text-white group-hover:text-purple-400 transition-colors">{item.movieTitle}</div>
                                                <div className="text-xs text-slate-500">by {item.author}</div>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button 
                                                onClick={() => onToggleRead(item.id)}
                                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                                                    isBookRead 
                                                    ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                                                    : 'bg-slate-800 text-slate-500 border border-slate-700 hover:text-white'
                                                }`}
                                            >
                                                <BookOpen className="w-3 h-3" />
                                                {isBookRead ? 'Read' : 'Mark Read'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button 
                                                onClick={() => onToggleWatched(item.id)}
                                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                                                    isMovieWatched
                                                    ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                                                    : 'bg-slate-800 text-slate-500 border border-slate-700 hover:text-white'
                                                }`}
                                            >
                                                <Film className="w-3 h-3" />
                                                {isMovieWatched ? 'Watched' : 'Mark Watched'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-yellow-500 text-sm font-bold">
                                                -
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                            {doneItems.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500 italic">
                                        No completed items yet. Go exploring!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const Reviews: React.FC<{ reviews: Review[], onAddReview: (r: Review) => void }> = ({ reviews, onAddReview }) => {
     const [newReview, setNewReview] = useState({ userName: '', comment: '', rating: 5, itemName: '' });

     const handleSubmit = (e: React.FormEvent) => {
         e.preventDefault();
         onAddReview({
             id: Date.now().toString(),
             userName: newReview.userName || 'Anonymous',
             comment: newReview.comment,
             rating: newReview.rating,
             itemName: newReview.itemName,
             itemId: 'temp', 
             date: new Date().toISOString().split('T')[0]
         });
         setNewReview({ userName: '', comment: '', rating: 5, itemName: '' });
     };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-4xl font-serif font-bold text-white mb-4 text-center">Community Voices</h2>
            <p className="text-slate-400 text-center mb-12">What readers and watchers are saying.</p>
            
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 mb-16 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Edit2 className="w-5 h-5 text-purple-500" /> Write a Review
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Your Name</label>
                            <input 
                                placeholder="e.g. Alice" 
                                className="bg-slate-950 border border-slate-700 rounded-xl p-3 text-white w-full focus:outline-none focus:border-purple-500 transition-colors"
                                value={newReview.userName}
                                onChange={e => setNewReview({...newReview, userName: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Book or Movie Title</label>
                            <input 
                                placeholder="e.g. Dune" 
                                className="bg-slate-950 border border-slate-700 rounded-xl p-3 text-white w-full focus:outline-none focus:border-purple-500 transition-colors"
                                value={newReview.itemName}
                                onChange={e => setNewReview({...newReview, itemName: e.target.value})}
                                required
                            />
                        </div>
                     </div>
                     <div>
                        <label className="block text-sm text-slate-400 mb-2">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button 
                                    key={star}
                                    type="button"
                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                    className={`p-1 transition-transform hover:scale-110 ${star <= newReview.rating ? 'text-yellow-500' : 'text-slate-700'}`}
                                >
                                    <Star className="w-6 h-6 fill-current" />
                                </button>
                            ))}
                        </div>
                     </div>
                     <div>
                        <label className="block text-sm text-slate-400 mb-2">Your Review</label>
                        <textarea 
                            placeholder="Share your thoughts..." 
                            rows={3}
                            className="bg-slate-950 border border-slate-700 rounded-xl p-3 text-white w-full focus:outline-none focus:border-purple-500 transition-colors"
                            value={newReview.comment}
                            onChange={e => setNewReview({...newReview, comment: e.target.value})}
                            required
                        />
                     </div>
                    <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-purple-500/25">
                        Post Review
                    </button>
                </form>
            </div>

            <div className="grid gap-6">
                {reviews.map(review => (
                    <div key={review.id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-slate-700 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold">
                                    {review.userName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{review.userName}</h4>
                                    <p className="text-purple-400 text-xs">reviewed {review.itemName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                                <span className="text-yellow-500 font-bold">{review.rating}</span>
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed pl-14 relative">
                            <Quote className="w-4 h-4 text-slate-700 absolute -left-0 -top-1" />
                            {review.comment}
                        </p>
                        <div className="text-right mt-4">
                            <span className="text-slate-600 text-xs">{review.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Authors: React.FC<{ authors: Author[] }> = ({ authors }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-4xl font-serif font-bold text-white mb-12 text-center">Literary Masters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {authors.map(author => (
                    <div key={author.id} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col items-center text-center group">
                        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-slate-700 shadow-lg group-hover:border-purple-500 transition-colors">
                            <img src={author.imageUrl} alt={author.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{author.name}</h3>
                        <p className="text-slate-400 text-sm mb-4 line-clamp-3">{author.bio}</p>
                        <div className="mt-auto">
                            <h4 className="text-xs font-bold text-purple-400 uppercase mb-2">Notable Works</h4>
                            <div className="flex flex-wrap justify-center gap-2">
                                {author.notableWorks.map(work => (
                                    <span key={work} className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300 border border-slate-700">{work}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const App: React.FC = () => {
  const [adaptations, setAdaptations] = useState<Adaptation[]>(INITIAL_ADAPTATIONS);
  const [authors, setAuthors] = useState<Author[]>(INITIAL_AUTHORS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({});

  const isLoggedIn = currentUser !== null;
  const isAdmin = currentUser?.role === 'admin';

  const toggleProgress = (id: string, field: keyof UserProgress[string]) => {
      setUserProgress(prev => {
          const current = prev[id] || {};
          return {
              ...prev,
              [id]: {
                  ...current,
                  [field]: !current[field]
              }
          };
      });
  };

  const handleToggleFavorite = (id: string, type: 'book' | 'movie' | 'adaptation') => {
      if (type === 'book') toggleProgress(id, 'isFavoriteBook');
      else if (type === 'movie') toggleProgress(id, 'isFavoriteMovie');
      else toggleProgress(id, 'isFavoriteAdaptation');
  };

  const handleToggleRead = (id: string) => {
      toggleProgress(id, 'isBookRead');
  };

  const handleToggleWatched = (id: string) => {
      toggleProgress(id, 'isMovieWatched');
  };

  const handleToggleDone = (id: string) => {
      setUserProgress(prev => {
          const current = prev[id] || {};
          const isFullyDone = current.isBookRead && current.isMovieWatched;
          return {
              ...prev,
              [id]: {
                  ...current,
                  isBookRead: !isFullyDone,
                  isMovieWatched: !isFullyDone
              }
          };
      });
  };

  const handleAddReview = (review: Review) => {
    setReviews([review, ...reviews]);
  };

  const handleAddAdaptation = (adaptation: Adaptation) => {
    setAdaptations([...adaptations, adaptation]);
  };

  const handleEditAdaptation = (updatedAdaptation: Adaptation) => {
    setAdaptations(adaptations.map(a => a.id === updatedAdaptation.id ? updatedAdaptation : a));
  };

  const handleDeleteAdaptation = (id: string) => {
    setAdaptations(prev => prev.filter(a => a.id !== id));
  };

  const handleAddAuthor = (author: Author) => {
      setAuthors([...authors, author]);
  };

  const handleEditAuthor = (updatedAuthor: Author) => {
      setAuthors(authors.map(a => a.id === updatedAuthor.id ? updatedAuthor : a));
  };

  const handleDeleteAuthor = (id: string) => {
      setAuthors(prev => prev.filter(a => a.id !== id));
  };

  const handleLogin = (email: string, password: string, name?: string) => {
      const role = email === 'admin@gmail.com' ? 'admin' : 'user';
      // Use provided name for signup, or default logic for login
      const userName = name || (role === 'admin' ? 'System Administrator' : 'Book Lover');
      
      setCurrentUser({
          email,
          password,
          role,
          name: userName,
          bio: 'No bio provided yet.',
          favoriteGenres: [],
          avatarUrl: 'https://picsum.photos/seed/user/200/200',
      });
  };

  const handleLogout = () => {
      setCurrentUser(null);
  };

  const handleUpdateProfile = (updatedUser: UserProfile) => {
      setCurrentUser(updatedUser);
  };

  return (
    <HashRouter>
      <Layout isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Home adaptations={adaptations} isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route 
            path="/adaptations" 
            element={isLoggedIn 
                ? <AdaptationList 
                    adaptations={adaptations} 
                    progress={userProgress}
                    onToggleFavorite={handleToggleFavorite} 
                    onToggleWatched={handleToggleDone} 
                  /> 
                : <Navigate to="/login" />
            } 
          />
          <Route 
             path="/adaptation/:id" 
             element={isLoggedIn 
                ? <AdaptationDetails 
                    adaptations={adaptations}
                    progress={userProgress}
                    reviews={reviews}
                    onAddReview={handleAddReview}
                    currentUser={currentUser}
                    onToggleFavorite={handleToggleFavorite}
                    onToggleRead={handleToggleRead}
                    onToggleWatched={handleToggleWatched}
                  /> 
                : <Navigate to="/login" />
             } 
          />
          <Route 
            path="/favourites" 
            element={isLoggedIn 
                ? <FavouritesPage 
                    adaptations={adaptations} 
                    progress={userProgress}
                    onToggleFavorite={handleToggleFavorite} 
                  />
                : <Navigate to="/login" /> 
            } 
          />
          <Route 
            path="/done" 
            element={isLoggedIn 
                ? <DonePage 
                    adaptations={adaptations} 
                    progress={userProgress}
                    onToggleRead={handleToggleRead}
                    onToggleWatched={handleToggleWatched}
                  />
                : <Navigate to="/login" /> 
            } 
          />
          <Route path="/novels" element={<FamousNovels adaptations={adaptations} />} />
          <Route path="/authors" element={<Authors authors={authors} />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/reviews" element={<Reviews reviews={reviews} onAddReview={handleAddReview} />} />
          <Route 
            path="/admin" 
            element={isAdmin 
                ? <Admin 
                    adaptations={adaptations} 
                    authors={authors}
                    onAddAdaptation={handleAddAdaptation} 
                    onEditAdaptation={handleEditAdaptation}
                    onDeleteAdaptation={handleDeleteAdaptation}
                    onAddAuthor={handleAddAuthor}
                    onEditAuthor={handleEditAuthor}
                    onDeleteAuthor={handleDeleteAuthor}
                  /> 
                : <Navigate to="/" replace />
            } 
          />
          <Route path="/profile" element={currentUser ? <Profile user={currentUser} onUpdate={handleUpdateProfile} userProgress={userProgress} reviews={reviews} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;