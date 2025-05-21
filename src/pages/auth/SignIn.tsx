import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { z } from 'zod';

// Define our validation schema using Zod
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

// Infer the TypeScript type from our schema
type LoginFormInputs = z.infer<typeof loginSchema>;

const SignIn: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();



  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // Check for saved email on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedEmail) {
      // Pre-fill the email field if we have a saved email
      setValue('email', savedEmail);
      setValue('password', savedPassword);
      setValue('rememberMe', true);
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {

    try {
      setLoginError(null);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'Login failed');
      }
      // Handle successful login
      console.log('Login successful:', responseData);
      toast.success(responseData?.message || 'Login successful');

      // Handle "Remember Me" functionality
      if (data.rememberMe) {
        localStorage.setItem('savedEmail', data.email);
        localStorage.setItem('savedPassword', data.password);

        // Set long expiration for token (e.g., 30 days)
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);
        localStorage.setItem('tokenExpiration', expirationDate.toISOString());
      } else {
        localStorage.removeItem('savedEmail');
        localStorage.removeItem('savedPassword');
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);
        localStorage.setItem('tokenExpiration', expirationDate.toISOString());
      }

      // Store token in localStorage or secure cookie
      if (responseData?.data?.token) {
        localStorage.setItem('authToken', responseData.data?.token);

        // Store user data if needed
        if (responseData?.data?.user) {
          localStorage.setItem('user', JSON.stringify(responseData?.data.user));
        }
      }

      // Redirect to dashboard or home page
      navigate('/editor');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to login. Please try again.')
      // setLoginError(error instanceof Error ? error.message : 'Failed to login. Please try again.');
    }
    // Simulate API call
    console.log('Form submitted', data);

    // Add your authentication logic here
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Handle successful login
    // e.g., redirect to dashboard, store token, etc.
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover"
      style={{ backgroundImage: "url(https://images.pexels.com/photos/5706041/pexels-photo-5706041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)" }}>
      <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
      <div className="max-w-md w-full space-y-4 p-8 bg-green-50 rounded-xl z-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome Back!
          </h2>
          <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
        </div>

        {/* Social Login Buttons */}
        <div className="flex flex-row justify-center items-center space-x-3">
          <button className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg text-white bg-blue-900 hover:shadow-lg cursor-pointer transition ease-in duration-300">
            <FaFacebookF />
          </button>
          <button className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg text-white bg-white shadow-sm hover:shadow-lg cursor-pointer transition ease-in duration-300">
            <FcGoogle />
          </button>
          <button className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg text-white bg-blue-500 hover:shadow-lg cursor-pointer transition ease-in duration-300">
            <FaLinkedinIn />
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center space-x-2">
          <span className="h-px w-16 bg-gray-300"></span>
          <span className="text-gray-500 font-normal">OR</span>
          <span className="h-px w-16 bg-gray-300"></span>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="relative">
            <label htmlFor="email" className="text-sm font-bold text-gray-700 tracking-wide">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`w-full bg-green-100 text-base py-2 border-b ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-indigo-500`}
              placeholder="mail@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mt-8 content-center">
            <label htmlFor="password" className="text-sm font-bold text-gray-700 tracking-wide">
              Password
            </label>
            <div className='relative'>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`w-full bg-green-100 content-center text-base py-2 border-b ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-indigo-500`}
                placeholder="Enter your password"
                {...register('password')}
              />
              <button
                type="button"
                className="absolute p-2 right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  // Eye icon (hide)
                  <FaEyeSlash size={22} />
                ) : (
                  // Eye icon (show)
                  <FaEye size={22} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...register('rememberMe')}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link to="/trouble-signing-in" className="font-medium text-indigo-500 hover:text-indigo-600">
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center bg-indigo-500 text-gray-100 p-4 rounded-full tracking-wide
                font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg 
                cursor-pointer transition ease-in duration-300"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-indigo-500 hover:text-indigo-600 no-underline hover:underline cursor-pointer transition ease-in duration-300">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;