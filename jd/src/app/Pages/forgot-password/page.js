"use client";
import React, { useState } from 'react';
import '../../Pages/login/login.css';
import logo from '../../Images/logo.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';  // Change this to 'next/navigation'

import axios from 'axios';

const Page = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });

    const router = useRouter();  // This should work if imported correctly from 'next/navigation'

    const togglePasswordVisibility = (field) => {
        setShowPassword(prevState => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    // ----- 🔹 Send OTP -----
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        console.log('Submitting email:', email);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/send-otp', { email });
            console.log('Send OTP response:', res.data);
            if (res.data.success) {
                setStep(2);
                // Redirect to the verify OTP page after sending OTP
                router.push('/verify-otp');
            } else {
                setMessage(res.data.message || 'Failed to send OTP');
            }
        } catch (err) {
            console.error('Send OTP error:', err);
            setMessage(err.response?.data?.message || 'Something went wrong');
        }
    };

    // ----- 🔹 Verify OTP -----
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        console.log('Verifying OTP:', { email, otp });
        try {
            const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
            console.log('Verify OTP response:', res.data);
            if (res.data.success) {
                setStep(3);
                 // Redirect to the reset password page after verifying OTP
                 router.push('/reset-password');
            } else {
                setMessage(res.data.message || 'Invalid OTP');
            }
        } catch (err) {
            console.error('Verify OTP error:', err);
            setMessage(err.response?.data?.message || 'Something went wrong');
        }
    };

    // ----- 🔹 Reset Password -----
    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setMessage('');
        if (newPassword !== confirmPassword) {
            return setMessage("Passwords do not match");
        }
        console.log('Resetting password for:', email);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/reset-password', {
                email,
                newPassword
            });
            console.log('Reset password response:', res.data);
            if (res.data.success) {
                setStep(4);
                // Optionally redirect to login page after successful reset
                router.push('/login');
            } else {
                setMessage(res.data.message || 'Failed to reset password');
            }
        } catch (err) {
            console.error('Reset password error:', err);
            setMessage(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="container py-3">
            <div className="row align-items-center">
                <div className="col-md-6 p-0">
                    <div className='login-welcome-content'>
                        <div className='login-welcome-image'>
                            <Image src={logo} alt="King Logo" />
                        </div>
                        <div className='login-welcome-text'>
                            <h1>Welcome to Bizi<span style={{ color: 'var(--blue)' }}>ff</span>y</h1>
                            <p>Biziffy is a platform that allows you to manage your tasks and projects in a simple way.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="auth-section">
                        <div className="auth-card">
                            <div className="text-center mb-3">
                                <h4>Reset Password</h4>
                                <p>{step === 1 ? 'Enter your email to get OTP' : step === 2 ? 'Enter the OTP sent to your email' : 'Reset your password'}</p>
                            </div>

                            {step === 1 && (
                                <form onSubmit={handleEmailSubmit}>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="login-input mb-3"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button className="login-btn w-100" type="submit">Send OTP</button>
                                </form>
                            )}

                            {step === 2 && (
                                <form onSubmit={handleOtpSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        className="login-input mb-3"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                    <button className="login-btn w-100" type="submit">Verify OTP</button>
                                </form>
                            )}

                            {step === 3 && (
                                <form onSubmit={handlePasswordReset}>
                                    <div className="password-input mb-3 position-relative">
                                        <input
                                            type={showPassword.password ? 'text' : 'password'}
                                            placeholder="New Password"
                                            value={newPassword}
                                            className="login-input w-100"
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <p
                                            className="show-password-btn position-absolute"
                                            style={{ top: '50%', right: '15px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                            onClick={() => togglePasswordVisibility('password')}
                                        >
                                            {showPassword.password ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                                        </p>
                                    </div>

                                    <div className="password-input mb-3 position-relative">
                                        <input
                                            type={showPassword.confirmPassword ? 'text' : 'password'}
                                            placeholder="Confirm New Password"
                                            className="login-input w-100"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <p
                                            className="show-password-btn position-absolute"
                                            style={{ top: '50%', right: '15px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                            onClick={() => togglePasswordVisibility('confirmPassword')}
                                        >
                                            {showPassword.confirmPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                                        </p>
                                    </div>

                                    <button className="login-btn w-100" type="submit">Reset Password</button>
                                </form>
                            )}

                            {message && <p className="text-center text-danger">{message}</p>}

                            {step === 4 && <p className="text-center">Password has been reset. <Link href="../../Pages/login" className="text-primary">Login</Link></p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
