import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Welcome.css'
import {getRandomBack } from '../utils/randomBackground'


function WelcomePage(){
    const navigate = useNavigate();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [currentSection, setCurrentSection] = useState(0);
    const [randomBackground] = useState(getRandomBack)

    useEffect(() => {
        const container = document.querySelector('.welcome-container-snap');
        
        const handleScroll = () => {
            if (!container) return;
            
            const scrollTop = container.scrollTop;
            const scrollHeight = container.scrollHeight;
            const clientHeight = container.clientHeight;
            
            // Progress de 0 à 1 basé sur le scroll du container
            const maxScroll = scrollHeight - clientHeight;
            const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
            
            setScrollProgress(progress);
            
            // Détermine la section selon le scroll
            if (progress < 0.35) {
                setCurrentSection(0);
            } else if (progress < 0.65) {
                setCurrentSection(1);
            } else {
                setCurrentSection(2);
            }
            
        };

        if (container) {
            container.addEventListener('scroll', handleScroll);
            handleScroll(); // Init
        }
        
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [currentSection]);

    const easeOutCubic = (x) => {
        return 1 - Math.pow(1 - x, 3);
    };

    const getTitlePosition = () => {
        if (scrollProgress <= 0.5) {
            const normalizedProgress = scrollProgress / 0.5;
            const easedProgress = easeOutCubic(normalizedProgress);
            const start = -10;
            const end = 88;
            return start + (end - start) * easedProgress;
        } 
        else if (scrollProgress <= 0.70) {
            const normalizedProgress = (scrollProgress - 0.5) / 0.20;
            const easedProgress = easeOutCubic(normalizedProgress);
            const start = 88;
            const end = 65;
            return start + (end - start) * easedProgress;
        }
        else {
            return 65;
        }
    };

    const getTitleSize = () => {
        if (scrollProgress <= 0.5) {
            const normalizedProgress = scrollProgress / 0.5;
            const easedProgress = easeOutCubic(normalizedProgress);
            const start = 25;
            const end = 8;
            return start + (end - start) * easedProgress;
        }
        else if (scrollProgress <= 0.75) {
            const normalizedProgress = (scrollProgress - 0.5) / 0.25;
            const easedProgress = easeOutCubic(normalizedProgress);
            const start = 8;
            const end = 12;
            return start + (end - start) * easedProgress;
        }
        else {
            return 12;
        }
    };

    const getBackgroundZoom = () => {
        if (scrollProgress <= 0.5) {
            const normalizedProgress = scrollProgress / 0.5;
            const easedProgress = easeOutCubic(normalizedProgress);
            const start = 1;
            const end = 2;
            return start + (end - start) * easedProgress;
        } else {
            return 2;
        }
    };

    const getBackgroundBlur = () => {
        if (scrollProgress <= 0.5) {
            return 0;
        }
        else if (scrollProgress <= 0.70) {
            const normalizedProgress = (scrollProgress - 0.5) / 0.20;
            const easedProgress = easeOutCubic(normalizedProgress);
            const start = 0;
            const end = 5;
            return start + (end - start) * easedProgress;
        } else {
            return 5;
        }
    };

    const getLittlePosition = () => {
        if (scrollProgress <= 0.5) {
            const normalizedProgress = scrollProgress / 0.5;
            const easedProgress = easeOutCubic(normalizedProgress);
            const start = 15;
            const end = 67;
            return start + (end - start) * easedProgress;
        } else {
            return 67;
        }
    };

    const getTalkPosition = () => {
        if (scrollProgress <= 0.5) {
            const normalizedProgress = scrollProgress / 0.5;
            const easedProgress = easeOutCubic(normalizedProgress);
            const start = 70;
            const end = 90;
            return start + (end - start) * easedProgress;
        } else {
            return 90;
        }
    };

    const getSmallTextsOpacity = () => {
        if (scrollProgress < 0.5) {
            return 1;
        }
        else if (scrollProgress <= 0.7) {
            const normalizedProgress = (scrollProgress - 0.5) / 0.2;
            const easedProgress = easeOutCubic(normalizedProgress);
            return 1 - easedProgress;
        } else {
            return 0;
        }
    };

    const getLoginOpacity = () => {
        if (scrollProgress < 0.7) {
            return 0;
        } 
        else if (scrollProgress <= 0.85) {
            const normalizedProgress = (scrollProgress - 0.7) / 0.15;
            const easedProgress = easeOutCubic(normalizedProgress);
            return easedProgress;
        } 
        else {
            return 1;
        }
    };

    return (
        <>
            <div className='background' 
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}${randomBackground})`,
                    transform: `scale(${getBackgroundZoom()})`,
                    filter: `blur(${getBackgroundBlur()}px)`
                }}>
            </div>

            <div className='grain-overlay'
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/img/grain.jpg)`,
                }}>
            </div>

            <div className="welcome-container-snap">
                {/* Section 1 */}
                <div className="snap-section">
                    <h4 className='text smalltext' 
                        style={{ 
                            top: `${getLittlePosition()}vh`,
                            opacity: getSmallTextsOpacity()
                        }}>
                        She <br/>
                        like's <br/>
                        Matcha 
                    </h4>

                    <h4 className='text thefirst'
                        style={{ 
                            top: `${getLittlePosition()}vh`,
                            opacity: getSmallTextsOpacity()
                        }}>
                        The first dating site<br/>
                        where common ground <br/>
                        is culture.
                    </h4>
                    
                    <h4 className='text letstalk'
                        style={{ 
                            top: `${getTalkPosition()}vh`,
                            opacity: getSmallTextsOpacity()
                        }}
                    >
                        Let's Talk about<br/>
                        books, movies <br/>
                        around a cup of tea 
                    </h4>
                </div>

                {/* Section 2 */}
                <div className="snap-section">
                </div>

                {/* Section 3 */}
                <div className="snap-section">
                    <h4 className='login log'
                        onClick={() => navigate('/login')}
                        style={{
                            opacity: getLoginOpacity(),
                            cursor: 'pointer'
                        }}>
                        Login
                    </h4>
                    <h4 className='register log'
                    onClick={() => navigate('/register')}
                        style={{
                            opacity: getLoginOpacity(),
                            cursor: 'pointer'
                        }}>
                        Register
                    </h4>

                    <h4 className='website'
                        style={{
                            opacity: getLoginOpacity(),
                        }}>
                        This website is create by Fatima Zahra.<br/>
                        I hope you enjoy it, and you will find your soulmate.<br/>
                        And don’t forget, drink a cup a Matcha. 
                    </h4>
                </div>

                {/* Titre principal (fixed) */}
                <h1 
                    className='title-welcome' 
                    style={{
                        bottom: `${getTitlePosition()}vh`,
                        fontSize: `${getTitleSize()}vh`
                    }}>
                    MATCHA
                </h1>

                {/* Indicateurs */}
                <div className="section-indicator">
                    <span className={currentSection === 0 ? 'active' : ''}></span>
                    <span className={currentSection === 1 ? 'active' : ''}></span>
                    <span className={currentSection === 2 ? 'active' : ''}></span>
                </div>
            </div>
        </>
    );
}

export default WelcomePage;