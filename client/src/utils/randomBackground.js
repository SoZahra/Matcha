

const backgroundImages = [
    '/img/tableaudeux.jpeg',
    '/img/tableau.jpeg',
    '/img/tableautrois.jpeg',
    '/img/back.png',
];

export const getRandomBack = () =>{
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[randomIndex]
};


const backgroundImagesNewProfile = [
    '/coffee/330px-Automat-edward-hopper-1927.jpg',
    '/coffee/Mary_Cassatt_-_The_Tea_-_MFA_Boston_42.178.jpg'
];

export const getRandomBackNewProfile = () =>{
    const randomIndex = Math.floor(Math.random() * backgroundImagesNewProfile.length);
    return backgroundImagesNewProfile[randomIndex]
};
