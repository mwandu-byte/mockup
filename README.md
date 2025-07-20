# Developer Portfolio Website

A modern, responsive portfolio website built with React.js, featuring dark mode, animations, and a comprehensive showcase of skills and projects.

## 🚀 Features

### Core Features
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **Dark Mode Toggle**: User-selectable dark/light theme with localStorage persistence
- **Modern UI/UX**: Clean, minimal design using TailwindCSS
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **React Router**: Client-side routing for seamless navigation

### Portfolio Sections
- **Home**: Hero section with resume upload/download functionality
- **About**: Personal information, experience timeline, and education
- **Projects**: Project showcase with GitHub links, live demos, and tech badges
- **Skills**: Comprehensive tech stack with proficiency levels
- **Contact**: Contact form and social media links

### Technical Stack
- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js (ready for integration)
- **Database**: MySQL, MongoDB (ready for integration)
- **Others**: Git, Docker, Framer Motion

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd developer-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   └── Navbar.js       # Navigation component
├── context/            # React context providers
│   └── DarkModeContext.js
├── pages/              # Page components
│   ├── Home.js         # Home page with resume upload
│   ├── About.js        # About page
│   ├── Projects.js     # Projects showcase
│   ├── Skills.js       # Skills and tech stack
│   └── Contact.js      # Contact form
├── assets/             # Static assets (images, icons)
├── App.js              # Main app component
├── index.js            # Entry point
└── index.css           # Global styles
```

## 🎨 Customization

### Personal Information
Update the following files with your information:

1. **Home.js**: Update name, title, and description
2. **About.js**: Update personal info, experience, and education
3. **Projects.js**: Add your projects with GitHub links and live demos
4. **Skills.js**: Customize your tech stack and proficiency levels
5. **Contact.js**: Update contact information and social media links

### Styling
- Colors: Modify the primary color scheme in `tailwind.config.js`
- Fonts: Update font imports in `src/index.css`
- Animations: Customize Framer Motion animations in components

### Resume Upload
The resume upload feature is currently client-side only. To enable server-side functionality:

1. Set up a backend server (Node.js/Express)
2. Configure file upload middleware (Multer)
3. Update the upload handler in `Home.js`

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌙 Dark Mode

Dark mode is implemented using:
- TailwindCSS dark mode classes
- React Context for state management
- localStorage for persistence
- Smooth transitions between themes

## 🎭 Animations

Framer Motion animations include:
- Page transitions
- Scroll-triggered animations
- Hover effects
- Loading states

## 📧 Contact Form

The contact form is currently a demo. To enable real functionality:

1. Set up a backend API endpoint
2. Configure email service (SendGrid, Nodemailer)
3. Update the form submission handler in `Contact.js`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the build folder
- **AWS S3**: Upload build files to S3 bucket
- **Heroku**: Deploy with Node.js buildpack

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide React](https://lucide.dev/) - Icon library
- [Unsplash](https://unsplash.com/) - Stock images

## 📞 Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Contact me through the contact form
- Reach out on social media

---

**Happy Coding! 🎉** # DevPortifolio
# weather-app
