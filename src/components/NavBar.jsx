import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect, useCallback } from "react";
import lightSwitchSound from '../assets/Audio/light-switch-81967.mp3';
import { Link } from 'react-scroll';
import VenkeyLogo from '../assets/Logo/venkey.png';

export const NavBar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const soundRef = useRef(null);

  const sections = ["home", "skills", "experience", "education"];

  const handleToggleTheme = useCallback(() => {
    // Guard sound playback
    try { soundRef.current?.play?.(); } catch { /* ignore */ }
    dispatch(toggleTheme());
    setIsMenuOpen(false);
  }, [dispatch]);

  const toggleMenu = useCallback(() => setIsMenuOpen(s => !s), []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [darkMode]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    if (isMenuOpen) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('overflow-hidden'); };
  }, [isMenuOpen]);

  return (
    <nav role="navigation" aria-label="Main" className={`${darkMode ? 'bg-[#061425] text-white shadow-md' : 'bg-white text-gray-900 shadow-sm'} fixed w-full top-0 left-0 transition-all duration-300 ease-in-out z-50`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-3 md:px-6 lg:px-8 h-16">

        <div className="flex items-center gap-3">
          <img src={VenkeyLogo} alt="Venkatesh Pujari" className="h-8 w-auto" />
          <span className="sr-only">Venkatesh Pujari</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {sections.map((section) => (
            <Link key={section} to={section} smooth duration={500} className="text-sm hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-md px-2 py-1" role="link">
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          ))}

          <button
            onClick={handleToggleTheme}
            aria-pressed={darkMode}
            aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            className={`ml-2 p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${darkMode ? 'bg-[#07293b] text-cyan-300 hover:bg-[#09354b]' : 'bg-gray-100 text-cyan-700 hover:bg-gray-200'}`}
            title={darkMode ? 'Switch to light' : 'Switch to dark'}
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="text-lg" aria-hidden="true" />
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 ${darkMode ? 'bg-[#07293b] text-white' : 'bg-gray-100 text-gray-800'}`}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="text-lg" />
          </button>
        </div>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className={`md:hidden overflow-hidden w-full ${darkMode ? 'bg-[#061425] text-white' : 'bg-white text-gray-900'} shadow-lg`}
        aria-hidden={!isMenuOpen}
      >
        <div className="px-4 pt-3 pb-6 space-y-2">
          {sections.map((section) => (
            <Link key={section} to={section} smooth duration={500} className="block text-base py-2 px-2 rounded-md hover:bg-white/5 focus:bg-white/10" onClick={() => setIsMenuOpen(false)}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          ))}

          <div className="pt-2 border-t border-white/10">
            <button onClick={handleToggleTheme} className="w-full text-left py-2 px-2 rounded-md hover:bg-white/5">{darkMode ? 'Switch to light' : 'Switch to dark'}</button>
          </div>
        </div>
      </motion.div>

      <audio ref={soundRef} src={lightSwitchSound} preload="auto" />
    </nav>
  );
};
