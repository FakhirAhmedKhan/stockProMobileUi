# StockPro React Native App

A complete React Native application built with TypeScript, NativeWind, and React Navigation.

## 🚀 Features

- ✅ **Authentication Flow** - Login screen with mock validation
- ✅ **Dashboard** - Main hub with navigation to demo screens
- ✅ **Demo Screens** - Three feature-rich screens (Analytics, Markets, Settings)
- ✅ **Modern Styling** - NativeWind (Tailwind CSS for React Native)
- ✅ **Type Safety** - Full TypeScript implementation
- ✅ **Icons** - react-native-vector-icons (Ionicons)
- ✅ **Navigation** - React Navigation (Stack + Bottom Tabs)
- ✅ **Service Layer** - Organized in `Service/` folder with TypeScript interfaces

## 📁 Project Structure

```
my-app/
├── Service/
│   ├── authService.ts          # Authentication logic
│   └── userService.ts          # User profile operations
├── src/
│   ├── components/
│   │   ├── Button.tsx          # Reusable button component
│   │   └── Header.tsx          # Reusable header component
│   ├── navigation/
│   │   ├── AppNavigator.tsx    # Main app navigator
│   │   ├── AuthNavigator.tsx   # Auth flow navigator
│   │   └── DashboardNavigator.tsx  # Dashboard tabs navigator
│   └── screens/
│       ├── LoginScreen.tsx     # Login screen
│       ├── DashboardScreen.tsx # Main dashboard
│       ├── ScreenA.tsx         # Analytics screen
│       ├── ScreenB.tsx         # Market statistics screen
│       └── ScreenC.tsx         # Settings screen
├── App.tsx                     # App entry point
├── babel.config.js             # Babel configuration
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── nativewind-env.d.ts         # NativeWind types
```

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (optional but recommended)

### Step 1: Install Dependencies

```bash
# Install NativeWind and Tailwind CSS
npm install nativewind
npm install --save-dev tailwindcss@3.3.2

# Install React Navigation
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install react-native-gesture-handler react-native-reanimated

# Install Vector Icons
npm install react-native-vector-icons
npm install --save-dev @types/react-native-vector-icons

# For Expo projects
npx expo install react-native-screens react-native-safe-area-context
```

### Step 2: Run the App

```bash
# For Expo
npx expo start

# For bare React Native
# iOS
npx react-native run-ios

# Android
npx react-native run-android
```

## 🎨 Screens Overview

### 1. Login Screen
- Email and password inputs
- Form validation
- Mock authentication
- Beautiful gradient design

### 2. Dashboard Screen
- Welcome card with user info
- Navigation cards to demo screens
- Logout functionality
- Clean, modern UI

### 3. Screen A - Analytics
- Analytics dashboard theme
- Stats cards (Growth, Portfolio)
- Feature list with icons
- Pro tips section

### 4. Screen B - Market Statistics
- Market overview
- Stats grid (Markets, Users, Volume, Trades)
- Top movers list with real-time data
- Market alerts

### 5. Screen C - Settings
- Account settings
- App preferences with toggles
- Dark mode, notifications, biometric login
- Support & about section

## 🔧 Configuration Files

### babel.config.js
Includes NativeWind and Reanimated plugins for proper styling and animation support.

### tailwind.config.js
Configured with custom color palette and content paths for React Native.

### tsconfig.json
TypeScript configuration with path aliases and strict mode enabled.

## 🎯 Key Technologies

- **React Native** - Mobile app framework
- **TypeScript** - Type safety and better DX
- **NativeWind** - Tailwind CSS for React Native
- **React Navigation** - Navigation library
- **Ionicons** - Icon library
- **Expo** - Development platform (optional)

## 🔐 Demo Credentials

For testing the login screen:

- **Email**: demo@stockpro.com
- **Password**: demo123

Or any valid email format with a non-empty password.

## 📱 Navigation Flow

```
App
├── Auth Navigator (Stack)
│   └── Login Screen
└── Dashboard Navigator (Bottom Tabs)
    ├── Dashboard Home
    ├── Screen A (Analytics)
    ├── Screen B (Markets)
    └── Screen C (Settings)
```

## 🎨 Design Features

- Modern gradient backgrounds
- Card-based layouts
- Smooth transitions
- Responsive design
- Icon integration throughout
- Professional color scheme

## 🛠️ Service Layer

### authService.ts
- `login(email, password)` - Mock authentication
- `logout()` - Clear session
- `isAuthenticated()` - Check auth status

### userService.ts
- `getUserProfile()` - Get user data
- `updateUserProfile(data)` - Update profile
- `getUserStats()` - Get user statistics

## ✅ Ready to Use

All files are complete and ready to run. Simply install dependencies and start the app!

## 📄 License

MIT License - feel free to use this project for learning or as a template.

---

**Built with ❤️ using React Native + TypeScript + NativeWind**
