import mongoose from 'mongoose';
import { connect_to_db } from './db';

const Course_Schema = new mongoose.Schema({
	id: { type: String, require: true, unique: true },
	name: { type: String, require: true, unique: true },
	location: { type: String, require: true },
	par: { type: Number, require: true },
	tees: [
		{
			color: { type: String, require: true },
			holes: [
				{
					number: { type: Number, require: true },
					par: { type: Number, require: true },
					distance: { type: Number, require: true },
					hcp: { type: Number, require: true }
				}
			],
			total_distance: { type: Number, require: true }
		}
	],
	rating: [{ type: Number, require: true }],
	slope: [{ type: Number, require: true }]
});

const course_model = await connect_to_db();

export const Course_Model = course_model?.model('Course', Course_Schema);
