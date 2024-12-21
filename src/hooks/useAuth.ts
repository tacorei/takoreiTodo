import { useState, useEffect } from 'react';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Initialize auth state
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isLoading: false,
        error: null,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      // Implement actual authentication logic here
      const mockUser: User = {
        id: '1',
        name: 'Test User',
        points: 0,
        role: 'child',
        tasks: [],
      };
      localStorage.setItem('user', JSON.stringify(mockUser));
      setAuthState({
        user: mockUser,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        user: null,
        isLoading: false,
        error: 'Authentication failed',
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isLoading: false,
      error: null,
    });
  };

  return {
    user: authState.user,
    isLoading: authState.isLoading,
    error: authState.error,
    login,
    logout,
  };
}