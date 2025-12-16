import { TOKEN_NAME_IN_STORAGE } from '@/constants/api.constant'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const ADMIN = 'admin'

export type User = {
    avatar?: string
    userName?: string
    email?: string
    authority?: string[]
    userId?: string
}

type Session = {
    signedIn: boolean
}

type AuthState = {
    session: Session
    user: User
}

type AuthAction = {
    setSessionSignedIn: (payload: boolean) => void
    setUser: (payload: User) => void
}

const getPersistStorage = () => {
    return AsyncStorage
}

const initialState: AuthState = {
    session: {
        signedIn: false,
    },
    user: {
        avatar: '',
        userName: '',
        email: '',
        authority: [], // default no role
    },
}

export const useSessionUser = create<AuthState & AuthAction>()(
    persist(
        (set) => ({
            ...initialState,
            setSessionSignedIn: (payload) =>
                set((state) => ({
                    session: {
                        ...state.session,
                        signedIn: payload,
                    },
                })),
            setUser: (payload) =>
                set((state) => ({
                    user: {
                        ...state.user,
                        ...payload,
                        authority:
                            payload.email === 'fakhir@stockpro.com'
                                ? [ADMIN] // 👈 only you get admin
                                : payload.authority || ['user'], // others remain normal
                    },
                })),
        }),
        {
            name: 'sessionUser',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
)

export const useToken = () => {
    const storage = getPersistStorage()

    const setToken = (token: string) => {
        storage.setItem(TOKEN_NAME_IN_STORAGE, token)
    }

    return {
        setToken,
        token: storage.getItem(TOKEN_NAME_IN_STORAGE),
    }
}
