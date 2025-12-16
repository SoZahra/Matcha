import React, { useEffect, useState, useCallback, useRef } from 'react';
import '../styles/Welcome.css'


// function WelcomePage(){
//     const [scrollProgress, setScrollProgress] = useState(0);

//     useEffect(() => {
//         const handlerScroll = () => {
//         //calcul du scroll en %
//         const windowHeight = window.innerHeight;
//         const documentHeight = document.documentElement.scrollHeight;
//         const scrollTop = window.scrollY;
        
//         // Progress de 0 à 1
//         const progress = scrollTop / (documentHeight - windowHeight);
//         setScrollProgress(progress);
//         };

//         window.addEventListener('scroll', handlerScroll);
//         return () => {
//             window.removeEventListener('scroll', handlerScroll);
//         };
//     }, []);

//     const easeOutCubic = (x) => {
//         return 1 - (1 - x) * (1 - x);
//     };

//     const getTitlePosition = () => {
//     // Phase 1 : Scroll 0% → 50% : Monte de bas en haut
//         if (scrollProgress <= 0.5) {
//             const normalizedProgress = scrollProgress / 0.5;
//             const easedProgress = easeOutCubic(normalizedProgress);
//             const start = -10;
//             const end = 88;
//             return start + (end - start) * easedProgress;
//         } 
//         // Phase 2 : Scroll 50% → 75% : Redescend vers le milieu
//         else if (scrollProgress <= 0.70) {
//             const normalizedProgress = (scrollProgress - 0.5) / 0.25;  // 0.5→0.75 devient 0→1
//             const easedProgress = easeOutCubic(normalizedProgress);
//             const start = 88;   // Position en haut
//             const end = 50;     // Redescend au milieu (ajuste cette valeur)
//             return start + (end - start) * easedProgress;
//         }
//         // Phase 3 : Après 75% : Reste au milieu
//         else {
//             return 50;  // Bloqué au milieu
//         }
//     };

//     const getBackgoundBlur = () => {
//         if (scrollProgress <= 0.5) {
//             return 0
//         }
//         else if (scrollProgress <= 0.70) {
//             const normalizedProgress = (scrollProgress - 0.5) / 0.20;
//             const easedProgress = easeOutCubic(normalizedProgress);
//             const start = 0;  // ← En haut au départ
//             const end = 5;    // ← En bas à la fin
//             return start + (end - start) * easedProgress; 
//         } else {
//             return 5;
//         }
//     };


//     const getLittlePosition = () => {
//         if (scrollProgress <= 0.5) {
//             const normalizedProgress = scrollProgress / 0.5;
//             const easedProgress = easeOutCubic(normalizedProgress);
//             const start = 15;  // ← En haut au départ
//             const end = 67;    // ← En bas à la fin
//             return start + (end - start) * easedProgress;  // (85 - 75) = -75, descend
//         } else {
//             return 67;
//         }
//     };

//     const getBackgroundZoom = () => {
//         if (scrollProgress <= 0.5) {
//             const normalizedProgress = scrollProgress / 0.5;
//             const easedProgress = easeOutCubic(normalizedProgress);
//             const start = 1;      // Taille normale (100%)
//             const end = 2;      // Zoom à 130% (ajuste selon ton goût)
//             return start + (end - start) * easedProgress;
//         } else {
//             return 2;  // Reste zoomé
//         }
//     };

//     const getSmallTextsOpacity = () => {
//         if (scrollProgress < 0.5) {
//             return 1
//         }

//         else if (scrollProgress <= 0.7) {
//             const normalizedProgress = (scrollProgress - 0.5) / 0.2;
//             const easedProgress = easeOutCubic(normalizedProgress);
//             return 1 - easedProgress; // de 1 à 0 il disparait
//         } else {
//             return 0; // visible
//         }
//     };

//     const getTitleSize = () => {
//     // Phase 1 : 0% → 50% : Diminue
//         if (scrollProgress <= 0.5) {
//             const normalizedProgress = scrollProgress / 0.5;
//             const easedProgress = easeOutCubic(normalizedProgress);
//             const start = 25;
//             const end = 8;
//             return start + (end - start) * easedProgress;
//         }
//         // Phase 2 : 50% → 75% : Grossit un peu
//         else if (scrollProgress <= 0.75) {
//             const normalizedProgress = (scrollProgress - 0.5) / 0.25;
//             const easedProgress = easeOutCubic(normalizedProgress);
//             const start = 8;
//             const end = 12;  // Grossit légèrement
//             return start + (end - start) * easedProgress;
//         }
//         // Phase 3 : Reste fixe
//         else {
//             return 12;
//         }
//     };

