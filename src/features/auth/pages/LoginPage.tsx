
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import LoginForm from '@/features/auth/components/LoginForm';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await login(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to access your dashboard
          </p>
        </div>
        
        <div className="bg-card rounded-lg border shadow-sm p-8">
          <LoginForm onLogin={handleLogin} isLoading={isLoading} />
        </div>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Demo credentials:
            <br />
            Admin: admin@example.com / password
            <br />
            User: user@example.com / password
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
