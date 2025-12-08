/**
 * Authentication Service
 * Handles user authentication operations
 */

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: {
        id: string;
        email: string;
        name: string;
    };
}

/**
 * Mock login function
 * Returns success when both email and password are not empty
 */
export const login = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation: both fields must not be empty
    if (!email || !password) {
        return {
            success: false,
            message: 'Email and password are required',
        };
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            success: false,
            message: 'Please enter a valid email address',
        };
    }

    // Mock successful login
    return {
        success: true,
        message: 'Login successful',
        token: 'mock-jwt-token-' + Date.now(),
        user: {
            id: '1',
            email: email,
            name: email.split('@')[0],
        },
    };
};

/**
 * Mock logout function
 */
export const logout = async (): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    // In a real app, you would clear tokens, session data, etc.
    console.log('User logged out');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
    // In a real app, you would check for valid token
    return false;
};
