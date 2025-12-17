# Stroma

A plant care companion app that helps you track your houseplants and receive smart watering reminders.

**Platform:** iOS only | [Available on the App Store](https://apps.apple.com/app/id6756553969)

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/go) app (for iOS device testing)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**

   Create a `.env` file in the project root:
   ```bash
   EXPO_PUBLIC_SUPABASE_URL=<your_supabase_url>
   EXPO_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your device**
   - Scan the QR code with the [Expo Go app](https://expo.dev/go) on your iOS device
   - Or press `i` to open in iOS Simulator

For more information on running Expo apps locally, see the [Expo development builds documentation](https://docs.expo.dev/develop/development-builds/introduction/).

## Tech Stack

- **Framework:** Expo ~54 + React Native 0.81
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing)
- **Authentication:** [Supabase](https://supabase.com/) (passwordless email OTP)
- **Storage:** AsyncStorage + [Zustand](https://github.com/pmndrs/zustand) (client-side only)
- **Notifications:** [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) (local push notifications)
- **Forms:** React Hook Form + Zod validation

## Architecture Overview

### Local-First Design
Stroma uses a **local-first architecture** where all plant data is stored directly on the user's device via AsyncStorage. There is no hosted database or backend service for plant data—everything lives locally, ensuring privacy and offline functionality.

### Authentication
Authentication is handled by **Supabase** using passwordless email OTP (one-time password). Supabase is used exclusively for authentication; no plant data is sent to or stored on Supabase servers.

### State Management
The app uses **Zustand** with persistence middleware to manage application state across three main stores:
- **Auth store:** User session and authentication state
- **Plants store:** Plant data and CRUD operations
- **Notifications store:** Notification scheduling and preferences

All stores automatically sync to AsyncStorage for persistence across app sessions.

### Notifications
**Local notifications** are powered by Expo Notifications. Reminders are scheduled on-device based on:
- Plant-specific watering schedules (15 supported plant types)
- Season-aware intervals (growing vs dormant periods)
- User's preferred notification time
- Last watered date

No server or backend is required for notifications—all scheduling happens locally.

### Routing
Stroma uses **Expo Router** for [file-based routing](https://docs.expo.dev/router/introduction/), providing type-safe navigation and a clear directory structure that mirrors the app's navigation hierarchy.

## Core Features

### Passwordless Authentication
- Email-based OTP authentication via Supabase
- No password required—users receive an 8-digit code via email
- Session persisted locally for seamless app experience

### Plant Library
- Support for 15 common houseplant types (Pothos, Monstera, Snake Plant, etc.)
- Comprehensive care information for each plant type
- Beautiful plant imagery

### Auto-Generated Reminders
- Smart watering notifications based on plant type and season
- Automatic rescheduling when plants are marked as watered
- Customizable global notification time (default: 9:00 AM)
- Per-plant notification controls

### Plant Management
- Add plants with name, location, and last watered date
- Edit plant details (name, room location)
- Mark plants as watered with date picker
- View upcoming watering schedules organized by urgency (Today, This Week, Next Week, This Month)

### Watering Intelligence
- **Season-aware scheduling:** Different watering intervals for growing season (April–November) vs dormant period (December–March)
- **Plant-specific intervals:** Each plant type has unique watering requirements
- **Smart grouping:** Plants organized by watering urgency
- **Overdue alerts:** Visual indicators for plants past their watering window

### Notification Controls
- Set a global reminder time for all notifications
- Enable/disable notifications per plant
- iOS permission management with helpful prompts

## Project Structure

```
app/                  # File-based routing (Expo Router)
├── (tabs)/          # Main app (tab navigation)
├── onboarding/      # First-time user flow
├── plant/           # Plant management screens
└── sign-in.tsx      # Authentication

stores/              # Zustand state stores (data entities & application state)
components/          # Reusable UI components
pages/               # Reusable page-level UI components
clients/             # External API clients (Supabase, etc.)
constants/           # Application constants and configuration
utils/               # Shared utility functions
types/               # TypeScript type definitions
assets/              # Static assets (images, fonts)
```

## Development

### Available Scripts

- **Start dev server:** `npm start`
- **Run on iOS:** `npm run ios`
- **Run on Android:** `npm run android`
- **Linting:** `npm run lint`
- **Formatting:** `npm run format`

### Environment Variables

Create a `.env` file in the project root with the following variables:

```bash
EXPO_PUBLIC_SUPABASE_URL=<your_supabase_url>
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

### Development Workflow

1. Start the Expo development server with `npm start`
2. Use [Expo Go](https://expo.dev/go) on your iOS device to scan the QR code
3. Make changes to files in the `app/` directory
4. Changes will hot-reload automatically

For more advanced development workflows, see the [Expo documentation](https://docs.expo.dev/).

## Building & Deployment

Stroma uses **EAS Build** for production iOS builds. To build the app:

```bash
eas build --platform ios --profile production
```

For more information on building and deploying Expo apps, see the [EAS Build documentation](https://docs.expo.dev/build/introduction/).

## Learn More

- **Expo Documentation:** [https://docs.expo.dev/](https://docs.expo.dev/)
- **Expo Router:** [https://docs.expo.dev/router/introduction/](https://docs.expo.dev/router/introduction/)
- **Expo Notifications:** [https://docs.expo.dev/versions/latest/sdk/notifications/](https://docs.expo.dev/versions/latest/sdk/notifications/)
- **Supabase Documentation:** [https://supabase.com/docs](https://supabase.com/docs)
- **Zustand Documentation:** [https://github.com/pmndrs/zustand](https://github.com/pmndrs/zustand)

## License

Proprietary - All rights reserved by Venture Spring Media
