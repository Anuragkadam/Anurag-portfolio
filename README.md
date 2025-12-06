# Portfolio Website - React + TypeScript + Vite

A modern, production-ready portfolio website built with React.js, TypeScript, Vite, and Tailwind CSS. Features beautiful animations, dark mode, responsive design, and full functionality.

## 🚀 Features

- **Modern Tech Stack**: React 18+, TypeScript, Vite, Tailwind CSS
- **Beautiful Animations**: Framer Motion animations and transitions
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Fully responsive across all devices
- **Interactive Components**: 
  - Sticky header with scroll-based hide/show
  - Hero section with parallax effects
  - Project filtering and cards
  - Animated skill bars
  - Timeline-based experience section
  - Contact form with validation
  - Newsletter subscription
- **Performance Optimized**: Lazy loading, code splitting, optimized animations
- **Accessibility**: WCAG AA compliant, keyboard navigation
- **SEO Friendly**: Semantic HTML, proper meta tags

## 🛠️ Tech Stack

- **Frontend**: React 18+, TypeScript, Vite
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Typing Effects**: React Type Animation

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
portfolio/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Hero.tsx        # Hero section
│   │   ├── About.tsx       # About section
│   │   ├── Projects.tsx    # Projects showcase
│   │   ├── Skills.tsx      # Skills & technologies
│   │   ├── Experience.tsx  # Work experience timeline
│   │   ├── Contact.tsx     # Contact form
│   │   ├── Footer.tsx      # Footer with newsletter
│   │   └── ScrollToTop.tsx # Back to top button
│   ├── data/               # Static data
│   │   ├── projects.ts     # Projects data
│   │   ├── skills.ts       # Skills data
│   │   ├── experience.ts   # Experience data
│   │   └── personalInfo.ts # Personal information
│   ├── types/              # TypeScript types
│   │   └── index.ts        # Type definitions
│   ├── hooks/              # Custom React hooks
│   │   ├── useScrollDirection.ts
│   │   ├── useActiveSection.ts
│   │   └── useDarkMode.ts
│   ├── utils/              # Utility functions
│   │   └── scrollToSection.ts
│   ├── App.tsx             # Main app component
│   ├── index.css           # Global styles
│   └── main.tsx            # App entry point
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Customization

### Personal Information
Edit `src/data/personalInfo.ts` to update:
- Your name and title
- Contact information
- Social media links
- Bio and roles

### Projects
Edit `src/data/projects.ts` to:
- Add/remove projects
- Update project details
- Change technology tags

### Skills
Edit `src/data/skills.ts` to:
- Update skill levels
- Add new skills
- Change categories

### Experience
Edit `src/data/experience.ts` to:
- Update work history
- Add new positions
- Modify descriptions

### Colors & Theme
Edit `tailwind.config.js` to:
- Customize color palette
- Modify animations
- Update breakpoints

## 🚀 Build & Deploy

1. Build for production:
```bash
npm run build
```

2. Preview production build:
```bash
npm run preview
```

3. Deploy to your preferred platform (Vercel, Netlify, etc.)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

## 🎯 Performance Features

- **Lazy Loading**: Images and components load as needed
- **Code Splitting**: Optimized bundle sizes
- **Optimized Animations**: 60fps smooth animations
- **Minimized Re-renders**: React.memo and proper key usage
- **Debounced Events**: Scroll and resize events optimized

## ♿ Accessibility Features

- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: All interactive elements labeled
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus States**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant colors
- **Screen Reader**: Compatible with assistive technologies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with modern web technologies
- Icons by Lucide React
- Images from Unsplash
- Inspired by modern portfolio designs
