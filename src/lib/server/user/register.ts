import { sites } from '$lib/shared/sites';
import bcrypt from 'bcrypt';
import type { MongooseError } from 'mongoose';
import { User_Model } from './models';
import { email_regexp } from './utils';

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

export async function verify_email(email: string): Promise<string> {
	if (!email) {
		return 'Email is required.';
	}

	if (!email.match(email_regexp)) {
		return 'Please enter a valid email.';
	}

	const previous_user = await User_Model?.findOne({ 'user.email': email });

	if (previous_user) {
		return 'There is already an account with this email.';
	}

	return '';
}

export function verify_password(password: string, verified_password: string): string {
	if (!password) {
		return 'Pasword is required.';
	}

	if (password !== verified_password) {
		return 'The passwords must be identical.';
	}

	if (password.length < 8) {
		return 'Password must be at least 8 characters.';
	}

	return '';
}

export function verify_name(name: string): string {
	if (!name) {
		return 'Name is required.';
	}

	if (name.length <= 1) {
		return 'Name has to be at least 2 characters.';
	}

	return '';
}

export function verify_handicap(handicap: number): string {
	const advice = " If you don't have a handicap, please enter 54.";

	if (!handicap) {
		return 'Handicap is required.' + advice;
	}

	if (isNaN(handicap)) {
		return 'Invalid handicap value. Please enter a valid number.' + advice;
	}

	if (handicap > 54) {
		return 'Handicap must be smaller or equal to 54.' + advice;
	}

	if (handicap < -54) {
		return 'Handicap is too low.' + advice;
	}

	return '';
}

export async function verify_username(username: string): Promise<string> {
	if (!username) {
		return 'Username is required.';
	}

	if (username.length <= 1) {
		return 'Username has to be at least 2 characters.';
	}

	const previous_user = await User_Model?.findOne({
		'user.username': { $regex: new RegExp(username, 'i') }
	});

	if (previous_user) {
		return 'There is already a account with this username.';
	}

	const lowerCaseSites = sites.map((site) => site.toLowerCase());

	if (lowerCaseSites.includes(username.toLowerCase())) {
		return 'The username cannot be equal to one of our sites.';
	}

	return '';
}
