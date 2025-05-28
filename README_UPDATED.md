# 🧠 ALLINA - Mental Health Platform

ALLINA's comprehensive mental health platform with therapist booking and Google Calendar integration, designed to empower your wellness journey.

## ✨ Features

- **ALLINA Therapist Booking**: Browse and book sessions with licensed therapists
- **Google Calendar Integration**: Automatic calendar events with Google Meet links
- **Multiple Session Types**: Video, Phone, and Chat sessions
- **Personalized ALLINA Experience**: Tailored content and recommendations
- **Real-time Chat**: Interactive ALLINA support and guidance

## 🚀 Quick Start

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. **Open in Browser**
   ```
   http://localhost:5173
   ```

## 📅 Google Calendar Setup

This project includes Google Calendar and Meet integration for therapist appointments.

### Prerequisites

- Google Cloud Platform account
- Google Calendar API enabled
- OAuth 2.0 credentials configured

### Current Configuration

- **Client ID**: `592394375846-ftp9cnlamo37lm00r1nd6167j0ie0bo7.apps.googleusercontent.com`
- **Authorized Origins**: `http://localhost:5173`, `https://allina-8.vercel.app`
- **Redirect URIs**: Configured for local development and production

### Testing the Integration

1. **Book a Therapy Session**:

   - Navigate to the therapist booking page
   - Select a therapist and session type
   - Choose your preferred date and time
   - Confirm your booking

2. **Add to Calendar**:

   - On the confirmation page, click "Add to Calendar"
   - Sign in to Google when prompted
   - Verify the event appears in your Google Calendar
   - Check that Meet links are included for video sessions

3. **Fallback Testing**:
   - If Google API is unavailable, the system will download a `.ics` file
   - This file can be imported into any calendar application

## 🏗️ Project Structure

```
src/
├── components/
│   ├── TherapistBooking.tsx     # Main booking interface
│   ├── TherapistCalendar.tsx    # Calendar selection
│   ├── BookingConfirmation.tsx  # Booking confirmation with calendar integration
│   └── ui/                      # Reusable UI components
├── contexts/
│   ├── AuthContext.tsx          # Authentication management
│   └── GoogleCalendarContext.tsx # Google Calendar integration
├── lib/
│   ├── googleAuth.ts            # Google OAuth configuration
│   └── googleCalendar.ts        # Calendar API utilities
└── pages/
    └── ...                      # Application pages
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Testing Integration

Run the integration test script:

```bash
node test-integration.js
```

This will:

1. Check dependencies
2. Test the build process
3. Start the development server
4. Provide a testing checklist

## 📋 Testing Checklist

### Component Integration

- [ ] TherapistBooking component loads correctly
- [ ] Therapist selection works properly
- [ ] Session type selection (Video/Phone/Chat) functions
- [ ] Calendar navigation to TherapistCalendar works
- [ ] Date and time selection works
- [ ] Booking confirmation displays correctly

### Google Calendar Integration

- [ ] "Add to Calendar" button appears on confirmation
- [ ] Google OAuth flow works correctly
- [ ] Calendar event is created successfully
- [ ] Meet link is generated for video sessions
- [ ] Fallback .ics download works when API unavailable

### User Experience

- [ ] Smooth navigation between booking steps
- [ ] Clear visual feedback for user actions
- [ ] Error handling displays helpful messages
- [ ] Mobile responsive design works properly

## 🔍 Troubleshooting

### Common Issues

1. **Google API Not Working**:

   - Check that APIs are enabled in Google Cloud Console
   - Verify client ID and authorized origins
   - Ensure user has granted calendar permissions

2. **Component Not Found Errors**:

   - Check import paths in components
   - Verify component exports are correct
   - Run `npm install` to ensure dependencies

3. **Build Errors**:
   - Check TypeScript type definitions
   - Verify all imports are correct
   - Run `npm run lint` to check for code issues

### Environment Setup

For production deployment, ensure:

- Google Cloud OAuth consent screen is published
- Production domains are added to authorized origins
- Environment variables are properly configured

## 📄 Documentation

- [Google Calendar Setup Guide](./GOOGLE_CALENDAR_SETUP.md)
- [Integration Summary](./INTEGRATION_SUMMARY.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🏷️ Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: shadcn/ui, Tailwind CSS
- **State Management**: React Context
- **API Integration**: Google Calendar API, Google Meet
- **Authentication**: Google OAuth 2.0
- **Date Handling**: date-fns
- **Icons**: Lucide React

## 📄 License

This project is licensed under the MIT License.

---

## Project Info (Lovable)

**URL**: https://lovable.dev/projects/d1621c36-8e6d-4a28-9434-4afa9ccd03c2

Changes made via Lovable will be committed automatically to this repo. You can also edit locally and push changes to reflect them in Lovable.
