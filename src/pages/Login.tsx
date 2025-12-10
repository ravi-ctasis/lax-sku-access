import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (email && password) {
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error('Please enter valid credentials');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full border border-primary-foreground/20" />
          <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full border border-primary-foreground/20" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full border border-primary-foreground/20" />
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-transparent">
                <img
                  src="/favicon-16x16.png"
                  alt="LAX Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>

              <span className="text-2xl font-bold">LAX Customer Portal</span>
            </div>
            {/* <p className="text-primary-foreground/70 text-sm">Customer Access System</p> */}
          </div>
          
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold leading-tight mb-4">
                Your B2B Ordering
                <br />
                <span className="text-secondary">Simplified</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-md">
                Access products, manage orders — all in one place.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-primary-foreground/90">View products</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-primary-foreground/90">Submit orders for approval</span>
              </div>
            </div>
          </div>

          <p className="text-primary-foreground/50 text-sm">
            © 2025 LAX Systems. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground text-2xl font-bold">L</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">LAX Customer Portal</span>
              <p className="text-muted-foreground text-sm">Customer Access</p>
            </div>
          </div>

          <Card className="border-0 shadow-lg animate-scale-in">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-secondary hover:text-secondary/80 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                First time here?{' '}
                <Link
                  to="/create-password"
                  className="text-secondary hover:text-secondary/80 font-medium transition-colors"
                >
                  Create your password
                </Link>
              </div>
            </CardContent>
          </Card>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Need help? Contact{' '}
            <a
              href="mailto:support@laxsystems.com"
              className="text-secondary hover:underline"
            >
              info@laxgadgets.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
