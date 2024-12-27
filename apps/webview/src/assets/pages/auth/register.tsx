import React, { useState } from "react";
import '../../css/auth/register.css';
import { useNavigate } from "react-router-dom";
import emailIcon from '/public/images/register/email.png';

// Define types for our form data
interface UserFormData {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  branch: string;
  year: string;
  password: string;
  confirmPassword: string;
}

const RegisterApp: React.FC = () => {
  const navigate = useNavigate();
  
  // Track the current step of registration
  const [step, setStep] = useState<number>(1);
  
  // State for form data
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    branch: '',
    year: '',
    password: '',
    confirmPassword: ''
  });

  // State for OTP
  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle email submission and OTP sending
  const handleSendOTP = () => {
    // Add your OTP sending logic here
    setStep(2);
  };

  // Render different steps
  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="register-step">
            <h2>Register with your</h2>
            <h1>Email Address</h1>
            <p>to continue</p>
            <div className="input-group">
              <img src={emailIcon} alt="Email" className="icon" />
              <input
                type="email"
                name="email"
                placeholder="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <button onClick={handleSendOTP}>SEND OTP</button>
            <div className="login-link">
              Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="register-step">
            <h2>Your entered email address is</h2>
            <p className="email-display">{formData.email}</p>
            <p>Enter the OTP sent to your email address</p>
            {/* Add OTP input fields here */}
            <button onClick={() => setStep(3)}>VERIFY</button>
          </div>
        );

      case 3:
        return (
          <div className="register-step">
            <h1>CREATE ACCOUNT</h1>
            <div className="input-group">
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {/* Add other input fields */}
            </div>
            <button onClick={() => setStep(4)}>NEXT</button>
          </div>
        );

      case 4:
        return (
          <div className="register-step">
            <h1>ENTER PASSWORD</h1>
            <p>The password must consists a letter, digit and a special character.</p>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <button onClick={() => navigate('/dashboard')}>Submit</button>
          </div>
        );
    }
  };

  return (
    <div className="register-container">
      <button className="back-button" onClick={() =>  navigate('/onboarding-last')}>
        ←
      </button>
      
      {renderStep()}
      
      <img 
        className="vector1" 
        src="/public/images/onboard_last/Vector1.png" 
        alt="Decorative vector"
      />
      <img 
        className="vector2" 
        src="/public/images/onboard_last/Vector2.png" 
        alt="Decorative vector"
      />
    </div>
  );
};

export default RegisterApp;
