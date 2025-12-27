import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Banner = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <section
      id="home"
      ref={ref}
      className={`relative overflow-hidden min-h-screen flex items-center ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}
    >
      {/* Decorative background shapes */}
      <div className="absolute -left-32 -top-20 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 opacity-30 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -right-32 -bottom-20 w-96 h-96 rounded-full bg-gradient-to-br from-yellow-300 via-orange-300 to-red-300 opacity-20 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              <span className="block mb-1 text-sm font-medium uppercase tracking-wider text-gray-400">Hello — I'm</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Venkatesh Pujari</span>
            </h1>

            <div className="text-lg sm:text-xl font-semibold">
              <Typewriter
                options={{
                  strings: ['Full Stack Developer', 'React • Node • SQL', 'Clean Code & Scalable Architecture'],
                  autoStart: true,
                  loop: true,
                  delay: 70,
                  deleteSpeed: 30,
                  cursor: '|',
                }}
              />
            </div>

            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} max-w-xl`}>I build production-ready web applications with a focus on performance, accessibility and clean, maintainable code. Explore my work below and get in touch to collaborate on meaningful products.</p>

            <div className="flex flex-wrap gap-4 items-center">
              
              <a
                href="https://drive.google.com/uc?export=download&id=1TX7GkdCoQueqAejDZemeZV02HlV_CPBV"
                target="_blank"
                rel="noopener noreferrer"
                download
                title="Download Resume"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full transition-transform duration-200 transform ${darkMode ? 'bg-cyan-500 text-gray-900 hover:bg-cyan-400 hover:shadow-lg' : 'bg-cyan-700 text-white hover:bg-cyan-600 hover:shadow-lg'} focus:outline-none focus:ring-2 focus:ring-cyan-400`}
                aria-label="Download resume"
              >
                <FaDownload className="w-4 h-4" aria-hidden="true" />
                <span className="font-medium">Download Resume</span>
              </a>

              <div className="flex items-center gap-3 ml-2">
                <a href="https://github.com/venkeyp333" target="_blank" rel="noopener noreferrer" aria-label="Github" className={`text-gray-500 dark:text-gray-400 hover:text-cyan-400 dark:hover:text-cyan-300 transition-colors`}>
                  <FaGithub size={20} />
                </a>
                <a href="https://www.linkedin.com/in/venkatesh-pujari-632101248" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-blue-600 hover:text-cyan-400 transition-colors">
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-700">React</span>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-700">Node.js</span>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-700">Java</span>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-700">TypeScript</span>
            </div>
          </motion.div>

          {/* Right: Image Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="flex justify-center md:justify-end"
          >

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;