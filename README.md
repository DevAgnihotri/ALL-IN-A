# All in Awareness - Maternal Mental Health Platform

<div align="center">
  <img src="public/logo.png" alt="All in Awareness Logo" width="120" height="120" />
  
  **All in Awareness** is a specialized platform focused on maternal mental health that empowers mothers through personalized care, expert support, and evidence-based interventions for postpartum depression, pregnancy anxiety, and perinatal mood disorders.
  
  [![React](https://img.shields.io/badge/React-18.3+-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Firebase](https://img.shields.io/badge/Firebase-11.8+-FF6B35?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0+-BB4B96?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
</div>

---

## **Core Features**

### **Specialized Maternal Mental Health Care**

**Postpartum Depression Focus**  
Targeted support for the 1 in 7 mothers experiencing PPD with evidence-based interventions.

**Pregnancy Anxiety Support**  
Comprehensive tools and resources for managing prenatal stress and anxiety throughout pregnancy.

**Perinatal Mood Disorders**  
Full spectrum care addressing the complete range of maternal mental health challenges.

**Birth Trauma Recovery**  
Specialized approaches for processing and healing from traumatic birth experiences.

### **Advanced Wellness Tracking**

**EPDS Assessment**  
Edinburgh Postnatal Depression Scale integration with personalized care recommendations.

**Comprehensive Metrics**  
Track mood patterns, sleep quality, and other critical maternal health indicators.

**Progress Visualization**  
Clear analytics and trend monitoring to track your healing journey over time.

**Personalization Engine**  
Custom care plans developed based on your specific maternal mental health needs.

### **Expert Network Access**

**Certified Perinatal Specialists**  
Connect with therapists specifically trained in maternal mental health best practices.

**Seamless Booking System**  
Integrated appointment scheduling with qualified maternal mental health professionals.

**Calendar Integration**  
Google Calendar synchronization for streamlined appointment management.

**Flexible Support Options**  
Access to virtual consultations, in-person sessions, and emergency care services.

### **Community Support System**

**Peer Support Networks**  
Connect with other mothers navigating similar mental health challenges.

**Moderated Group Sessions**  
Professionally guided maternal support groups with structured therapeutic approaches.

**Resource Sharing**  
Community-curated resources covering pregnancy, postpartum, and beyond.

**Inclusive Accessibility**  
Supportive environments designed for mothers at every stage of their journey.

### **Evidence-Based Education**

**Maternal Wellness Curriculum**  
Specialized educational content developed for pregnancy and postpartum mental health.

**Interactive Learning Modules**  
Engaging multimedia resources with evidence-based therapeutic techniques.

**Expert-Developed Content**  
Materials created by board-certified perinatal mental health specialists.

**Adaptive Learning Paths**  
Personalized educational journeys tailored to your specific needs and progress.

### **Enterprise-Grade Security**

**Firebase Authentication**  
Industry-standard user authentication with multi-factor security options.

**HIPAA-Compliant Design**  
Privacy-focused architecture specifically designed for sensitive health information.

**End-to-End Encryption**  
Advanced data protection ensuring complete confidentiality of personal information.

**Secure Document Management**  
Protected upload and storage systems for personal health documents and records.

---

## **Technology Architecture**

### **Frontend Stack**

- **React 18** - Modern component-based UI framework with concurrent rendering
- **TypeScript** - Type-safe development environment with enhanced code reliability
- **Vite** - Lightning-fast build tooling and optimized development server
- **Tailwind CSS** - Utility-first styling framework for rapid UI development
- **shadcn/ui** - Professional, accessible component library with modern design

### **Backend Infrastructure**

- **Firebase Firestore** - Scalable NoSQL database with real-time synchronization
- **Firebase Authentication** - Comprehensive user management and security layer
- **Firebase Storage** - Secure file upload and document management system
- **Google Calendar API** - Professional appointment scheduling integration

### **Development Environment**

- **ESLint** - Advanced code quality assurance and error prevention
- **PostCSS** - Modern CSS processing and optimization pipeline
- **Bun** - High-performance package manager and JavaScript runtime

---

## **Quick Start Guide**

### **Prerequisites**

- Node.js 18+ or Bun runtime environment
- Firebase project with Firestore and Authentication enabled
- Google Calendar API credentials (optional for booking features)

### **Installation**

```bash
# Clone the repository
git clone https://github.com/DevAgnihotri/ALL-IN-A.git
cd ALL-IN-A

# Install dependencies (recommended: Bun)
bun install

# Alternative: npm
npm install
```

### **Environment Setup**

Create `.env.local` in your project root:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Google Calendar Integration (Optional)
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### **Firebase Setup**

1. **Create Project**: Initialize at [Firebase Console](https://console.firebase.google.com/)
2. **Enable Authentication**: Configure Email/Password and Google providers
3. **Setup Firestore**: Create database with appropriate security rules
4. **Configure Storage**: Set up file storage with proper access controls
5. **Deploy Rules**: Apply the provided `firestore.rules` and `storage.rules`

### **Development Server**

```bash
# Start development environment
bun dev

# Alternative: npm
npm run dev
```

Access your application at `http://localhost:5173`

---

## **Project Structure**

```
src/
├── components/           # Reusable React components
│   ├── ui/              # Core UI components (shadcn/ui)
│   ├── courses/         # Educational content components
│   ├── ChatBot.tsx      # AI-powered support assistant
│   ├── Profile.tsx      # User profile management
│   ├── HealthMetrics.tsx # Wellness tracking dashboard
│   └── ...
├── contexts/            # React context providers
│   ├── AuthContext.tsx  # Authentication state management
│   └── ...
├── lib/                 # Utility functions and services
│   ├── firebase.ts      # Firebase configuration and setup
│   ├── googleCalendar.ts # Calendar integration services
│   └── ...
├── pages/               # Application page components
│   ├── Landing.tsx      # Marketing and information landing page
│   ├── Courses.tsx      # Educational content interface
│   └── ...
└── data/                # Static configurations and content
```

---

## **Deployment Options**

### **Vercel (Recommended)**

1. Connect GitHub repository to [Vercel](https://vercel.com)
2. Configure environment variables in project settings
3. Enable automatic deployments on repository updates

### **Firebase Hosting**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Authenticate with Firebase
firebase login

# Initialize hosting configuration
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

### **Alternative Platforms**

- **Netlify**: GitHub integration with automatic deployments
- **AWS Amplify**: Full-stack hosting with integrated CI/CD pipeline
- **Docker**: Containerized deployment using provided Dockerfile

---

## **Contributing Guidelines**

We welcome contributions to improve All in Awareness. Please follow these standards:

1. **Fork** the repository and create a feature branch
2. **Follow** TypeScript best practices and ESLint configuration
3. **Write** comprehensive tests for new functionality
4. **Document** changes and update relevant documentation
5. **Submit** pull request with detailed description of changes

### **Development Standards**

- Maintain consistent code formatting with ESLint rules
- Use meaningful commit messages following conventional commits
- Ensure all tests pass before submitting pull requests
- Update documentation for any API or feature changes

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for complete details.

---

## **Support & Contact**

**Issue Reporting**: [GitHub Issues](https://github.com/DevAgnihotri/ALL-IN-A/issues)  
**Developer**: DevAgnihotri  
**Repository**: https://github.com/DevAgnihotri/ALL-IN-A

---

## **Acknowledgments**

**Mental Health Professionals** - Clinical guidance on evidence-based practices  
**Open Source Community** - Foundation tools and libraries  
**User Community** - Feedback and testing support  
**shadcn/ui** - Beautiful, accessible component architecture  
**Firebase** - Reliable backend infrastructure and services

---

<div align="center">
  <strong>Built with care for maternal mental health</strong>  
  <br>  
  <em>Empowering mothers on their journey to wellness</em>
</div>
