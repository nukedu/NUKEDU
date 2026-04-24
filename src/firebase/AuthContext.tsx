import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  User,
} from 'firebase/auth';
import { ref, set, get, update, serverTimestamp } from 'firebase/database';
import { auth, googleProvider, db } from './config';

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone: string;
  village: string;
  role: string;
  level: number;
  avatar: string;
  joinDate: string;
  lastLogin: string;
  status: string;
  points: number;
  masaHidmatStart: string;
  masaHidmatEnd: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  isAuthenticated: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  village: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

const defaultProfile: Omit<UserProfile, 'uid' | 'email'> = {
  name: '',
  phone: '',
  village: 'Desa Kedu',
  role: 'anggota',
  level: 5,
  avatar: '',
  joinDate: new Date().toISOString().split('T')[0],
  lastLogin: new Date().toISOString(),
  status: 'active',
  points: 0,
  masaHidmatStart: new Date().toISOString().split('T')[0],
  masaHidmatEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user profile from RTDB
  const loadProfile = async (uid: string) => {
    try {
      const snapshot = await get(ref(db, `users/${uid}`));
      if (snapshot.exists()) {
        setProfile(snapshot.val() as UserProfile);
      }
    } catch (err) {
      console.error('Error loading profile:', err);
    }
  };

  // Save user profile to RTDB
  const saveProfile = async (uid: string, data: Partial<UserProfile>) => {
    try {
      await update(ref(db, `users/${uid}`), {
        ...data,
        lastUpdated: serverTimestamp(),
      });
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  // Log activity
  const logActivity = async (uid: string, action: string, details: string) => {
    try {
      const logRef = ref(db, `activity_logs/${Date.now()}_${uid}`);
      await set(logRef, {
        uid,
        action,
        details,
        timestamp: serverTimestamp(),
        date: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Error logging activity:', err);
    }
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await loadProfile(firebaseUser.uid);
        // Update last login
        await saveProfile(firebaseUser.uid, {
          lastLogin: new Date().toISOString(),
        });
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Login with email/password
  const login = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await logActivity(cred.user.uid, 'LOGIN', `Login via email: ${email}`);
  };

  // Login with Google
  const loginWithGoogle = async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    const isNew = cred.user.metadata.creationTime === cred.user.metadata.lastSignInTime;

    if (isNew) {
      // Create profile for new Google user
      const initials = cred.user.displayName
        ? cred.user.displayName.split(' ').slice(0, 2).map(n => n[0]).join('')
        : 'U';
      const newProfile: UserProfile = {
        ...defaultProfile,
        uid: cred.user.uid,
        email: cred.user.email || '',
        name: cred.user.displayName || 'Pengguna Baru',
        avatar: initials,
      };
      await set(ref(db, `users/${cred.user.uid}`), {
        ...newProfile,
        createdAt: serverTimestamp(),
      });
      setProfile(newProfile);
    }
    await logActivity(cred.user.uid, 'LOGIN', `Login via Google: ${cred.user.email}`);
  };

  // Register
  const register = async (data: RegisterData) => {
    const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
    await updateProfile(cred.user, { displayName: data.name });

    const initials = data.name.split(' ').slice(0, 2).map(n => n[0]).join('');
    const newProfile: UserProfile = {
      ...defaultProfile,
      uid: cred.user.uid,
      email: data.email,
      name: data.name,
      phone: data.phone,
      village: data.village,
      avatar: initials,
    };

    await set(ref(db, `users/${cred.user.uid}`), {
      ...newProfile,
      createdAt: serverTimestamp(),
    });

    setProfile(newProfile);
    await logActivity(cred.user.uid, 'REGISTER', `Pendaftaran baru: ${data.name} - ${data.village}`);
  };

  // Logout
  const logout = async () => {
    if (user) {
      await logActivity(user.uid, 'LOGOUT', 'User logged out');
    }
    await signOut(auth);
    setProfile(null);
  };

  // Reset password
  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  // Update profile
  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    await saveProfile(user.uid, data);
    setProfile(prev => prev ? { ...prev, ...data } : null);
    await logActivity(user.uid, 'UPDATE_PROFILE', 'Profile updated');
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      login,
      loginWithGoogle,
      register,
      logout,
      resetPassword,
      updateUserProfile,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
