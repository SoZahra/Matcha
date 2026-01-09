

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


