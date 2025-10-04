import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkIcon, ClockIcon } from '@heroicons/react/24/solid';

// Import TechIcon component
import TechIcon from '../components/TechIcon';

// Import project images
import snowflakeSupportImg from '../assets/project/project1.png';
import platformAutomationImg from '../assets/project/project2.png';
import readinessImg from '../assets/project/project3.png';
import teradataDbaImg from '../assets/project/project4.png';
import accessManagementImg from '../assets/project/project5.png';
import automationSecurityImg from '../assets/project/project6.png';
import advancedAutomationImg from '../assets/project/project7.png';
import ecommerceImg from '../assets/project/project8.png';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
  image?: string;
  responsibilities?: string[];
}

const projects: Project[] = [
  {
    id: 'project1',
    title: 'Snowflake Central Data Ingestion',
    description: 'Drove pipeline integrity for the central Snowflake data ingestion team. Orchestrated incident lifecycles, proactively analyzed job health using BMC Control-M, and executed data flow analysis to guarantee minimal data latency.',
    technologies: ['Snowflake', 'SQL', 'ServiceNow', 'BMC Control-M', 'Jira', 'Linux'],
    image: snowflakeSupportImg,
    responsibilities: [
      'Authored operational reports and conducted Data Flow Analysis, pinpointing job completion status, pending jobs, and source-to-target dependencies.',
      'Engineered and fulfilled manual data ingestion requests, executing precision full load and incremental updates.',
      'Analyzed and secured critical job processing using BMC Control-M, instantly escalating anomalies.',
      'Executed initial diagnostics and restored first level services across data flow and application platforms.',
      'Triaged and resolved P1/P2 incidents for the central Snowflake ingestion pipeline via ServiceNow.'
    ],
  },
  {
    id: 'project2',
    title: 'Data Platform Engineering & Automation',
    description: 'Developed and deployed a Python/Tkinter application for automated operational reporting and comparative analysis. Governed complex production schedules via BMC Control-M and performed failure analysis across Snowflake and Teradata.',
    technologies: ['Python', 'Tkinter', 'Snowflake', 'BMC Control-M', 'Jira', 'Linux'],
    image: platformAutomationImg,
    responsibilities: [
      'Developed a Python/Tkinter desktop application to automate operational report generation, integrating comparative metrics.',
      'Executed in-depth failure analysis, leveraging Job Control Tables (JCT) and the DIY master table for precise status validation.',
      'Governed production scheduling with BMC Control-M operations: Holding, Rerunning, and \'Set to OK\' to maintain pipeline integrity.',
      'Managed incident lifecycles in Jira Atlassian for complex failures, including soft-delete discrepancies.',
      'Resolved pipeline interruptions by correcting JCT errors and troubleshooting source connection issues.',
      'Directed manual Hold/Release activities using Control-M during scheduled system downtimes.'
    ],
  },
  {
    id: 'project3',
    title: 'Data Platform Automation & Readiness',
    description: 'Engineered and implemented a critical automation solution using Control-M scheduled jobs for system downtimes, dynamically managing affected job lists by querying Snowflake metadata to eliminate manual intervention.',
    technologies: ['CTM Automation', 'Snowflake', 'Teradata', 'BMC Control-M', 'Webex', 'Linux'],
    image: readinessImg,
    responsibilities: [
      'Engineered Control-M automation for planned downtimes, creating scheduled jobs for automatic holding and releasing.',
      'Implemented scripts that queried Snowflake metadata to dynamically define job lists requiring manual control, minimizing operational risk.',
      'Executed essential Data First Support activities, including rigorous pre-checks and validations to guarantee data quality.',
      'Performed necessary Delta Clear operations on tables to maintain optimal data ingestion readiness.',
      'Delivered immediate, high-priority communication and resolved escalations via Webex Spaces, serving as the primary bridge to engineering teams.'
    ],
  },
  {
    id: 'project4',
    title: 'Teradata DBA & Snowflake Cross-Platform',
    description: 'Functioned as Teradata DBA, cross-skilling to encompass Snowflake platforms. Tracked performance and sessions in real-time using Teradata Viewpoint, and secured data integrity through system alert and backup management.',
    technologies: ['Teradata', 'Snowflake', 'DBA', 'ServiceNow', 'Teradata Viewpoint'],
    image: teradataDbaImg,
    responsibilities: [
      'Functioned as the specialized Teradata DBA resource, ensuring robust cross-platform functionality with Snowflake.',
      'Controlled database performance and session states in real-time using Teradata Viewpoint.',
      'Actioned critical system alerts, coordinating space allocation to resolve database space needs.',
      'Audited the successful completion of daily and weekly backup jobs, ensuring full data recovery capabilities.'
    ],
  },
  {
    id: 'project5',
    title: 'Access, Change & Backup Management',
    description: 'Drove procedural governance by managing the full User Access and Change Management lifecycle. Spearheaded process efficiency by developing and deploying an automation solution using Power Automate for key operational activities.',
    technologies: ['Access Management', 'Change Management', 'Power Automate', 'ServiceNow'],
    image: accessManagementImg,
    responsibilities: [
      'Governed the user access lifecycle (Teradata/Snowflake), enforcing security protocols for user creation, password resets, and Elevated Access.',
      'Authored and submitted Change Requests (CRs) in ServiceNow, acting as the coordinator for all critical database modifications.',
      'Developed and implemented an automation solution using Power Automate to streamline the manual, weekly Collect Statistics activity.',
      'Analyzed weekly Teradata backup statuses, reporting comprehensive metrics directly to the Operations team.',
      'Coordinated external vendor support by raising and tracking support cases with the Teradata Global Support Organization (GSO).'
    ],
  },
  {
    id: 'project6',
    title: 'Automation Development & Security',
    description: 'Engineered a Web Application (EDAG) to automate critical Teradata DBA functions (user/access/password management). Secured infrastructure by managing Data Center Escort Access and executing system diagnostics.',
    technologies: ['Web App Dev', 'Infrastructure Security', 'Teradata'],
    image: automationSecurityImg,
    responsibilities: [
      'Engineered and deployed a Web Application (EDAG) to automate Teradata DBA functions like user creation, access, and password resets.',
      'Directed infrastructure security by managing Data Center Escort Access for GSO teams during maintenance windows.',
      'Focused on infrastructure security and system diagnostics.'
    ],
  },
  {
    id: 'project7',
    title: 'Advanced Automation & DBA Operations',
    description: 'Spearheaded the development of a Streamlit application integrated with backend scripting to automate governance-controlled database space management, dramatically increasing resource efficiency and compliance.',
    technologies: ['Streamlit', 'Python', 'DBA Operations', 'Teradata BAR', 'IP Whitelisting'],
    image: advancedAutomationImg,
    responsibilities: [
      'Developed and deployed a Streamlit application with backend scripting to automate space management and provisioning.',
      'Enforced resource governance by integrating managerial approval into the automated space addition process.',
      'Enhanced security by executing Teradata LDAP password binding and implementing IP address whitelisting on backend servers.',
      'Streamlined Data Mobility by automating and fulfilling user requests for data copy across environments.'
    ],
  },
  {
    id: 'project8',
    title: 'E-commerce model for Agricultural Products(Academic)',
    description: 'Designed and developed a full-stack e-commerce web application model to directly connect local farmers with consumers, streamlining the sale of fresh agricultural products.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'React', 'Flask', 'MongoDB'],
    image: ecommerceImg,
    responsibilities: [
      'Led the end-to-end design and development of the platform.',
      'Built a RESTful API for handling products, users, and orders.',
      'Created a responsive and intuitive user interface.'
    ],
  },
];

