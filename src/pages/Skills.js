import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Database, 
  Server, 
  Globe, 
  Cloud, 
  GitBranch,
  Zap,
  Layers
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: Globe,
      description: 'Modern frontend technologies and frameworks',
      skills: [
        { name: 'React.js', level: 90, icon: '⚛️', color: 'bg-blue-500' },
        { name: 'JavaScript', level: 95, icon: '🟨', color: 'bg-yellow-500' },
        { name: 'TypeScript', level: 85, icon: '🔷', color: 'bg-blue-600' },
        { name: 'HTML5', level: 95, icon: '🌐', color: 'bg-orange-500' },
        { name: 'CSS3', level: 90, icon: '🎨', color: 'bg-blue-400' },
        { name: 'TailwindCSS', level: 88, icon: '💨', color: 'bg-cyan-500' },
        { name: 'Next.js', level: 80, icon: '⚡', color: 'bg-black dark:bg-white' },
        { name: 'Vue.js', level: 75, icon: '💚', color: 'bg-green-500' }
      ]
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: Server,
      description: 'Server-side technologies and APIs',
      skills: [
        { name: 'Node.js', level: 88, icon: '🟢', color: 'bg-green-600' },
        { name: 'Express.js', level: 85, icon: '🚂', color: 'bg-gray-600' },
        { name: 'Python', level: 80, icon: '🐍', color: 'bg-blue-500' },
        { name: 'Java', level: 75, icon: '☕', color: 'bg-red-500' },
        { name: 'PHP', level: 70, icon: '🐘', color: 'bg-purple-500' },
        { name: 'REST APIs', level: 90, icon: '🔗', color: 'bg-green-500' },
        { name: 'GraphQL', level: 75, icon: '📊', color: 'bg-pink-500' },
        { name: 'Microservices', level: 80, icon: '🔧', color: 'bg-indigo-500' }
      ]
    },
    {
      id: 'database',
      title: 'Database & Storage',
      icon: Database,
      description: 'Database management and data storage solutions',
      skills: [
        { name: 'MySQL', level: 85, icon: '🐬', color: 'bg-blue-500' },
        { name: 'MongoDB', level: 80, icon: '🍃', color: 'bg-green-500' },
        { name: 'PostgreSQL', level: 75, icon: '🐘', color: 'bg-blue-600' },
        { name: 'Redis', level: 70, icon: '🔴', color: 'bg-red-500' },
        { name: 'Firebase', level: 80, icon: '🔥', color: 'bg-orange-500' },
        { name: 'AWS S3', level: 75, icon: '☁️', color: 'bg-yellow-500' },
        { name: 'SQLite', level: 85, icon: '💾', color: 'bg-gray-500' },
        { name: 'Elasticsearch', level: 65, icon: '🔍', color: 'bg-green-600' }
      ]
    },
    {
      id: 'devops',
      title: 'DevOps & Tools',
      icon: Cloud,
      description: 'Development operations and deployment tools',
      skills: [
        { name: 'Git', level: 90, icon: '📝', color: 'bg-orange-500' },
        { name: 'Docker', level: 80, icon: '🐳', color: 'bg-blue-500' },
        { name: 'AWS', level: 75, icon: '☁️', color: 'bg-yellow-500' },
        { name: 'CI/CD', level: 80, icon: '🔄', color: 'bg-green-500' },
        { name: 'Linux', level: 85, icon: '🐧', color: 'bg-yellow-600' },
        { name: 'Nginx', level: 70, icon: '🟢', color: 'bg-green-600' },
        { name: 'Kubernetes', level: 65, icon: '⚓', color: 'bg-blue-600' },
        { name: 'Jenkins', level: 70, icon: '🤖', color: 'bg-red-500' }
      ]
    },
    {
      id: 'libraries',
      title: 'Libraries & Frameworks',
      icon: Layers,
      description: 'Popular libraries and development frameworks',
      skills: [
        { name: 'Framer Motion', level: 85, icon: '🎭', color: 'bg-purple-500' },
        { name: 'Redux', level: 80, icon: '🔄', color: 'bg-purple-600' },
        { name: 'Socket.io', level: 75, icon: '🔌', color: 'bg-black dark:bg-white' },
        { name: 'Jest', level: 80, icon: '🧪', color: 'bg-red-500' },
        { name: 'Webpack', level: 70, icon: '📦', color: 'bg-blue-500' },
        { name: 'Babel', level: 75, icon: '⚡', color: 'bg-yellow-500' },
        { name: 'ESLint', level: 85, icon: '🔍', color: 'bg-purple-500' },
        { name: 'Prettier', level: 90, icon: '💅', color: 'bg-pink-500' }
      ]
    },
    {
      id: 'soft-skills',
      title: 'Soft Skills',
      icon: Zap,
      description: 'Professional and interpersonal skills',
      skills: [
        { name: 'Problem Solving', level: 90, icon: '🧩', color: 'bg-blue-500' },
        { name: 'Team Collaboration', level: 85, icon: '👥', color: 'bg-green-500' },
        { name: 'Communication', level: 88, icon: '💬', color: 'bg-purple-500' },
        { name: 'Agile/Scrum', level: 85, icon: '🔄', color: 'bg-orange-500' },
        { name: 'Project Management', level: 80, icon: '📋', color: 'bg-indigo-500' },
        { name: 'Code Review', level: 85, icon: '👀', color: 'bg-cyan-500' },
        { name: 'Documentation', level: 80, icon: '📚', color: 'bg-gray-500' },
        { name: 'Mentoring', level: 75, icon: '🎓', color: 'bg-yellow-500' }
      ]
    }
  ];

  const getLevelColor = (level) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 80) return 'bg-blue-500';
    if (level >= 70) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getLevelText = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    return 'Beginner';
  };

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
            Skills & Technologies
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and expertise across 
            various technologies and domains.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-dark-700"
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mr-4">
                  <category.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05), duration: 0.4 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{skill.icon}</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {skill.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(skill.level)} text-white`}>
                          {getLevelText(skill.level)}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 0.2, duration: 0.8 }}
                        className={`h-2 rounded-full ${skill.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/10 dark:to-blue-900/10 rounded-2xl p-8 border border-primary-200 dark:border-primary-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Always Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Technology is constantly evolving, and I'm committed to staying up-to-date with 
              the latest trends and best practices. I regularly participate in online courses, 
              attend tech conferences, and contribute to open-source projects to expand my skillset.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                Continuous Learning
              </span>
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                Open Source
              </span>
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                Best Practices
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                Innovation
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills; 