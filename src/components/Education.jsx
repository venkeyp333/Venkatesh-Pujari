import { useSelector } from 'react-redux';
import { FaUniversity } from 'react-icons/fa';

// Education data (text-first, icon accents)
const educationData = [
  {
    institution: "CDAC — PG Diploma, Advanced Computing",
    score: "Secured 77.25%",
    duration: "09/2023 – 02/2024",
    highlights: ['Intensive 24-week, 900-hour advanced program', 'Advanced web technologies & software engineering'],
  },
  {
    institution: "VTU — B.Tech, Computer Science",
    score: "Secured 7 CGPA",
    duration: "07/2019 – 06/2023",
    highlights: ['Strong foundation in algorithms & systems', 'Capstone projects on full-stack development'],
  },
  {
    institution: "KLE — 12th (PCMB)",
    score: "Secured 65%",
    duration: "05/2018 – 05/2019",
    highlights: ['Focused on Math and Science', 'High academic standing'],
  },
  {
    institution: "K J S Sameerwadi — 10th (CBSE)",
    score: "Secured 9 CGPA",
    duration: "05/2016 – 05/2017",
    highlights: ['Completed nationwide CBSE curriculum'],
  },
];

function Education() {
  // Get dark mode state from Redux
  const darkMode = useSelector((state) => state.theme.darkMode);



  return (
    <div id="education" className={`max-w-screen-lg mx-auto p-6 mt-12 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Education</h2>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Explore my educational background</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {educationData.map((edu, index) => (
          <article
            key={index}
            className={`rounded-lg p-5 shadow-md transition-transform hover:-translate-y-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
            role="article"
            aria-labelledby={`edu-${index}-title`}
          >
            <div className="flex items-start gap-4">
              <div className={`flex-none rounded-full w-10 h-10 flex items-center justify-center ${darkMode ? 'bg-cyan-600 text-white' : 'bg-cyan-100 text-cyan-800'}`}>
                <FaUniversity className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h3 id={`edu-${index}-title`} className="text-lg font-semibold">{edu.institution}</h3>
                <p className="text-sm text-gray-400 mt-1">{edu.duration}</p>
              </div>
            </div>

            <div className="mt-4 text-sm">
              {edu.score && <p className="font-medium mb-2">{edu.score}</p>}
              <ul className="list-disc ml-5 space-y-1 text-gray-400">
                {edu.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Education;