const ProjectDetails: React.FC<{ project: Project | null }> = ({ project }) => {
  if (!project) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a project to see the details.
      </div>
    );
  }

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="p-8 bg-white/60 dark:bg-gray-700/60 rounded-2xl shadow-lg backdrop-blur-sm h-full flex flex-col"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {project.image && (
          <div className="md:w-1/2 flex-shrink-0">
            <img src={project.image} alt={project.title} loading="lazy" className="rounded-lg shadow-md object-cover w-full h-64 md:h-full" />
          </div>
        )}
        <div className="flex-grow flex flex-col">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{project.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">{project.description}</p>

          {project.responsibilities && project.responsibilities.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Key Responsibilities</h4>
              <ul className="list-disc list-inside space-y-2 pl-2 text-gray-700 dark:text-gray-300">
                {project.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Technologies Used:</h4>
        <div className="flex flex-wrap gap-3">
          {project.technologies.map((tech, techIndex) => (
            <div key={techIndex} className="flex flex-col items-center justify-center p-2 bg-sky-100 dark:bg-sky-900/50 rounded-lg w-24 text-center">
              <TechIcon tech={tech} className="w-8 h-8 mb-1" />
              <span className="text-xs font-semibold text-sky-800 dark:text-sky-100">{tech}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-start space-x-4 mt-auto">
        {project.githubLink && (
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition-colors flex items-center text-sm">
            <LinkIcon className="h-4 w-4 mr-2" /> GitHub
          </a>
        )}
        {project.liveLink && (
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center text-sm">
            <LinkIcon className="h-4 w-4 mr-2" /> Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};

const ProjectClock: React.FC<{
  projects: Project[];
  selectedProject: Project | null;
  onSelect: (project: Project) => void;
}> = ({ projects, selectedProject, onSelect }) => {
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState<number | null>(null);

  return (
    <div 
      className="flex items-center justify-center h-full pt-8"
      onMouseLeave={() => setHoveredProjectIndex(null)}
    >
      <div className="relative w-full max-w-sm aspect-square md:max-w-md bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-full shadow-2xl flex items-center justify-center">
        {/* Clock Center */}
        <div className="w-12 h-12 bg-white/50 dark:bg-gray-700/50 rounded-full shadow-inner flex items-center justify-center">
          <ClockIcon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
            <p className="text-4xl font-bold text-gray-700 dark:text-gray-200 -translate-y-12">Works</p>
            <p className="text-md text-gray-500 dark:text-gray-400 max-w-[120px] mx-auto translate-y-12">
              Click on each number icons to view the project details.
            </p>
        </div>

        {/* Pointer Line for Selected Project */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="absolute top-1/2 left-1/2 origin-left h-0.5 bg-blue-500/70 dark:bg-blue-400/70"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                rotate: (projects.findIndex(p => p.id === selectedProject.id) / projects.length) * 360 - 90,
                scaleX: 1,
                opacity: 1,
              }}
              style={{ width: 'calc(50% - 3rem)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </AnimatePresence>

        {/* Pointer Line for Hovered Project */}
        <AnimatePresence>
          {hoveredProjectIndex !== null && (
            <motion.div
              className="absolute top-1/2 left-1/2 origin-left h-0.5 bg-green-500/70 dark:bg-green-400/70"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                rotate: (hoveredProjectIndex / projects.length) * 360 - 90,
                scaleX: 1,
                opacity: 1,
              }}
              exit={{ scaleX: 0, opacity: 0 }}
              style={{ width: 'calc(50% - 3rem)' }}
              transition={{ type: 'spring', stiffness: 500, damping: 40 }}
            />
          )}
        </AnimatePresence>

        {/* Clock Hands/Pointers */}
        {projects.map((project, index) => {
          const angle = (index / projects.length) * 2 * Math.PI - Math.PI / 2; // Angle in radians, offset by -90deg
          const radius = 160; // Radius from center to the project title dot
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          const isSelected = selectedProject?.id === project.id;
          const isHovered = hoveredProjectIndex === index;

          return (
            <motion.div
              key={project.id}
              className={`absolute ${isHovered ? 'z-30' : 'z-10'}`}
              style={{
                // Position the button around the center
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
            >
              <motion.button
                onClick={() => onSelect(project)}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-auto"
                whileHover={{ scale: 1.5 }} // clock index hover size
                onHoverStart={() => setHoveredProjectIndex(index)}
                aria-label={`Select project: ${project.title}`}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`relative group flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
                  ${isSelected ? 'bg-blue-500 shadow-lg' : 'bg-white/80 dark:bg-gray-600/80 shadow-md hover:bg-blue-100 dark:hover:bg-gray-500'}`}>
                  <span className="text-sm font-bold text-gray-700 dark:text-white">{index + 1}</span>
                  {/* Tooltip with project title */}
                  <div className="absolute bottom-full mb-2 w-max max-w-xs px-3 py-1.5 bg-gray-800 text-white text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                    {project.title}
                  </div>
                </div>
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  // Set the first project on initial mount without scrolling
  useEffect(() => {
    setSelectedProject(projects[0]);
  }, []);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    // Scroll to the details section if it exists.
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full min-h-[80vh] p-4 md:p-8">
      <div className="grid grid-cols-1 gap-12 items-center">
        {/* Clock Design */}
        <ProjectClock projects={projects} selectedProject={selectedProject} onSelect={handleProjectSelect} />

        {/* Bottom Side: Project Details */}
        <div className="w-full" ref={detailsRef}>
          <AnimatePresence mode="wait">
            <ProjectDetails project={selectedProject} />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Projects;
