import * as User from "../models/user.model.js";
import { sendPasswordResetEmail, sendVerifEmail } from "../config/email.js";
import crypto from "crypto";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { create } from "domain";

export const register = async (req, res) => {
  try {
    const { email, username, password, firstName, lastName } = req.body;

    if (!email || !username || !password || !firstName || !lastName) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!validEmail.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
      return res.status(400).json({
        error:
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
      });
    }

    const validName = /^[a-zA-Z\s'-]+$/;
    if (!validName.test(firstName) || !validName.test(lastName)) {
      return res.status(400).json({ error: "Invalid name format" });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = await User.createUser(
      email,
      username,
      passwordHash,
      firstName,
      lastName
    );

    await User.updateVerificationToken(newUser.id, verificationToken);
    await sendVerifEmail(email, username, verificationToken);

    return res.status(201).json({
      message:
        "Registration successful! Check your email to verify your account.",
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      error: "Registration failed",
      details: error.message,
    });
  }
};


export const verifyEmail = async (req, res) => {

    try {
      // 1. Récupérer le token depuis les query params
      const { token } = req.query

      // 2. Valider que le token existe
      if(!token){
        return res.status(400).json({ error: "token is required" });
      }
      
      // 3. Chercher et vérifier le user avec User.verifyUser(token)
      // 4. Vérifier que le user existe (token invalide ?)
      const verif = await User.verifyUser(token)
      if(!verif){
        return res.status(400).json({ error: "Invalid or expired token" });
      }
      
      // 5. Retourner une réponse de succès
      return res.status(200).json ({
        message : 
          "Email verified successfully!",
        user : {
          id : verif.id,
          email: verif.email,
          username: verif.username,
          is_verified: verif.is_verified
        }
      });

    }catch(err){
        console.error("Email is not correct", err)
        return res.status(500).json({
            err: "Verify Email failed",
            details: err.message
        });
    }
}

export const login = async (req, res) => {
  try {
	// 1. Récupérer email + password du body
	// 2. Valider que les champs sont fournis
	const {email, password} = req.body
	if(!email || !password){
		return res.status(400).json({ error: "All fields are required" });
	}

	// 3. Chercher le user par email (User.findByEmail)
	// 4. Vérifier que le user existe
	const user = await User.findByEmail(email)
	if(!user){
		return res.status(400).json({error: "Invalid email"})
	}

	// 5. Vérifier que le compte est vérifié (is_verified = true)
	if(!user.is_verified){
		return res.status(400).json({ error: "Please verify your email first" });
	}

	// 6. Comparer le password avec le hash (bcrypt.compare)
	const isMatch = await bcrypt.compare(password, user.password_hash)
	if(!isMatch){
		return res.status(400).json({ error: "Invalid email or password" });
	}
	// 7. Générer un JWT token
	const token = jwt.sign(
		{userId: user.id, email: user.email},
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_EXPIRE}
	)
	// 8. Retourner le token + infos du user
	return res.status(200).json ({
        message : 
          "Login successfully!",
		token : token,
        user : {
          id : user.id,
          email: user.email,
          username: user.username,
        }
      });

  }catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      error: "Login failed",
      details: error.message,
    });
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const {email} = req.body
    if(!email){
      return res.status(400).json({error: "email is required"})
    }

    const user = await User.findByEmail(email)
    if(!user){
      return res.status(400).json({error: "If this email exists, a password reset link has been sent."})
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expired = new Date(Date.now() + 3600000)

    await User.updateResetPasswordToken(
      email,
      resetToken,
      expired
    );
    await sendPasswordResetEmail(email, user.username, resetToken )

    return res.status(200).json({
      message:
        "Password reset email sent! Check your inbox.",
    });

  }catch (err){
    console.error("Forgot password error:", err);
    return res.status(500).json({
      err: "Password reset failed",
      details: err.message,
    });
  }
};

export const resetPassword = async (req, res) => {

	try {
		const {token, password} = req.body
		if(!token || !password){
      		return res.status(400).json({error: "Token and new password are required"})
    	}

		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		if (!regex.test(password)) {
			return res.status(400).json({
				error:
				"Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
			});
		}

		const user = await User.findByResetToken(token)
		if(!user){
			return res.status(400).json({ error : "Invalid or expired reset token"})
		}

		const passhash = await bcrypt.hash(password, 10)
		await User.updatePassword(user.id, passhash)

		return res.status(200).json ({
			message : 
				"Password reset successful! You can now login with your new password.",
     	});

	}catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({
      error: "Reset password failed",
      details: error.message,
    });
  }
}


export const getProfile = async (req, res) => {
	try{

		const { userId } = req.user
		const user = await User.findById(userId)
		if (!user){
			return res.status(400).json({ error: "User not find " });
		}

		return res.status(200).json({
			message : "Profile find !",
		user: {
			id : user.id,
			email: user.email,
			username: user.username,
			firstName: user.first_name,
			lastName: user.last_name,
			is_verified: user.is_verified,
			createAt: user.create_at
		}
		});

	}catch (error) {
    console.error("Profile error:", error);
    return res.status(500).json({
      error: "Get profile failed",
      details: error.message,
    });
	}
}