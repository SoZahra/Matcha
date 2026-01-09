import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get('token');
            
            if (!token) {
                setStatus('error');
                setMessage('Invalid verification link');
                return;
            }

            try {
                // ✅ Appelle l'API via fetch, pas d'import direct
                const response = await fetch(`http://localhost:3001/api/verify-email?token=${token}`);
                const data = await response.json();

                if (response.ok) {
                    setStatus('success');
                    setMessage('Email verified successfully! Redirecting to login...');
                    
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                } else {
                    setStatus('error');
                    setMessage(data.error || 'Verification failed');
                }
            } catch (error) {
                setStatus('error');
                setMessage('Network error. Please try again.');
            }
        };

        verifyEmail();
    }, [searchParams, navigate]);

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            flexDirection: 'column',
            background: '#1d1812',
            color: '#E02B2E'
        }}>
            {status === 'loading' && (
                <>
                    <h1>Verifying your email...</h1>
                    <p>Please wait</p>
                </>
            )}
            
            {status === 'success' && (
                <>
                    <h1>✅ {message}</h1>
                    <p>You can now log in to your account</p>
                </>
            )}
            
            {status === 'error' && (
                <>
                    <h1>❌ {message}</h1>
                    <button 
                        onClick={() => navigate('/register')}
                        style={{
                            background: '#E02B2E',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '20px'
                        }}
                    >
                        Back to Register
                    </button>
                </>
            )}
        </div>
    );
}

export default VerifyEmail;