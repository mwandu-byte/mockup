import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, Globe, Calendar } from 'lucide-react';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
      github: 'https://github.com/mwandu-byte/ecommerce-platform',
      live: 'https://ecommerce-demo.com',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
      category: 'fullstack',
      date: '2023'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=300&fit=crop',
      github: 'https://github.com/mwandu-byte/task-manager',
      live: 'https://task-manager-demo.com',
      tech: ['React', 'TypeScript', 'Firebase', 'TailwindCSS'],
      category: 'frontend',
      date: '2023'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A weather dashboard that displays current weather conditions and forecasts using OpenWeatherMap API with beautiful visualizations.',
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=500&h=300&fit=crop',
      github: 'https://github.com/mwandu-byte/weather-dashboard',
      live: 'https://weather-dashboard-demo.com',
      tech: ['React', 'Chart.js', 'OpenWeatherMap API', 'CSS3'],
      category: 'frontend',
      date: '2022'
    },
    {
      id: 4,
      title: 'Blog API',
      description: 'A RESTful API for a blogging platform with user authentication, CRUD operations, and file upload functionality.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop',
      github: 'https://github.com/mwandu-byte/blog-api',
      live: null,
      tech: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Multer'],
      category: 'backend',
      date: '2022'
    },
    {
      id: 5,
      title: 'Portfolio Website',
      description: 'A responsive portfolio website built with React and TailwindCSS, featuring dark mode, animations, and modern design.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop',
      github: 'https://github.com/mwandui-byte/portfolio',
      live: 'https://your-portfolio.com',
      tech: ['React', 'TailwindCSS', 'Framer Motion', 'Vite'],
      category: 'frontend',
      date: '2023'
    },
    {
      id: 6,
      title: 'Chat Application',
      description: 'A real-time chat application with user authentication, private messaging, and group chat functionality.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop',
      github: 'https://github.com/mwandu-byte/chat-app',
      live: 'https://chat-app-demo.com',
      tech: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'JWT'],
      category: 'fullstack',
      date: '2022'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'fullstack', name: 'Full Stack' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const getTechColor = (tech) => {
    const colors = {
      'React': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      'Node.js': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      'TypeScript': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      'MongoDB': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      'Laravel': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      'Mysql': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      'Express': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300',
      'TailwindCSS': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-300',
      'Firebase': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
      'PostgreSQL': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      'JWT': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
      'Socket.io': 'bg-black text-white dark:bg-white dark:text-black',
      'Stripe': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
      'Chart.js': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
      'Multer': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300',
      'Framer Motion': 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300',
      'Vite': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
      'CSS3': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
    };
    return colors[tech] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
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
            My Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Here are some of the projects I've worked on. Each project represents 
            a unique challenge and learning experience.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                filter === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-dark-700 group"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                
                {/* Project Links */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white/90 dark:bg-dark-800/90 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    <Github className="h-5 w-5" />
                  </motion.a>
                  {project.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white/90 dark:bg-dark-800/90 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </motion.a>
                  )}
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    {project.date}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getTechColor(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600 font-medium rounded-lg transition-colors duration-200"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Code
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-500 dark:text-gray-400 text-lg">
              No projects found for this category.
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects; 