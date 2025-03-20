
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  EyeIcon, 
  EyeOffIcon, 
  LogInIcon, 
  ShieldCheckIcon,
  LockIcon,
  UserIcon,
  ArrowRightIcon 
} from 'lucide-react';
import { toast } from 'sonner';

interface LoginFormProps {
  className?: string;
}

const LoginForm = ({ className }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating API call
    try {
      // Demo credentials for testing
      if (email === 'admin@sarthi.com' && password === 'admin123') {
        toast.success('Login successful!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setTimeout(() => {
          toast.error('Invalid email or password');
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      toast.error('An error occurred during login');
      setIsLoading(false);
    }
  };
  
  return (
    <div className={className}>
      <Card className="w-full max-w-md mx-auto shadow-elevated overflow-hidden animate-blur-in">
        {/* Card top accent line */}
        <div className="h-1 bg-gradient-to-r from-primary to-primary/60" />
        
        <CardHeader className="space-y-1 pt-6">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <ShieldCheckIcon className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold text-center">Login to Sarthi BPO</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  autoComplete="email"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a 
                  href="#" 
                  className="text-xs text-primary hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    toast('Please contact your administrator to reset your password', {
                      description: 'A password reset link will be sent to your email'
                    });
                  }}
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <LockIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? 
                    <EyeOffIcon className="h-5 w-5" /> : 
                    <EyeIcon className="h-5 w-5" />
                  }
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full gap-2 group" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-1">
                  <span className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin" />
                  Logging in...
                </span>
              ) : (
                <>
                  Login
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-center pb-6">
          <p className="text-xs text-muted-foreground text-center">
            Protected by Sarthi security. All data is encrypted and stored securely.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
