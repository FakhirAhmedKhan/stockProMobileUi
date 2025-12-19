import { LoginScreenProps, MainLogo } from "@/types/interface";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "@/components/Button";
import { useLogin } from "@/hooks/useLogin";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    showPassword,
    setShowPassword,
    handleLogin,
  } = useLogin();

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        colors={["#1e3a8a", "#3b82f6", "#60a5fa"]}
        className="flex-1"
      >
        <ScrollView contentContainerClassName="flex-grow">
          <View className="flex-1 justify-center px-6 py-12">
            {/* Logo Section */}
            <View className="items-center mb-12">
              <View className="bg-white rounded-full p-6 mb-4 shadow-lg items-center justify-center">
                <Image
                  source={MainLogo}
                  style={{ width: 80, height: 80 }}
                  resizeMode="contain"
                />
              </View>

              <Text className="text-4xl font-bold text-white mb-2">
                StockPro
              </Text>
              <Text className="text-lg text-blue-100">
                Your Trading Companion
              </Text>
            </View>

            {/* Login Form */}
            <View className="bg-white rounded-2xl p-6 shadow-2xl">
              <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Welcome Back
              </Text>

              {/* Email Input */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </Text>
                <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 border border-gray-200">
                  <Icon name="mail-outline" size={20} color="#6b7280" />
                  <TextInput
                    className="flex-1 ml-3 text-base text-gray-800"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-2">
                  Password
                </Text>
                <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 border border-gray-200">
                  <Icon name="lock-closed-outline" size={20} color="#6b7280" />
                  <TextInput
                    className="flex-1 ml-3 text-base text-gray-800"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#9ca3af"
                  />
                  <Icon
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#6b7280"
                    onPress={() => setShowPassword(!showPassword)}
                  />
                </View>
              </View>

              {/* Login Button */}
              <View className="mb-4">
                <Button title="Login" onPress={handleLogin} loading={loading} />
              </View>
            </View>

            {/* Footer */}
            <Text className="text-center text-blue-100 mt-8 text-sm">
              © 2025 StockPro. All rights reserved.
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
