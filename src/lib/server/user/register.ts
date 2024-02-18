import bcrypt from 'bcrypt';
import type { MongooseError } from 'mongoose';
import { User_Model } from './models';
import { verify_email } from './verify/verify_email';
import { verify_handicap } from './verify/verify_handicap';
import { verify_name } from './verify/verify_name';
import { verify_password } from './verify/verify_password';
import { verify_username } from './verify/verify_username';

export async function register_user(
	email: string,
	password: string,
	verified_password: string,
	name: string,
	username: string,
	handicap: number,
	handicap_updated: Date,
	registration_date: Date
): Promise<{ error: string }> {
	const email_error = await verify_email(email);

	if (email_error) {
		return { error: email_error };
	}

	const password_error = verify_password(password, verified_password);

	if (password_error) {
		return { error: password_error };
	}

	const name_error = verify_name(name);

	if (name_error) {
		return { error: name_error };
	}

	const username_error = await verify_username(username);

	if (username_error) {
		return { error: username_error };
	}

	const handicap_error = verify_handicap(handicap);

	if (handicap_error) {
		return {
			error: handicap_error
		};
	}

	const saltRounds = 10;
	const hashed_password = await bcrypt.hash(password, saltRounds);

	let id = Math.random().toString(36).slice(2);

	if (User_Model) {
		const user = new User_Model({
			id: id,
			user: {
				email,
				password: hashed_password,
				name,
				username,
				handicap,
				handicap_updated,
				registration_date
			}
		});

		let continueLoop = true;

		while (continueLoop) {
			try {
				await user.save();
				continueLoop = false;
			} catch (err) {
				const error = err as MongooseError;
				if (error.message.includes('E11000 duplicate key error collection')) {
					// If a duplicate key error occurred, generate a new ID and try again
					id = Math.random().toString(36).slice(2);
					user.id = `user-friendly-${id}`;
				} else {
					return { error: err as string };
				}
			}
		}
	}

	return { error: '' };
}
