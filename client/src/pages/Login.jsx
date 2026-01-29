import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import {getRandomBack } from '../utils/randomBackground'
import {login, checkProfile} from '../services/api.js'

function Login() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [randomBackground] = useState(getRandomBack)
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('')
    const [loginSucess, setLoginSuccess] = useState(false)

    useEffect(() => {
        // Animation d'entrée
        setTimeout(() => setIsVisible(true), 50);
    }, []);

    const handleClose = () => {
        if(!loginSucess){
            setIsVisible(false);
            setTimeout(() => navigate('/'), 300); // Attend la fin de l'animation
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try{
            const userData = {
                email: email, 
                password: password, 
            };
            const response = await login(userData)

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user))
            setLoginSuccess(true);

            const profileCheck = await checkProfile();
            
            // 4. Redirige selon le résultat
            if (profileCheck.profileCompleted) {

                setSuccessMsg('Login successful!');
                // Redirige après avoir cliqué sur OK
             } else {   
                setSuccessMsg('Please complete your profile');
                // Redirige vers /new après avoir cliqué sur OK
            }
            
        }catch (err){
            setError(err.message)
        }
    };

    return (
        <>
            {/* Background (même que Welcome mais en phase 3) */}
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

            {/* Titre MATCHA en haut */}
            <h1 
                className='title-welcome title-auth' 
                style={{
                    bottom: '89vh',
                    fontSize: '18vh',
                    opacity: isVisible ? 1 : 0,
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    color: '#715F32'
                }}>
                MATCHA
            </h1>

            {/* Overlay avec formulaire */}
            <div 
                className={`auth-overlay ${isVisible ? 'visible' : ''}`}
                onClick={handleClose}
            >
                <div 
                    className="auth-container"
                    onClick={(e) => e.stopPropagation()} // Empêche la fermeture au clic sur le formulaire
                >
                    {/* Bouton fermer */}
                    <button className="close-btn" onClick={handleClose}>
                        ✕
                    </button>

                    <h2 className="auth-title">Login</h2>

                    <form onSubmit={handleSubmit} className="auth-form">
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

                        <button type="submit" className="auth-button">
                            Sign in
                        </button>
                    </form>

                    <p className="auth-footer">
                        Don't have an account?{' '}
                        <span 
                            className="auth-link"
                            onClick={() => navigate('/register')}
                        >
                            Sign up
                        </span>
                    </p>

                    <p className="auth-credits">
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
                    {/* {successMsg && (
                        <div className="success-overlay-inner">
                            <div className="success-popup">
                                <p>{successMsg}</p>
                                <button onClick={async() => {

                                    setSuccessMsg('');

                                    try {
                                        const profileCheck = await checkProfile();

                                        if(profileCheck.profileCompleted){
                                            navigate('/profile');
                                        }else (
                                            navigate('/new')
                                        )
                                    }catch(err){
                                        navigate('/new')
                                    }
                                }}>
                                    OK
                                </button>
                            </div>
                        </div>
                    )} */}
                    {successMsg && (
                        <div className="success-overlay-inner">
                            <div className="success-popup">
                                <p>{successMsg}</p>
                                <button onClick={async () => {
                                    console.log('🔘 OK button clicked');
                                    setSuccessMsg('');
                                    
                                    try {
                                        console.log('📞 Calling checkProfile...');
                                        const profileCheck = await checkProfile();
                                        console.log('✅ checkProfile result:', profileCheck);
                                        
                                        if (profileCheck.profileCompleted) {
                                            console.log('→ Navigating to /profile');
                                            navigate('/profile');
                                        } else {
                                            console.log('→ Navigating to /new');
                                            navigate('/new');
                                        }
                                    } catch (err) {
                                        console.error('❌ Error in checkProfile:', err);
                                        console.log('→ Fallback: navigating to /new');
                                        navigate('/new');
                                    }
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

export default Login;