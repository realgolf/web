import { SECRET_NOREPLY_EMAIL_PASSWORD } from '$env/static/private';
import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email: string, verification_code: string) {
	const transporter = nodemailer.createTransport({
		host: 'mail.privateemail.com',
		port: 465,
		secure: true,
		auth: {
			user: 'noreply@realgolf.games',
			pass: `${SECRET_NOREPLY_EMAIL_PASSWORD}`
		}
	});

	async function sendEmail() {
		try {
			// send mail with defined transport object
			const info = await transporter.sendMail({
				from: 'RealGolf.Games <noreply@realgolf.games>',
				to: email,
				subject: 'Verification Code for RealGolf.Games Account',
				html: `
						Your verification code is: ${verification_code} <br/>
	
						Please enter this code in the verification form to complete your registration. <br/>
						<a href="https://realgolf.games/register/verify">Click here to verify your account</a>
					`
			});

			console.log('Message sent: %s', info.messageId);
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		} catch (error) {
			console.error('Error sending email:', error);
		}
	}

	await sendEmail();
}