//     const getTalkPosition = () => {
//         if (scrollProgress <= 0.5) {
//             const normalizedProgress = scrollProgress / 0.5;
//             const easedProgress = easeOutCubic(normalizedProgress);
//             const start = 70;  // ← En haut au départ
//             const end = 90;    // ← En bas à la fin
//             return start + (end - start) * easedProgress;  // (85 - 75) = -75, descend
//         } else {
//             return 90;
//         }
//     };

//     const getLoginOpacity = () => {
//     if (scrollProgress < 0.7) {
//         return 0;  // Invisibles
//     } 
//     else if (scrollProgress <= 0.85) {
//         // Fade progressif entre 70% et 85%
//         const normalizedProgress = (scrollProgress - 0.7) / 0.15;  // 0.7→0.85 devient 0→1
//         const easedProgress = easeOutCubic(normalizedProgress);
//         return easedProgress;  // De 0 à 1 (apparaît)
//     } 
//     else {
//         return 1;  // Complètement visibles
//     }
// };

    
//     return (
//         <>
//         <div className='background' 
//             style={{
//                     backgroundImage: `url(${process.env.PUBLIC_URL}/img/back.png)`,
//                     transform: `scale(${getBackgroundZoom()})`,
//                     filter: `blur(${getBackgoundBlur()}px)`
//                 }}>
//         </div>

//         <div className='grain-overlay'
//             style={{
//                     backgroundImage: `url(${process.env.PUBLIC_URL}/img/grain.jpg)`,
//                 }}>
//         </div>

//             <div className="welcome-container">
//                 { scrollProgress < 0.7 && ( /* text visible jusqu'a 70% du scroll */
//                 <>
//                     <h4 className='text smalltext' 
//                         style={{ 
//                             top: `${getLittlePosition()}vh`,
//                             opacity: getSmallTextsOpacity()
//                         }}>
//                         She <br/>
//                         like’s <br/>
//                         Matcha 
//                     </h4>

//                     <h4 className='text thefirst'
//                         style={{ 
//                             top: `${getLittlePosition()}vh`,
//                             opacity: getSmallTextsOpacity()
//                         }}>
//                         The first dating site<br/>
//                         where common ground <br/>
//                         is culture.
//                     </h4>
                    
//                     <h4 className='text letstalk'
//                         style={{ 
//                             top: `${getTalkPosition()}vh`,
//                             opacity: getSmallTextsOpacity()
//                         }}
//                     >
//                         Let’s Talk about<br/>
//                         books, movies <br/>
//                         around a cup of tea 
//                     </h4>
//                 </>
//                 )}

//                  { scrollProgress >= 0.7 && ( /* text visible jusqu'a 70% du scroll */
//                 <>
//                     <h4 className='login log'
//                         style={{
//                             opacity: getLoginOpacity()
//                         }}>
//                         Login
//                     </h4>
//                     <h4 className='register log'
//                         style={{
//                             opacity: getLoginOpacity()
//                         }}>
//                         Register
//                     </h4>
//                         </>
//                  )}

//                 <h1 
//                     className='title-welcome' 
//                     style={{
//                         bottom: `${getTitlePosition()}vh`,
//                         fontSize: `${getTitleSize()}vh`,  /* Diminue de 18rem à 3rem */ 
//                     }}>
//                     MATCHA
//                 </h1>
//             </div>
//         </>
//     );
// }


function WelcomePage(){
    const [scrollProgress, setScrollProgress] = useState(0);
    const [currentSection, setCurrentSection] = useState(0);

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
            
            console.log('Scroll progress:', progress.toFixed(2), 'Section:', currentSection);
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
            const end = 50;
            return start + (end - start) * easedProgress;
        }
        else {
            return 50;
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
                    backgroundImage: `url(${process.env.PUBLIC_URL}/img/back.png)`,
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
                        style={{
                            opacity: getLoginOpacity()
                        }}>
                        Login
                    </h4>
                    <h4 className='register log'
                        style={{
                            opacity: getLoginOpacity()
                        }}>
                        Register
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