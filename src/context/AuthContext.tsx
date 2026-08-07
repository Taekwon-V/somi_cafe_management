import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAllowed: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const INITIAL_USERS = ['inchul17.kim@gmail.com', 'mybest1725@gmail.com'];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAllowed, setIsAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        // Check if user is in allowed_users
        const userDoc = await getDoc(doc(db, 'allowed_users', currentUser.email));
        if (userDoc.exists()) {
          setIsAllowed(true);
        } else {
          // Check hardcoded initial users and add them if they login for the first time
          if (INITIAL_USERS.includes(currentUser.email)) {
            await setDoc(doc(db, 'allowed_users', currentUser.email), {
              email: currentUser.email,
              addedAt: new Date().toISOString(),
              role: 'admin'
            });
            setIsAllowed(true);
          } else {
            setIsAllowed(false);
            // Sign out immediately if not allowed
            await signOut(auth);
            alert("접속 권한이 없습니다. 관리자에게 문의하세요.");
          }
        }
      } else {
        setIsAllowed(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error("Login failed", error);
      alert(`로그인 실패: ${error.message}\n(브라우저 팝업 차단을 해제하거나, Firebase 승인된 도메인 설정을 확인해주세요.)`);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAllowed, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
