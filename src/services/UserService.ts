/**
 * User Service
 * Handles user-related operations
 */

export interface UserProfile {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: string;
    createdAt: string;
    preferences: {
        theme: 'light' | 'dark';
        notifications: boolean;
    };
}

export interface UpdateProfileData {
    name?: string;
    avatar?: string;
    preferences?: {
        theme?: 'light' | 'dark';
        notifications?: boolean;
    };
}

/**
 * Get user profile
 * Returns a dummy user object
 */
export const getUserProfile = async (): Promise<UserProfile> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Return dummy user data
    return {
        id: '1',
        email: 'john.doe@stockpro.com',
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=12',
        role: 'Premium User',
        createdAt: '2024-01-15T10:30:00Z',
        preferences: {
            theme: 'light',
            notifications: true,
        },
    };
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
    data: UpdateProfileData
): Promise<UserProfile> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Get current profile
    const currentProfile = await getUserProfile();

    // Merge updates
    return {
        ...currentProfile,
        ...data,
        preferences: {
            ...currentProfile.preferences,
            ...data.preferences,
        },
    };
};

/**
 * Get user statistics
 */
export const getUserStats = async (): Promise<{
    totalLogins: number;
    lastLogin: string;
    accountAge: number;
}> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    return {
        totalLogins: 127,
        lastLogin: new Date().toISOString(),
        accountAge: 45, // days
    };
};
