import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { completeProfile } from '../services/api';
import { getRandomBackground } from '../utils/randomBackground';
import '../styles/NewProfile.css';

function NewProfile() {
    const navigate = useNavigate();
    const [randomBackground] = useState(getRandomBackground)

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
                biography,
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
                    opacity: isVisible ? 1 : 0,
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                MATCHA
            </h1>

            {/* formulaire */}
            <div className="new-profile-container">
                <div className='new-profile-card'>
                    <h2 className='new-profile-title'>Complete Your Profile</h2>
                    <p className='new-profile-subtitle'>Tell us about yourself</p>

                    {/* gender */}
                    <form onSubmit={handleSubmit} className='new-profile-form'>
                        <div className='form-group'>
                            <label>Gender *</label>
                            <select value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                            >
                                <option value="">Select Your gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="non-binary">Non-binary</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/*orientation */}
                        {/* <div className='form-group'>
                            <label>What's your orientation ?</label>
                            <select value={sexualPreference}
                                    onChange={(e) => setSexualPreference(e.target.value)}
                                    required
                            >
                                <option value="">Select your prefence</option>
                                <option value="hetero">Hetero</option>
                                <option value="gay">Gay</option>
                                <option value="lesbienne">Lesbienne</option>
                                <option value="asexuel-le">Asexuel-le</option>
                            </select>
                        </div> */}

                        {/* pref sexu */}
                        <div className='form-group'>
                            <label>What's your prefence ?</label>
                            <select value={sexualPreference}
                                    onChange={(e) => setSexualPreference(e.target.value)}
                                    required
                            >
                                <option value="">Select your prefence</option>
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="both">both</option>
                            </select>
                        </div>

                        {/* birth date */}
                        <div className='form-group'>
                            <label>What's your birth date ?</label>
                            <input
                                type='date'
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                max={new Date().toISOString().split('T')[0]} //empecher les dates futures
                                required
                            />
                        </div>

                        {/* ville */}
                        <div className='form-group'>
                            <label>What's your city ?</label>
                            <input
                                type='text'
                                placeholder='e.g. Paris, London, Tokyo'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        {/* bio */}
                        <div className='form-group'>
                            <label>About me</label>
                            <textarea
                                placeholder='Tell us about yourself, your hobbies, what you are looking for...'
                                value={bio}
                                onChange={(e) => setCity(e.target.value)}
                                rows="4"
                                maxLength="500"
                            />
                            <span className='char-count'>{bio.length}/500</span>
                        </div>

                        {/* error */}
                        {error && (
                            <div className='error-message'>
                                {error}
                            </div>
                        )}

                        {/* bouton*/}

                    </form>
                </div>
            </div>
        </>
    );
}