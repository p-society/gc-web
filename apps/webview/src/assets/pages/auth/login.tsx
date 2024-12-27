import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import '../../css/auth/login.css';
import '../../css/onboard/onboard.css';

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginResponse {
  user?: {
    _id: string;
    deleted: boolean;
    firstName: string;
    middleName: string;
    lastName: string;
    phone: string;
    email: string;
    gender: string;
    batch: number;
    branch: string;
  },
  access_token?: string;
  message?: string;
  statusCode?: number;
}

const LoginApp: React.FC = () => {
  const auth = useAuth();
  
  if (!auth) {
    throw new Error('Authentication context not available');
  }
  
  const { login } = auth;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await fetch(`http://localhost:3000/authentication`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Login failed');
      }

      if (responseData.access_token) {
        await login(JSON.stringify(responseData));
      }
    } catch (err) {
      setError('root', {
        message: err instanceof Error ? err.message : 'An error occurred'
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className="onboarding_last_content login_container">
      <div className="back_button">
        <button onClick={() => navigate(-1)}>←</button>
      </div>
      <div className="login_content">
        <h1>LOGIN</h1>
        <p>Enter your email address<br />to sign in</p>

        {errors.root && <div className="error-message">{errors.root.message}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="input-container">
            <span className="input-icon">@</span>
            <input
              type="email"
              placeholder="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
          </div>
          {errors.email && <span className="error-message">{errors.email.message}</span>}

          <div className="input-container">
            <span className="input-icon">🔑</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
            />
          <button
            className="password-toggle"
            type="button"
            onClick={togglePasswordVisibility}>
              {showPassword ? <Eye/> : <EyeOff />}
          </button>
          </div>
          {errors.password && <span className="error-message">{errors.password.message}</span>}

          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? <div className="loader"></div> : 'LOG IN'}
          </button>

          <a href="#" className="forgot-password">Forgot Password?</a>
        </form>

        <div className="signup-prompt">
          <p>Don't have an account?</p>
          <a href="#" className="signup-link">Sign up</a>
        </div>
      </div>

      <img className="onboard_vector1" src="/images/onboard_last/Vector1.png" alt="Vector 1"/>
      <img className="onboard_vector2" src="/images/onboard_last/Vector2.png" alt="Vector 2"/>
    </div>
  );
};

export default LoginApp;
