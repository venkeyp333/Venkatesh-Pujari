import { Suspense, lazy, useState } from "react";
import { FaEnvelope } from "react-icons/fa"; // Import an envelope icon for the floating button
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import Banner from "./components/Banner.jsx";
import "./index.css";
import { useSelector } from "react-redux"; // Import useSelector
import ErrorBoundary from "./components/ErrorBoundary"; // Import ErrorBoundary

// Lazy load below-the-fold components
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Projects"));
const Education = lazy(() => import("./components/Education"));
const Contact = lazy(() => import("./components/Contact"));

// Lightweight loading skeleton for perceived performance
const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-6 px-6 py-12">
    <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded" />
    <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
    <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
  </div>
);

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

      {/* Eagerly render Banner for above-the-fold content, keep other sections lazy */}
      <ErrorBoundary>
        <Banner />
        <Suspense fallback={<LoadingSkeleton />}>
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
