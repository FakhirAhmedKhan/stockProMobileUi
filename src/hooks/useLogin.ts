import { navigationRef } from "@/navigation/NavigationService";
import { login } from "@/services/AuthService";
import { useSessionUser } from "@/Store/authStore";
import { useState } from "react";
import { Alert } from "react-native";

export const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { setUser, setSessionSignedIn } = useSessionUser();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password");
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
                        userName: rawUser.name ?? rawUser.userName ?? "",
                    });
                    setSessionSignedIn(true);
                }

                Alert.alert("Success", response.message);
                navigationRef.navigate("Dashboard");
            } else {
                Alert.alert("Login Failed", response.message);
            }
        } catch (error) {
            Alert.alert("Error", "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        showPassword,
        setShowPassword,
        handleLogin,
    };
}