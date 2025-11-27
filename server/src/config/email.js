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

// export const sendVerifEmail = async(email, username, token) => {

//     try {
//         // Validation
//         if (!email) {
//             return res.status(400).json({ error: "Email is required" });
//         }

//         // Configuration du transporteur
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASSWORD
//             }
//         });

//         // Configuration de Mailgen
//         const mailGenerator = new Mailgen({
//             theme: "default",
//             product: {
//                 name: "Matcha",
//                 link: process.env.CLIENT_URL || 'https://localhost:3000'
//             }
//         });
        
//         const verifLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`

//         // Contenu de l'email
//         const emailContent = {
//             body: {
//                 name: username,
//                 intro: "Welcome to Matcha! 🍵",
//                 action: {
//                     instructions: 'Please click the button below to verify your email:',
//                     button: {
//                         color: '#22BC66',
//                         text: 'Verify your account',
//                         link: verificationLink
//                     }
//                 },
//                 outro: "If you didn't sign up, please ignore this email."
//             }
//         };

//         // Génération de l'email HTML
//         const emailBody = mailGenerator.generate(emailContent);

//         // Message à envoyer
//         const message = {
//             from: process.env.EMAIL_USER,
//             to: userEmail,
//             subject: "Welcome to Matcha 🍵",
//             html: emailBody
//         };

//         // Envoi de l'email
//         await transporter.sendMail(message);
//         console.log('✅ Verification email sent to:', email);

//         return { success: true };
//     }catch(err) {
//         console.error('❌ Error sending email:', err);
//         throw err;
//     }
// }