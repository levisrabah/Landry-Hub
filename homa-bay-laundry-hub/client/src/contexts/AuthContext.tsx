import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginUser, getCurrentUser, logoutUser } from '../api/auth';

// Define the User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  location?: string;
  profile_photo?: string;
  is_verified?: boolean;
}

// Define the AuthContextType interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        localStorage.removeItem('token'); // Clear invalid token
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { token, user: userData } = await loginUser(email, password);
      localStorage.setItem('token', token); // Store token in localStorage
      setUser(userData); // Set user data
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid email or password'); // Re-throw error for the caller to handle
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutUser(); // Call API to handle logout
      localStorage.removeItem('token'); // Clear token from localStorage
      setUser(null); // Clear user data
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user, // Boolean indicating if the user is logged in
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export the useAuth hook as a named export
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export { AuthContext }; // Export the context for direct access if needed
export default AuthProvider; // Export the provider as default
// This allows other components to use the AuthContext directly if needed
// while still providing a convenient hook for most use cases.
// This structure allows for easy access to authentication state and methods throughout the application.
