import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
    try {
        // 1. Récupérer le token du header Authorization
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1] // Format: "Bearer TOKEN"
        if(!token){
            return res.status(401).json({ error: "Access denied. No token provided."})
        }
        // 3. Vérifier et décoder le token
        // 4. Attacher les infos du user à req.user
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded

        // 5. Passer au prochain middleware/handler
        next()

    } catch (error){
        return res.status(403).json({ error: "Invalid or expired token"})
    }
}