import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { z } from 'zod';

// Define our validation schemas using Zod
const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const verificationSchema = z.object({
  code: z.string().min(4, 'Verification code must be at least 4 characters'),
});

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Infer TypeScript types from our schemas
type EmailFormInputs = z.infer<typeof emailSchema>;
type VerificationFormInputs = z.infer<typeof verificationSchema>;
type ResetPasswordFormInputs = z.infer<typeof resetPasswordSchema>;

// Steps in the forgot password flow
enum ForgotPasswordStep {
  EMAIL,
  VERIFICATION,
  RESET_PASSWORD
}

const ForgotPassword: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>(ForgotPasswordStep.EMAIL);
  const [email, setEmail] = useState<string>('');
  const [verificationToken, setVerificationToken] = useState<string>('');
  const navigate = useNavigate();

  // Email Form
  const emailForm = useForm<EmailFormInputs>({
    defaultValues: {
      email: '',
    },
  });

  // Verification Form
  const verificationForm = useForm<VerificationFormInputs>({
    defaultValues: {
      code: '',
    },
  });

  // Reset Password Form
  const resetPasswordForm = useForm<ResetPasswordFormInputs>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Handle email form submission
  const onEmailSubmit: SubmitHandler<EmailFormInputs> = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/forget-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to send verification code');
      }

      setEmail(data.email);
      toast.success(responseData?.message || 'Verification code sent successfully!');
      setCurrentStep(ForgotPasswordStep.VERIFICATION);
    } catch (error) {
      console.error('Error sending verification code:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send verification code. Please try again.');
    }
  };

  // Handle verification form submission
  const onVerificationSubmit: SubmitHandler<VerificationFormInputs> = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/forget-password/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code: data.code,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Verification failed');
      }

      setVerificationToken(responseData?.data?.token || '');
      toast.success(responseData?.message || 'Code verified successfully!');
      setCurrentStep(ForgotPasswordStep.RESET_PASSWORD);
    } catch (error) {
      console.error('Verification error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to verify code. Please try again.');
    }
  };

  // Handle reset password form submission
  const onResetPasswordSubmit: SubmitHandler<ResetPasswordFormInputs> = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          reset_token: verificationToken,
          password: data.password,
          confirm_password: data.confirmPassword
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Password reset failed');
      }

      toast.success(responseData?.message || 'Password reset successfully!');
      navigate('/sign-in');
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover"
      style={{ backgroundImage: "url(https://images.pexels.com/photos/5706041/pexels-photo-5706041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)" }}>
      <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
      <div className="max-w-md w-full space-y-4 p-8 bg-green-50 rounded-xl z-10">
        {/* Email Step */}
        {currentStep === ForgotPasswordStep.EMAIL && (
          <>
            <div className="text-center mb-10">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Reset your password
              </h2>
              <p className="mt-2 text-sm text-gray-600 font-sans">
                Don't worry, we've got your back! Just enter your email address and we'll send you a verification code.
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
              <div className="relative">
                <label htmlFor="email" className="text-sm font-bold text-gray-700 tracking-wide">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`w-full bg-green-100 text-base py-2 border-b ${emailForm.formState.errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:border-indigo-500`}
                  placeholder="mail@example.com"
                  {...emailForm.register('email')}
                />
                {emailForm.formState.errors.email && (
                  <p className="text-red-500 text-xs mt-1">{emailForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={emailForm.formState.isSubmitting}
                  className="w-full flex justify-center bg-indigo-500 text-gray-100 p-2 rounded-sm tracking-wide
                    font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg 
                    cursor-pointer transition ease-in duration-300"
                >
                  {emailForm.formState.isSubmitting ? 'Sending...' : 'Send Verification Code'}
                </button>
              </div>

              <p className="flex items-center justify-center mt-10 text-center text-md text-gray-500">
                <span>Return to </span>
                <Link to="/sign-in" className="ml-2 text-indigo-500 hover:text-indigo-600 no-underline hover:underline cursor-pointer transition ease-in duration-300">
                  Sign In
                </Link>
              </p>
            </form>
          </>
        )}

        {/* Verification Step */}
        {currentStep === ForgotPasswordStep.VERIFICATION && (
          <>
            <div className="text-center mb-10">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Verify Code
              </h2>
              <p className="mt-2 text-sm text-gray-600 font-sans">
                Please enter the verification code sent to your email.
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={verificationForm.handleSubmit(onVerificationSubmit)}>
              <div className="relative">
                <label htmlFor="code" className="text-sm font-bold text-gray-700 tracking-wide">
                  Verification Code
                </label>
                <input
                  id="code"
                  type="text"
                  className={`w-full bg-green-100 text-base py-2 border-b ${verificationForm.formState.errors.code ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:border-indigo-500`}
                  placeholder="Enter verification code"
                  {...verificationForm.register('code')}
                />
                {verificationForm.formState.errors.code && (
                  <p className="text-red-500 text-xs mt-1">{verificationForm.formState.errors.code.message}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={verificationForm.formState.isSubmitting}
                  className="w-full flex justify-center bg-indigo-500 text-gray-100 p-2 rounded-sm tracking-wide
                    font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg 
                    cursor-pointer transition ease-in duration-300"
                >
                  {verificationForm.formState.isSubmitting ? 'Verifying...' : 'Verify Code'}
                </button>
              </div>

              <p className="flex items-center justify-center mt-10 text-center text-md text-gray-500">
                <span>Didn't receive a code? </span>
                <button
                  type="button"
                  onClick={() => setCurrentStep(ForgotPasswordStep.EMAIL)}
                  className="ml-2 text-indigo-500 hover:text-indigo-600 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                >
                  Try again
                </button>
              </p>
            </form>
          </>
        )}

        {/* Reset Password Step */}
        {currentStep === ForgotPasswordStep.RESET_PASSWORD && (
          <>
            <div className="text-center mb-10">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Reset Password
              </h2>
              <p className="mt-2 text-sm text-gray-600 font-sans">
                Please enter your new password.
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)}>
              <div className="relative">
                <label htmlFor="password" className="text-sm font-bold text-gray-700 tracking-wide">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  className={`w-full bg-green-100 text-base py-2 border-b ${resetPasswordForm.formState.errors.password ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:border-indigo-500`}
                  placeholder="Enter new password"
                  {...resetPasswordForm.register('password')}
                />
                {resetPasswordForm.formState.errors.password && (
                  <p className="text-red-500 text-xs mt-1">{resetPasswordForm.formState.errors.password.message}</p>
                )}
              </div>

              <div className="relative">
                <label htmlFor="confirmPassword" className="text-sm font-bold text-gray-700 tracking-wide">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className={`w-full bg-green-100 text-base py-2 border-b ${resetPasswordForm.formState.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:border-indigo-500`}
                  placeholder="Confirm new password"
                  {...resetPasswordForm.register('confirmPassword')}
                />
                {resetPasswordForm.formState.errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{resetPasswordForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={resetPasswordForm.formState.isSubmitting}
                  className="w-full flex justify-center bg-indigo-500 text-gray-100 p-2 rounded-sm tracking-wide
                    font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg 
                    cursor-pointer transition ease-in duration-300"
                >
                  {resetPasswordForm.formState.isSubmitting ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;