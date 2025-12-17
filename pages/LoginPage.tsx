import React, { useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/supabase';
import { Logo, Icon } from '../components/ui';

const theme = {
    primary: '#8B542F',
    secondary: '#E3793D',
    accent: '#F9A825',
};

const LoginPage: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    const from = location.state?.from?.pathname || "/dashboard";

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (isSignUp) {
                const { error: signUpError } = await authService.signUp(email, password);
                if (signUpError) throw signUpError;
            } else {
                const { error: signInError } = await authService. signIn(email, password);
                if (signInError) throw signInError;
                navigate(from, { replace: true });
            }
        } catch (err:  any) {
            console.error("Auth error:", err);
            setError(err.message || "Authentication failed.");
        } finally {
            setIsLoading(false);
        }
    };

    const fillAdminCredentials = () => {
        setEmail('admin@legalchicks.vip');
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Left Side - Image & Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-stone-900 overflow-hidden">
                <img 
                    src="https://images.pexels.com/photos/1769279/pexels-photo-1769279.jpeg? auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Poultry Farm" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-transparent to-transparent"></div>
                <div className="relative z-10 flex flex-col justify-between p-12 w-full text-white">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm">
                                <Logo className="h-10 w-10" />
                            </div>
                            <span className="text-2xl font-bold tracking-wide">LCEN</span>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-5xl font-bold mb-6 leading-tight">Join the Revolution</h1>
                        <p className="text-xl text-gray-300">Empower your farm with data-driven insights. </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
                <div className="w-full max-w-md">
                    <div className="lg:hidden mb-8">
                        <h1 className="text-3xl font-bold text-stone-900">LCEN</h1>
                    </div>

                    <h2 className="text-2xl font-bold text-stone-900 mb-2">
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-stone-600 mb-8">
                        {isSignUp ? 'Sign up to get started' : 'Sign in to your account'}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus: ring-amber-500"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-amber-500 text-stone-900 py-2 rounded-lg font-semibold hover:bg-amber-600 disabled:opacity-50 transition-colors"
                        >
                            {isLoading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                        >
                            {isSignUp ? 'Already have an account?  Sign in' : "Don't have an account? Sign up"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
