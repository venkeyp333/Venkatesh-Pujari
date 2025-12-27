import { useRef, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSelector } from 'react-redux';
import javaIcon from "../assets/SkillsLogo/java-icon.svg";
import javascriptIcon from "../assets/SkillsLogo/logo-javascript.svg";
import bootstrapIcon from "../assets/SkillsLogo/bootstrap-5-1.svg";
import reactIcon from "../assets/SkillsLogo/react-2.svg";
import tailwindIcon from "../assets/SkillsLogo/tailwind-css-2.svg";
import muiIcon from "../assets/SkillsLogo/material-ui-1.svg";
import mongodbIcon from "../assets/SkillsLogo/mongodb-icon-2.svg";
import mysqlIcon from "../assets/SkillsLogo/mysql-3.svg";
import postgresqlIcon from "../assets/SkillsLogo/postgresql.svg";
import firebaseIcon from "../assets/SkillsLogo/firebase.svg";
import gsapIcon from "../assets/SkillsLogo/gsap-greensock.svg";
import framerIcon from "../assets/SkillsLogo/framer-motion.svg"; 
import reduxIcon from "../assets/SkillsLogo/redux.svg"; 
import D3con from "../assets/SkillsLogo/d3-2.svg"; 
import ChartIcon from "../assets/SkillsLogo/chartjs-logo.svg"; 
import typeScriptIcon from "../assets/SkillsLogo/TypeScript.png"; 
import angularIcon from "../assets/SkillsLogo/Angular.png"; 
import sprinbootIcon from "../assets/SkillsLogo/icons8-spring-boot.svg"; 
import oracleIcon from "../assets/SkillsLogo/oracle-logo.svg"; 





const categoryOrder = [
  { key: 'All', label: 'All' },
  { key: 'Languages', label: 'Languages' },
  { key: 'UI', label: 'UI & Styling' },
  { key: 'Frameworks', label: 'Frameworks' },
  { key: 'Animation', label: 'Animation' },
  { key: 'Charts', label: 'Charts' },
  { key: 'Databases', label: 'Databases' },
];

function Skills() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [active, setActive] = useState('All');

  const skills = useMemo(() => ({
    Languages: [
      { icon: javascriptIcon, name: 'JavaScript' },
      { icon: typeScriptIcon, name: 'TypeScript' },
      { icon: javaIcon, name: 'Java' },
    ],
    UI: [
      { icon: bootstrapIcon, name: 'Bootstrap' },
      { icon: tailwindIcon, name: 'Tailwind CSS' },
      { icon: muiIcon, name: 'Material UI' },
    ],
    Frameworks: [
      { icon: reactIcon, name: 'React.js' },
      { icon: angularIcon, name: 'Angular' },
      { icon: reduxIcon, name: 'Redux' },
      { icon: sprinbootIcon, name: 'Spring Boot' },

    ],
    Animation: [
      { icon: gsapIcon, name: 'GSAP' },
      { icon: framerIcon, name: 'Framer Motion' },
    ],
    Charts: [
      { icon: ChartIcon, name: 'Chart.js' },
      { icon: D3con, name: 'D3.js' },
    ],
    Databases: [
      { icon: oracleIcon, name: 'Oracle' },
      { icon: mysqlIcon, name: 'MySQL' },
      { icon: postgresqlIcon, name: 'PostgreSQL' },
      { icon: firebaseIcon, name: 'Firebase' },
      { icon: mongodbIcon, name: 'MongoDB' },
    ],
  }), []);

  const filtered = useMemo(() => {
    if (active === 'All') {
      return Object.values(skills).flat();
    }
    return skills[active] || [];
  }, [active, skills]);

  return (
    <section
      id="skills"
      ref={ref}
      className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} py-20 relative`}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <motion.h2
            className={`text-4xl font-bold`}
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Skills
          </motion.h2>
          <motion.p
            className={`mt-4 max-w-2xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            I build clean, maintainable software using modern tools and best
            practices. Below are technologies I use regularly — click a category
            to filter and explore.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categoryOrder.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              aria-pressed={active === c.key}
              className={`px-4 py-2 rounded-full font-medium focus:outline-none transition-shadow ${
                active === c.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : darkMode
                  ? 'bg-gray-800 text-gray-300 hover:shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:shadow-sm'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, staggerChildren: 0.05 }}
        >
          {filtered.map((skill, i) => (
            <motion.div
              key={`${skill.name}-${i}`}
              className={`flex flex-col items-center p-4 rounded-xl border ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-100 bg-white'} shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200`}
              whileHover={{ scale: 1.02 }}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 8 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 flex items-center justify-center mb-3 rounded-full bg-white p-2">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  width={64}
                  height={64}
                />
              </div>
              <h4 className={`text-sm font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{skill.name}</h4>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Want a customized skillset highlight? Tell me which skills you want emphasized.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Skills;
