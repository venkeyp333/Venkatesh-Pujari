import { useSelector } from "react-redux"; // Access theme state
import { FaLinkedin, FaPhoneAlt, FaEnvelope, FaGithub } from "react-icons/fa"; // Icons
import logo from "../assets/Logo/venkey.png";

export const Footer = () => {
  const darkMode = useSelector((state) => state.theme.darkMode)

  return (
    <footer
      role="contentinfo"
      className={`${darkMode ? 'bg-[#061425] text-gray-100' : 'bg-white text-gray-800'} border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} h-20`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Venkatesh Pujari" className="h-10 w-auto" />
          <div className="leading-tight">
            <p className="font-semibold text-sm">Venkatesh Pujari</p>
            <p className="text-xs text-gray-400">Lead / Full-Stack Engineer</p>
          </div>
        </div>

        {/* Center: Links */}
        <nav aria-label="Footer navigation" className="hidden sm:flex items-center gap-6">
          <a href="https://venkeyp333.github.io/Venkatesh-Pujari/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-cyan-400 transition-colors underline-offset-4 hover:underline">Portfolio</a>
          <a href="https://github.com/venkeyp333" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-cyan-400 transition-colors"><FaGithub className="w-4 h-4" aria-hidden="true" />GitHub</a>
          <a href="https://www.linkedin.com/in/venkatesh-pujari-632101248" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-cyan-400 transition-colors"><FaLinkedin className="w-4 h-4" aria-hidden="true" />LinkedIn</a>
          <a href="/privacy" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Privacy</a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=venkateshpujari333@gmail.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400" aria-label="Compose email in Gmail">
            <FaEnvelope className="w-4 h-4 text-current" aria-hidden="true" />
          </a>
          <a href="https://wa.me/919008439330?text=Hello%20Venkatesh%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400" aria-label="Chat on WhatsApp">
            <FaPhoneAlt className="w-4 h-4 text-current" aria-hidden="true" />
          </a>
        
        </nav>

        {/* Right: Contact Icons (subtle) */}
        <div className="flex items-center gap-3">
  
        </div>
      </div>
    </footer>
  );
};
