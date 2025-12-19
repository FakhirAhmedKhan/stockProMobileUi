import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { login } from '@/services/AuthService';
import Button from '@/components/Button';
import { useSessionUser } from '@/Store/authStore';

type RootStackParamList = {
  Auth: undefined;
  Dashboard: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Auth'
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setSessionSignedIn } = useSessionUser();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      const response = await login(email, password);

      if (response.success) {
        // Persist user details into Zustand auth store
        if (response.user) {
          const rawUser: any = response.user;
          const userId = rawUser.id ?? rawUser.userId ?? rawUser.userID;

          setUser({
            userId,
            email: rawUser.email ?? email,
            userName: rawUser.name ?? rawUser.userName ?? '',
          });
          setSessionSignedIn(true);
        }

        Alert.alert('Success', response.message);
        navigation.navigate('Dashboard');
      } else {
        Alert.alert('Login Failed', response.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={['#2196f3', '#1976d2']} // primary-500 to primary-700
        style={styles.gradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* Logo Section */}
            <View style={styles.logoSection}>
              <View style={styles.iconContainer}>
                <Icon name="trending-up" size={60} color="#2196f3" />
              </View>
              <Text style={styles.title}>StockPro</Text>
              <Text style={styles.subtitle}>
                Your Trading Companion
              </Text>
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
              <Text style={styles.welcomeText}>
                Welcome Back
              </Text>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Email Address
                </Text>
                <View style={styles.inputWrapper}>
                  <Icon name="mail-outline" size={20} color="#666" />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Password
                </Text>
                <View style={styles.inputWrapper}>
                  <Icon name="lock-closed-outline" size={20} color="#666" />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <Icon
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color="#666"
                    onPress={() => setShowPassword(!showPassword)}
                  />
                </View>
              </View>

              {/* Login Button */}
              <Button
                title="Login"
                onPress={handleLogin}
                loading={loading}
                variant="primary"
                style={styles.loginButton}
              />

              {/* Demo Credentials */}
              <View style={styles.demoContainer}>
                <Text style={styles.demoTitle}>
                  💡 Demo Credentials
                </Text>
                <Text style={styles.demoText}>
                  Email: demo@stockpro.com
                </Text>
                <Text style={styles.demoText}>
                  Password: demo123
                </Text>
              </View>
            </View>

            {/* Footer */}
            <Text style={styles.footerText}>
              © 2024 StockPro. All rights reserved.
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24, // px-6
    paddingVertical: 48, // py-12
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 48, // mb-12
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 9999, // rounded-full
    padding: 24, // p-6
    marginBottom: 16, // mb-4
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4, // shadow-lg
  },
  title: {
    fontSize: 36, // text-4xl
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8, // mb-2
  },
  subtitle: {
    fontSize: 18, // text-lg
    color: '#bbdefb', // primary-100
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 16, // rounded-2xl
    padding: 24, // p-6
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10, // shadow-2xl
  },
  welcomeText: {
    fontSize: 24, // text-2xl
    fontWeight: 'bold',
    color: '#1f2937', // gray-800
    marginBottom: 24, // mb-6
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16, // mb-4
  },
  label: {
    fontSize: 14, // text-sm
    fontWeight: '600',
    color: '#374151', // gray-700
    marginBottom: 8, // mb-2
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6', // gray-100
    borderRadius: 8, // rounded-lg
    paddingHorizontal: 16, // px-4
    paddingVertical: 12, // py-3
    borderWidth: 1,
    borderColor: '#e5e7eb', // gray-200
  },
  input: {
    flex: 1,
    marginLeft: 12, // ml-3
    fontSize: 16, // text-base
    color: '#1f2937', // gray-800
  },
  loginButton: {
    marginBottom: 16, // mb-4
  },
  demoContainer: {
    backgroundColor: '#e3f2fd', // primary-50
    borderRadius: 8, // rounded-lg
    padding: 16, // p-4
    marginTop: 16, // mt-4
  },
  demoTitle: {
    fontSize: 12, // text-xs
    fontWeight: '600',
    color: '#1976d2', // primary-700
    marginBottom: 8, // mb-2
  },
  demoText: {
    fontSize: 12, // text-xs
    color: '#1e88e5', // primary-600
  },
  footerText: {
    textAlign: 'center',
    color: '#bbdefb', // primary-100
    marginTop: 32, // mt-8
    fontSize: 14, // text-sm
  },
});

export default LoginScreen;
