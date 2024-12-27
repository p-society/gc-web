'use client'
import React, { useState } from "react";
import './register.css';
import { useNavigate } from "react-router-dom";
import emailIcon from '/public/images/register/email.png';
import { OTPInput, SlotProps } from "input-otp";
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

  const handleOTPVerification = () => {
    window.alert('OTP verified');
  };
  // Slot component for OTP input-otp
  const Slot = (props: SlotProps) => {
    return (
      <div
        className={`otp-slot ${props.isActive ? 'active' : ''} ${props.char ? 'filled' : ''}`}
      >
        <div className="otp-char">
          {props.char ?? props.placeholderChar}
        </div>
        {props.isActive && (
          <div className="caret" />
        )}
      </div>
    );
  }

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
            <h2 className="text-white">Your entered email address is</h2>
            <p className="email-display text-[#92E3A9]">{formData.email}</p>
            <p className="text-white mt-4">Enter the OTP sent to your email address</p>
            <div className="otp-container my-8">
              <OTPInput
                className="otp-input"
                maxLength={6}
                type="text"
                pattern="\d*"
                inputMode="numeric"
                value={otp}
                onChange={(value) => {
                  if (/^\d*$/.test(value)) {
                    setOtp(value);
                  }
                }}
                onComplete={handleOTPVerification}
                containerClassName="otp-input-container"
                render={({ slots }) => (
                  <div className="otp-wrapper">
                    {slots.map((slot, idx) => (
                      <Slot key={idx} {...slot} />
                    ))}
                  </div>
                )}
              />
            </div>
              {otpError && <p className="text-red-500 text-sm mt-2">{otpError}</p>}
              <button
                className="w-full bg-[#92E3A9] text-black py-3 rounded-full mt-4 font-medium"
                onClick={() => {
                  if (otp.length === 6) {
                    setStep(3);
                  } else {
                    setOtpError('Please enter a valid 6-digit OTP');
                  }
                }}
              >
                VERIFY
              </button>
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
