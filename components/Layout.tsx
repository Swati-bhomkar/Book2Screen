import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Users, MapPin, MessageSquare, Shield, Menu, X, Star, LogIn, Film, User, LogOut, Heart, CheckSquare } from 'lucide-react';
import { Chatbot } from './Chatbot';

interface LayoutProps {
    children: React.ReactNode;
    isLoggedIn?: boolean;
    isAdmin?: boolean;
    onLogout?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, isLoggedIn = false, isAdmin = false, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home', icon: BookOpen },
    { path: '/novels', label: 'Famous Novels', icon: Star },
    { path: '/authors', label: 'Authors', icon: Users },
    { path: '/map', label: 'Sales Near You', icon: MapPin },
    { path: '/reviews', label: 'Reviews', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-purple-500" />
              <span className="text-xl font-bold font-serif text-white tracking-wider">Book2Screen</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive(link.path)
                        ? 'bg-slate-800 text-purple-400'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Link>
                ))}
                
                {isLoggedIn && (
                  <>
                    <Link
                      to="/adaptations"
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isActive('/adaptations')
                          ? 'bg-slate-800 text-purple-400'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Film className="h-4 w-4" />
                      <span>Library</span>
                    </Link>
                    <Link
                      to="/favourites"
                      className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 ${
                        isActive('/favourites')
                          ? 'bg-slate-800 text-pink-400'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                      title="Favorites"
                    >
                      <Heart className="h-5 w-5" />
                    </Link>
                    <Link
                      to="/done"
                      className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 ${
                        isActive('/done')
                          ? 'bg-slate-800 text-green-400'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                      title="Done List"
                    >
                      <CheckSquare className="h-5 w-5" />
                    </Link>
                  </>
                )}
              </div>
              
              <div className="h-6 w-px bg-slate-700 mx-2"></div>

              {!isLoggedIn ? (
                  <Link 
                    to="/login"
                    className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                        isActive('/login') 
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
                        : 'bg-slate-800 text-white hover:bg-purple-600'
                    }`}
                  >
                      <LogIn className="h-4 w-4" />
                      <span>Login</span>
                  </Link>
              ) : (
                <div className="flex items-center space-x-3">
                   {isAdmin && (
                        <Link 
                            to="/admin"
                            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                            isActive('/admin') ? 'text-purple-400' : 'text-slate-400 hover:text-white'
                            }`}
                            title="Admin Panel"
                        >
                            <Shield className="h-5 w-5" />
                        </Link>
                   )}
                   
                   <Link 
                     to="/profile"
                     className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium transition-colors border ${
                         isActive('/profile') 
                         ? 'bg-slate-800 text-purple-400 border-purple-500/50' 
                         : 'bg-transparent text-slate-300 border-transparent hover:bg-slate-800'
                     }`}
                   >
                       <User className="h-4 w-4" />
                       <span>Profile</span>
                   </Link>

                   <button 
                     onClick={onLogout}
                     className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                     title="Logout"
                   >
                       <LogOut className="h-4 w-4" />
                   </button>
                </div>
              )}
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'bg-slate-800 text-purple-400'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              ))}
              
              {isLoggedIn && (
                <>
                   <Link
                   to="/adaptations"
                   onClick={() => setIsMobileMenuOpen(false)}
                   className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                     isActive('/adaptations')
                       ? 'bg-slate-800 text-purple-400'
                       : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                   }`}
                 >
                   <Film className="h-5 w-5" />
                   <span>Library</span>
                 </Link>
                 <Link
                   to="/favourites"
                   onClick={() => setIsMobileMenuOpen(false)}
                   className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                     isActive('/favourites')
                       ? 'bg-slate-800 text-pink-400'
                       : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                   }`}
                 >
                   <Heart className="h-5 w-5" />
                   <span>Favourites</span>
                 </Link>
                 <Link
                   to="/done"
                   onClick={() => setIsMobileMenuOpen(false)}
                   className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                     isActive('/done')
                       ? 'bg-slate-800 text-green-400'
                       : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                   }`}
                 >
                   <CheckSquare className="h-5 w-5" />
                   <span>Done List</span>
                 </Link>
                </>
              )}

               {isAdmin && (
                 <Link
                   to="/admin"
                   onClick={() => setIsMobileMenuOpen(false)}
                   className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                     isActive('/admin')
                       ? 'bg-slate-800 text-purple-400'
                       : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                   }`}
                 >
                   <Shield className="h-5 w-5" />
                   <span>Admin Panel</span>
                 </Link>
               )}

               {isLoggedIn && (
                   <Link
                   to="/profile"
                   onClick={() => setIsMobileMenuOpen(false)}
                   className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                     isActive('/profile')
                       ? 'bg-slate-800 text-purple-400'
                       : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                   }`}
                 >
                   <User className="h-5 w-5" />
                   <span>My Profile</span>
                 </Link>
               )}

               {!isLoggedIn ? (
                <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                </Link>
               ) : (
                <button
                    onClick={() => {
                        if(onLogout) onLogout();
                        setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white text-left"
                >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                </button>
               )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6 md:order-2">
              <span className="text-slate-400 hover:text-slate-300 cursor-pointer">Twitter</span>
              <span className="text-slate-400 hover:text-slate-300 cursor-pointer">GitHub</span>
              <span className="text-slate-400 hover:text-slate-300 cursor-pointer">Instagram</span>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-slate-500">
                &copy; 2024 Book2Screen. All rights reserved. Powered by Google Gemini.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Chatbot */}
      <Chatbot />
    </div>
  );
};