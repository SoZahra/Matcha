

const API_URL = 'http://localhost:3001/api' // const pour eviter de repeter url a chaque fois 

//Elle va faire POST /api/register
export const register = async (userData) => {
    try {
        //fetch la data
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        // si la reponse est pas ok
        if(!response.ok){
            const error = await response.json()
            throw new Error(error.error || "Could not fetch ressource")
        }
        //parse le json que tu as recu du fetch 
        const res = await response.json()
        return res

    }catch (error){
        console.error(error)
        throw error
    }
}


//Elle va faire POST /api/login
export const login = async (userData) => {

    try {
        //fetch la data
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(userData)
        });
        // si la reponse est pas ok
        if(!response.ok){
            const error = await response.json()
            throw new Error(error.error || "Could not fetch ressource")
        }
        //parse le json que tu as recu du fetch 
        const res = await response.json()
        return res

    }catch (error){
        console.error(error)
        throw error
    }
}