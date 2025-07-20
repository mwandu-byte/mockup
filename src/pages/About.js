import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Mail, Phone, GraduationCap, Briefcase } from 'lucide-react';

const About = () => {
  const personalInfo = {
    name: 'Your Name',
    title: 'Full Stack Software Developer',
    email: 'your.email@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    education: 'Bachelor of Science in Computer Science',
    university: 'University of Technology',
    experience: '5+ years',
  };

  const skills = [
    'JavaScript/TypeScript', 'React.js', 'Node.js', 'Python', 'Java',
    'SQL/NoSQL', 'AWS/Cloud', 'Docker', 'Git', 'Agile/Scrum'
  ];

  const experience = [
    {
      year: '2022 - Present',
      title: 'Senior Full Stack Developer',
      company: 'Tech Company Inc.',
      description: 'Led development of scalable web applications using React and Node.js. Implemented CI/CD pipelines and mentored junior developers.'
    },
    {
      year: '2020 - 2022',
      title: 'Full Stack Developer',
      company: 'Startup XYZ',
      description: 'Built and maintained multiple web applications. Collaborated with cross-functional teams to deliver high-quality software solutions.'
    },
    {
      year: '2018 - 2020',
      title: 'Frontend Developer',
      company: 'Digital Agency',
      description: 'Developed responsive user interfaces and implemented modern web technologies. Worked on various client projects.'
    }
  ];

  const education = [
    {
      year: '2014 - 2018',
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Technology',
      description: 'Graduated with honors. Specialized in software engineering and web development.'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Passionate software developer with a love for creating innovative solutions 
            and learning new technologies.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-dark-700 sticky top-24">
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                  {personalInfo.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {personalInfo.name}
                </h2>
                <p className="text-primary-600 dark:text-primary-400 font-medium">
                  {personalInfo.title}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-gray-700 dark:text-gray-300">{personalInfo.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-gray-700 dark:text-gray-300">{personalInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-gray-700 dark:text-gray-300">{personalInfo.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-gray-700 dark:text-gray-300">{personalInfo.education}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-gray-700 dark:text-gray-300">{personalInfo.experience} experience</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Key Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm rounded-full"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-12"
          >
            {/* About Text */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-dark-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                My Story
              </h3>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  I'm a passionate software developer with over 5 years of experience in building 
                  scalable web applications. My journey in technology began during my university 
                  years, where I discovered my love for problem-solving and creating innovative solutions.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Throughout my career, I've worked on various projects ranging from small business 
                  websites to large-scale enterprise applications. I specialize in modern web 
                  technologies including React, Node.js, and cloud platforms.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  When I'm not coding, you can find me contributing to open-source projects, 
                  attending tech meetups, or exploring new technologies. I believe in continuous 
                  learning and staying up-to-date with the latest industry trends.
                </p>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-dark-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Briefcase className="mr-3 h-6 w-6 text-primary-600 dark:text-primary-400" />
                Work Experience
              </h3>
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    className="relative pl-8 border-l-2 border-primary-200 dark:border-primary-800"
                  >
                    <div className="absolute left-0 top-0 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full -ml-2" />
                    <div className="mb-2">
                      <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                        {exp.year}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {exp.title}
                    </h4>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                      {exp.company}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {exp.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-dark-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <GraduationCap className="mr-3 h-6 w-6 text-primary-600 dark:text-primary-400" />
                Education
              </h3>
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    className="relative pl-8 border-l-2 border-primary-200 dark:border-primary-800"
                  >
                    <div className="absolute left-0 top-0 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full -ml-2" />
                    <div className="mb-2">
                      <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                        {edu.year}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {edu.degree}
                    </h4>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                      {edu.school}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {edu.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About; 