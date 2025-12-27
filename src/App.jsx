import { Suspense, lazy, useState } from "react";
import { FaEnvelope } from "react-icons/fa"; // Import an envelope icon for the floating button
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import "./index.css";
import { useSelector } from "react-redux"; // Import useSelector
import ErrorBoundary from "./components/ErrorBoundary"; // Import ErrorBoundary

// Lazy load components
const Banner = lazy(() => import("./components/Banner.jsx"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Projects"));
const Education = lazy(() => import("./components/Education"));


const Contact = lazy(() => import("./components/Contact"));

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode); // Get dark mode state from Redux
  const [isContactOpen, setIsContactOpen] = useState(false); // State to toggle Contact component

  const toggleContact = () => {
    setIsContactOpen(!isContactOpen); // Toggle the Contact component visibility
  };

  return (
    <div
      className={`App min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } pt-16`}
    >
      {/* Sticky Navbar */}
      <NavBar />

      {/* Suspense wrapper with ErrorBoundary for lazy-loaded components */}
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Banner />
          <Skills />
          <Experience />
          <Education />
        </Suspense>
      </ErrorBoundary>

      {/* Conditionally render the Contact component at the bottom */}
      {isContactOpen && (
        <div className="fixed bottom-0 left-0 w-full z-50">
          <ErrorBoundary>
            <Suspense fallback={<div>Loading Contact...</div>}>
              <Contact />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}

      {/* Footer at the bottom */}
      <Footer />

      {/* Floating contact icon at the bottom right */}
      <button
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
        onClick={toggleContact}
        aria-label="Contact Us"
      >
        <FaEnvelope size={24} />
      </button>
    </div>
  );
}

export default App;
