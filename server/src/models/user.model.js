
import pool from '../config/db.js';

//insert
export const createUser = async (email, username, password_hash, first_name, last_name) => {

    const res = await pool.query(

        'INSERT INTO users (email, username, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [email, username, password_hash, first_name, last_name]
    );
    return res.rows[0]
};

export const findById = async (id) => {
 // select requet avec where id

    const res = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    );
    return res.rows[0]
}


export const findByEmail = async (email) => {
 // select requet avec where email

    const res = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return res.rows[0]
}


export const updateVerificationToken  = async (userId, token) => {
    // update
    
    const res = await pool.query(
        'UPDATE users SET verification_token = $1 WHERE id = $2 RETURNING *',
        [token, userId]
    );
    return res.rows[0]
}

export const verifyUser = async (token) => {
    //update is_verified = true 

    const res = await pool.query(
        'UPDATE users SET is_verified = true, verification_token = NULL WHERE verification_token = $1 RETURNING *',
        [token]
    );
    return res.rows[0]
}

export const updateResetPasswordToken = async (email, token, expires) => {
    //update

    const res = await pool.query(
        'UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE email = $3 RETURNING *',
        [token, expires, email]
    );
    return res.rows[0];
}

export const updatePassword = async (userId, password_hash) => {
    //update pass

    const res = await pool.query(
        'UPDATE users SET password_hash = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE id = $2 RETURNING *',
        [userId, password_hash]
    );
    return res.rows[0]
}