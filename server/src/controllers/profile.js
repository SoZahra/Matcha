import * as User from '../models/user.model.js';
import * as Profile from '../models/profile.model.js';

export const checkProfileCompleted = async (req, res) => {
    try {
        const { userId } = req.user;
        const user = await User.findById(userId);

        if (!user) { // ✅ Corrigé : !user au lieu de user
            return res.status(404).json({ error: "user not found" });
        }

        res.json({
            profileCompleted: user.profile_completed || false
        });

    } catch (error) {
        res.status(500).json({
            error: "Check profile error",
            details: error.message,
        });
    }
};

export const completeProfile = async (req, res) => {
    try {
        const { userId } = req.user;
        const { 
            gender, 
            sexual_preference, 
            biography, 
            birth_date, 
            city 
        } = req.body;

        // Validation basique
        if (!gender || !birth_date) {
            return res.status(400).json({ 
                error: "Gender and birth date are required" 
            });
        }

        // TODO: Convertir city en latitude/longitude (géocodage)
        const latitude = 0;
        const longitude = 0;

        // Vérifie si un profil existe déjà
        const existingProfile = await Profile.findByUserId(userId);

        let profile;
        if (existingProfile) {
            // Met à jour
            profile = await Profile.updateProfile(userId, {
                gender,
                sexual_preference,
                biography,
                birth_date,
                latitude,
                longitude,
                location_manual: city
            });
        } else {
            // Crée
            profile = await Profile.createProfile(userId, {
                gender,
                sexual_preference,
                biography,
                birth_date,
                latitude,
                longitude,
                location_manual: city
            });
        }

        // Marque comme complété dans users
        await User.updateProfileCompleted(userId, true);

        res.json({
            message: "Profile completed successfully!",
            profileCompleted: true,
            profile: profile
        });

    } catch (error) {
        console.error("Complete profile error:", error);
        res.status(500).json({
            error: "Complete profile error",
            details: error.message,
        });
    }
};

// export const profile = async (req, res) => {
	
// }
