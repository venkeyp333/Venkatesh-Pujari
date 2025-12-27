import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const experiences = [
  {
    id: 1,
    company: 'HCLTech',
    title: 'Lead Engineer',
    period: 'Jun 2025 - Present',
    tags: ['Angular', 'React', 'Spring Boot', 'Python', 'RBAC', 'LDAP', 'OIDC', 'Encryption'],
    bullets: [
      'Developed enterprise-grade web applications using Angular, React, Spring Boot, and Python, enhancing performance by 25% through code refactoring and efficient state management.',
      'Integrated RESTful APIs and backend services, ensuring seamless cross-platform communication and reducing system runtime by 25%.',
      'Implemented privilege control (role-based access control) and fine-grained permissioning to secure application resources.',
      'Worked on authentication integrations including LDAP authentication and OIDC-based single sign-on to improve security and user management.',
      'Implemented secure password encryption/decryption and best-practice credential storage mechanisms.',
      'Conducted peer code reviews and maintained version control using Git and GitHub, supporting migration of legacy systems to modern, cloud-ready architectures.',
    ],
  },
  {
    id: 2,
    company: 'CDAC',
    title: 'Project Associate',
    period: 'Mar 2024 - Jun 2025',
    tags: ['Angular', 'React', 'Spring Boot', 'Tailwind', 'APIs', 'Performance'],
    bullets: [
      'Developed full-stack web applications using Angular, React, Spring Boot, and Python, improving system performance by 25% through code refactoring and efficient state management.',
      'Designed responsive, interactive UIs with Angular, React, and Tailwind CSS, boosting user engagement by 40% and enhancing user experience.',
      'Built and integrated secure RESTful APIs for seamless frontend–backend communication, reducing system runtime by 25% and ensuring cross-platform compatibility.',
    ],
  },
];

function ExperienceCard({ item, darkMode, index }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.li
      variants={itemVariants}
      whileHover={{ y: -6, scale: 1.02 }}
      whileFocus={{ y: -6, scale: 1.02 }}
      tabIndex={0}
      role="article"
      aria-labelledby={`exp-${item.id}-title`}
      className={`relative mb-8 p-6 rounded-xl shadow-md transition-transform focus:outline-none flex flex-col gap-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
    >
      {/* Accent and icon */}
      <div className="flex items-start gap-4">
        <div className={`flex-none w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-cyan-500 text-gray-900' : 'bg-cyan-600 text-white'}`}>
          <FaBriefcase className="w-6 h-6" aria-hidden="true" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <h3 id={`exp-${item.id}-title`} className="text-lg font-semibold truncate">
              {item.title}
            </h3>

            <div className="text-sm text-gray-400 flex items-center gap-2">
              <FaCalendarAlt aria-hidden="true" />
              <span className="whitespace-nowrap">{item.period}</span>
            </div>
          </div>

          <div className="mt-2 text-sm">
            <strong className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{item.company}</strong>

            {/* Tech tags to fill space and add context */}
            {item.tags && (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <span key={t} className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-cyan-700 text-white' : 'bg-cyan-100 text-cyan-800'}`}>
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ul className="mt-2 list-none space-y-2 text-sm">
        {item.bullets.map((b, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <FaCheckCircle className="mt-1 text-cyan-400 shrink-0" aria-hidden="true" />
            <span className="leading-relaxed text-sm">{b}</span>
          </li>
        ))}
      </ul>
    </motion.li>
  );
}

export const Experience = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  return (
    <section id="experience" className={`w-full px-4 py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Experience</h2>
          <p className={`text-lg mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Professional experience highlighting leadership, impact, and technical depth.
          </p>
        </div>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          role="list"
          aria-label="Work experience"
        >
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} item={exp} darkMode={darkMode} index={i} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Experience;
