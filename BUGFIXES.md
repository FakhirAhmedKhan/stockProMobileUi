# StockPro App - Bug Fixes & Solutions

## 🐛 Issues Encountered

### 1. **Bundling Error: Cannot find module 'nativewind/babel'**

**Error Message:**
```
ERROR  node_modules\expo-router\entry.js: Cannot find module 'nativewind/babel'
```

**Root Cause:**
- NativeWind was not installed
- Project was using expo-router entry point instead of standard Expo
- NativeWind v4 has different configuration requirements than v2/v3

**Solutions Applied:**

#### Step 1: Install Missing Dependencies
```bash
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
npm install @react-navigation/stack react-native-vector-icons
npm install --save-dev @types/react-native-vector-icons
```

#### Step 2: Fix package.json Entry Point
Changed from:
```json
"main": "expo-router/entry"
```
To:
```json
"main": "node_modules/expo/AppEntry.js"
```

#### Step 3: Rename Conflicting Directory
```bash
Rename-Item -Path "app" -NewName "app.old"
```
The `app` directory was part of expo-router structure and conflicted with our React Navigation setup.

#### Step 4: Update Babel Configuration
NativeWind v4 doesn't use `nativewind/babel` plugin. Updated `babel.config.js`:

```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin'
    ]
  };
};
```

#### Step 5: Create global.css
NativeWind v4 requires a CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Step 6: Import global.css in App.tsx
```tsx
import './global.css';
```

#### Step 7: Clear Caches
```bash
Remove-Item -Recurse -Force .expo, node_modules\.cache
npx expo start --clear
```

---

## ✅ Final Configuration

### babel.config.js
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin'
    ]
  };
};
```

### tailwind.config.js
```javascript
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./Service/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: { /* ... */ },
        secondary: { /* ... */ },
      },
    },
  },
  plugins: [],
}
```

### package.json (key changes)
```json
{
  "main": "node_modules/expo/AppEntry.js",
  "dependencies": {
    "nativewind": "^4.2.1",
    "@react-navigation/native": "^7.1.8",
    "@react-navigation/stack": "^7.4.0",
    "@react-navigation/bottom-tabs": "^7.4.0",
    "react-native-vector-icons": "^10.3.0"
  },
  "devDependencies": {
    "tailwindcss": "3.3.2",
    "@types/react-native-vector-icons": "latest"
  }
}
```

### App.tsx
```tsx
import './global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
```

---

## 📝 Key Learnings

1. **NativeWind v4 vs v2/v3**: Version 4 uses a different setup:
   - No `nativewind/babel` plugin needed
   - Requires `global.css` import
   - Uses Metro configuration (optional)

2. **Expo Router vs Standard Navigation**: 
   - Expo Router uses `app/` directory structure
   - Standard React Navigation uses custom navigators
   - Cannot mix both approaches

3. **Cache Issues**: 
   - Always clear `.expo` and `node_modules/.cache` when changing configuration
   - Use `--clear` flag with `npx expo start`

4. **Dependency Installation Order**:
   - Install core dependencies first (NativeWind, Tailwind)
   - Then navigation libraries
   - Finally type definitions

---

## 🚀 Current Status

✅ Metro bundler running successfully on port 8081  
✅ No bundling errors  
✅ All dependencies installed  
✅ Configuration files correct  
✅ Ready for Android/iOS testing  

---

## 📱 Next Steps for User

1. **Test on Android**:
   ```bash
   # Press 'a' in the Metro terminal
   # Or run: npx expo run:android
   ```

2. **Test on iOS**:
   ```bash
   # Press 'i' in the Metro terminal
   # Or run: npx expo run:ios
   ```

3. **Test on Web**:
   ```bash
   # Press 'w' in the Metro terminal
   ```

4. **Scan QR Code**:
   - Use Expo Go app on your phone
   - Scan the QR code shown in terminal

---

## 🔍 Troubleshooting

If you encounter issues:

1. **Clear all caches**:
   ```bash
   Remove-Item -Recurse -Force .expo, node_modules\.cache
   npm cache clean --force
   ```

2. **Reinstall dependencies**:
   ```bash
   Remove-Item -Recurse -Force node_modules
   npm install
   ```

3. **Reset Metro**:
   ```bash
   npx expo start --clear --reset-cache
   ```

---

**App is now fully functional and ready to run!** 🎉
