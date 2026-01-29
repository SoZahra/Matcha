import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { completeProfile } from '../services/api';
import { getRandomBackNewProfile } from '../utils/randomBackground';
import '../styles/NewProfile.css';
import '../styles/Auth.css'

function NewProfile() {
    const navigate = useNavigate();
    const [randomBackground] = useState(getRandomBackNewProfile)

    //state pour le formulaire 
    const[gender, setGender] = useState('')
    const[sexualPreference, setSexualPreference] = useState('')
    const[birthDate, setBirthDate] = useState('')
    const[bio, setBio] = useState('')
    const[city, setCity] = useState('')


    //etats des msg
    const[error, setError] = useState('')
    const[isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if(!gender || !birthDate){
            setError('Gender and birth date are required');
            setIsLoading(false);
            return;
        }

        try {
            const profileData = {
                gender,
                sexual_preference: sexualPreference,
                birth_date: birthDate,
                bio,
                city
            };
            console.log('Sending profile data', profileData);
            const response = await completeProfile(profileData);
            console.log('profile completed', response);

            navigate('/profile');

        }catch(error){
            console.error('Error:', error)
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }; 

    return (
        <>
            <div className= 'background'
                style={{
                    background: `url(${process.env.PUBLIC_URL}${randomBackground})`,
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
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                MATCHA
            </h1>

            {/* formulaire */}
            <div className="auth-overlay visible">
                <div className='auth-container'>
                    <h2 className='auth-title' style={{ position: 'relative', top: 0, left:0}}>
                        Complete Your Profile</h2>

                    <p className='new-profile-subtitle' style={{ position: 'relative', top: -30, left:0}}>
                        Tell us about yourself</p>

                    {/* gender */}
                    <form onSubmit={handleSubmit} className='new-profile-form'>
                            <select 
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className='auth-input'
                                style={{color: '#e0e0e0ff'}}
                                required
                            >
                                <option value="">Gender *</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="non-binary">Non-binary</option>
                                <option value="other">Other</option>
                            </select>

                        {/* pref sexu */}
                            <select 
                                value={sexualPreference}
                                onChange={(e) => setSexualPreference(e.target.value)}
                                className='auth-input'
                                style={{color: '#e0e0e0ff'}}
                            >
                                <option value="">Preference*</option>
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="both">both</option>
                            </select>
                        

                        {/* birth date */}
                            <input
                                type='date'
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                max={new Date().toISOString().split('T')[0]} //empecher les dates futures
                                className='auth-input'
                                placeholder="Birth Date"
                                style={{color: '#e0e0e0ff'}}
                                required
                            />

                        {/* ville */}
                            <input
                                type='text'
                                placeholder= "City"
                                className='auth-input'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />

                        {/* error */}
                        {error && (
                            <div className="error-popup">
                                {error}
                                <button type="button" onClick={() => setError('')}>✕</button>
                            </div>
                        )}

                        {/* bouton*/}
                        <button
                            type='submit'
                            className='auth-button'
                            style={{backgroundColor: '#E02B2E'}}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Next'}
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
}

export default NewProfile;