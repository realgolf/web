import mongoose from 'mongoose';
import { connect_to_db } from './connect';

const url_regexp =
	/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const schema = new mongoose.Schema(
	{
		shortcut: {
			type: String,
			required: [true, 'Shortcut is required'],
			unique: true
		},
		url: {
			type: String,
			required: [true, 'URL is required'],
			validate: {
				validator: (url: string) => url.match(url_regexp),
				message: () => 'You have to provide a valid URL'
			}
		},
		visits: {
			type: Number,
			required: [true, 'Number of visits is required'],
			min: 0
		}
	},
	{
		timestamps: true
	}
);

const redirection_model = await connect_to_db();
export const Redirection = redirection_model?.model('redirection', schema);
