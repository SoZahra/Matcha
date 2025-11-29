import nodemailer from 'nodemailer'
import Mailgen from 'mailgen';

export const sendVerifEmail = async (email, username, token) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Matcha",
                link: process.env.CLIENT_URL || 'http://localhost:3000'
            }
        });
        
        const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

        const emailContent = {
            body: {
                name: username,
                intro: "Welcome to Matcha! 🍵",
                action: {
                    instructions: 'Please click the button below to verify your email:',
                    button: {
                        color: '#22BC66',
                        text: 'Verify your account',
                        link: verificationLink
                    }
                },
                outro: "If you didn't sign up, please ignore this email."
            }
        };

        const emailBody = mailGenerator.generate(emailContent);

        const message = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify your Matcha account 🍵",
            html: emailBody
        };

        await transporter.sendMail(message);
        console.log('✅ Verification email sent to:', email);

        return { success: true };
    } catch (err) {
        console.error('❌ Error sending email:', err);
        throw err;
    }
};

export const sendPasswordResetEmail = async (email, username, token) => { 
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Matcha",
                link: process.env.CLIENT_URL || 'http://localhost:3000'
            }
        });
        
        const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

        const emailContent = {
            body: {
                name: username,
                intro: "Welcome back to Matcha! 🍵",
                action: {
                    instructions: 'Please click the button below to reset your password:',
                    button: {
                        color: '#22BC66',
                        text: 'Verify your account',
                        link: resetLink
                    }
                },
                outro: "If you didn't ask to reset your password, please ignore this email."
            }
        };

        const emailBody = mailGenerator.generate(emailContent);

        const message = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify your Matcha account 🍵",
            html: emailBody
        };

        await transporter.sendMail(message);
        console.log('✅ Reset password email sent to:', email);

        return { success: true };
    } catch (err) {
        console.error('❌ Error sending email:', err);
        throw err;
    }
};