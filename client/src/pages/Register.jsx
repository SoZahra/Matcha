import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import {register} from '../services/api.js'
import {getRandomBack } from '../utils/randomBackground'

function Register() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
    const [randomBackground] = useState(getRandomBack)
	const [error, setError] = useState('');
	const [successMsg, setSuccessMsg] = useState('')

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 50);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => navigate('/'), 300);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try{

            const userData = {
                email: email, 
                username: username, 
                password: password, 
                firstName: firstName, 
                lastName: lastName
            };
            const response = await register(userData)
            setSuccessMsg(response.message)

        }catch(err) {
            setError(err.message)
        }
    };

    return (
        <>
            <div className='background' 
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}${randomBackground})`,
                    transform: 'scale(2)',
                    filter: 'blur(5px)'
                }}>
            </div>

            <div className='grain-overlay'
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/img/grain.jpg)`,
                }}>
            </div>

            <h1 
                className='title-welcome title-auth' 
                style={{
                    bottom: '89vh',
                    fontSize: '18vh',
                    opacity: isVisible ? 1 : 0,
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                MATCHA
            </h1>

            <div 
                className={`auth-overlay ${isVisible ? 'visible' : ''}`}
                onClick={handleClose}
            >
                <div 
                    className="auth-container"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="close-btn" onClick={handleClose}>
                        ✕
                    </button>

                    <h2 className="auth-title"
                        style={{color: '#E02B2E'}}
                    >Register</h2>

                    <form onSubmit={handleSubmit} className="auth-form">
                        
                        <div className='auth-input-row'>
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="auth-input"
                                required
                            />

                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="auth-input"
                                required
                            />
                        </div>

						<input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="auth-input"
                            required
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="auth-input"
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="auth-input"
                            required
                        />

                        <button type="submit" 
                                className="auth-button"
                                style={{backgroundColor: '#E02B2E'}}
                                >
                            Sign up
                        </button>
                    </form>

                    <p className="auth-footer">
						Signing up for Mtacha means<br/>
                        you agree to the{' '}
                        <span 
                            className="auth-link"
                            onClick={() => navigate('/privacy')}
                        >
                            Privacy Policy<br/>
                        </span>
						and{' '}
						<span 
                            className="auth-link"
                            onClick={() => navigate('/privacy')}
                        >
                            Terms of Service.
                        </span>

                    </p>

                    <p className="auth-footer">
                        Already have an account?{' '}
                        <span 
                            className="auth-link"
                            onClick={() => navigate('/login')}
                        >
                            Sign in
                        </span>
                    </p>

                    <p className="auth-credits"
                        style={{color: '#E02B2E'}}    
                    >
                        This website is create by Fatima Zahra.<br/>
                        I hope you enjoy it, and you will find your soulmate.<br/>
                        And don't forget, drink a cup a Matcha.
                    </p>
                </div>
                 {error && (
                        <div className="error-popup">
                            {error}
                            <button onClick={() => setError('')}>✕</button>
                        </div>
                    )}
                    {successMsg && (
                        <div className="success-overlay-inner">
                            <div className="success-popup">
                                <p>{successMsg}</p>
                                <button onClick={() => {
                                    setSuccessMsg('');
                                    navigate('/login');
                                }}>
                                    OK
                                </button>
                            </div>
                        </div>
                    )}
            </div>
        </>
    );
}

export default Register;