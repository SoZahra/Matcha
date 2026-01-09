import pool from '../config/db.js';

// Créer un profil
export const createProfile = async (userId, profileData) => {
    const { 
        gender, 
        sexual_preference, 
        biography, 
        birth_date, 
        latitude, 
        longitude, 
        location_manual 
    } = profileData;
    
    const res = await pool.query(
        `INSERT INTO profiles 
        (user_id, gender, sexual_preference, biography, birth_date, latitude, longitude, location_manual)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
        [userId, gender, sexual_preference, biography, birth_date, latitude, longitude, location_manual]
    );
    
    return res.rows[0];
};

// Trouver un profil par user_id
export const findByUserId = async (userId) => {
    const res = await pool.query(
        'SELECT * FROM profiles WHERE user_id = $1',
        [userId]
    );
    
    return res.rows[0];
};

// Mettre à jour un profil
export const updateProfile = async (userId, profileData) => {
    const { 
        gender, 
        sexual_preference, 
        biography, 
        birth_date, 
        latitude, 
        longitude, 
        location_manual 
    } = profileData;
    
    const res = await pool.query(
        `UPDATE profiles 
        SET gender = $2, 
            sexual_preference = $3, 
            biography = $4, 
            birth_date = $5, 
            latitude = $6, 
            longitude = $7, 
            location_manual = $8,
            updated_at = NOW()
        WHERE user_id = $1 
        RETURNING *`,
        [userId, gender, sexual_preference, biography, birth_date, latitude, longitude, location_manual]
    );
    
    return res.rows[0];
};