import mongoose from 'mongoose';

const User_Schema = new mongoose.Schema({
	user: {
		email: { type: String, require: true, unique: true },
		password: { type: String, require: true },
		name: { type: String, require: true },
		username: { type: String, require: true, unique: true },
		registration_date: { type: Date, require: true },
		last_login_date: { type: Date, require: true },
		measurement_units: { type: String, required: true, default: 'meters' },
		theme: { type: String, required: true, default: 'system' },
		handicap: { type: Number, required: true, default: 54 },
		handicap_updated: { type: Date, required: true, default: new Date() },
		bio: { type: String },
		badges: [
			{
				title: { type: String },
				description: { type: String },
				color: { type: String }
			}
		]
	},
	games: [
		{
			id: { type: String },
			name: { type: String },
			teams: { type: String },
			date: { type: String },
			data: { type: String }
		}
	],
	one_player_precision_highscore: {
		daily: {
			value: { type: Number, default: 0 },
			lastUpdated: { type: Date, default: null }
		},
		weekly: {
			value: { type: Number, default: 0 },
			lastUpdated: { type: Date, default: null }
		},
		monthly: {
			value: { type: Number, default: 0 },
			lastUpdated: { type: Date, default: null }
		},
		yearly: {
			value: { type: Number, default: 0 },
			lastUpdated: { type: Date, default: null }
		},
		all_time: {
			value: { type: Number, default: 0 },
			lastUpdated: { type: Date, default: null }
		}
	},
	golf_round: [
		{
			id: {type: String},
			course: {
				name: { type: String, required: true },
				location: { type: String },
				coursePar: {type: Number},
				parInfo: [{ holeNumber: Number, par: Number }],
				courseRating: { type: Number },
				slope: { type: Number }
			},
			roundInfo: {
				date: { type: Date, required: true },
				time: { type: String },
				weatherConditions: { type: String },
				playingPartners: [{ type: String }]
			},
			holeByHoleData: [
				{
					holeNumber: { type: Number, required: true },
					strokes: { type: Number, required: true },
					putts: { type: Number, required: true },
					fairwaysHit: { type: Boolean },
					greensInRegulation: { type: Boolean },
					penaltyStrokes: { type: Number, default: 0 }
				}
			],
			overallStatistics: {
				totalStrokes: { type: Number },
				totalPutts: { type: Number },
				fairwaysHitPercentage: { type: String },
				greensInRegulationPercentage: { type: String }
			}
		}
	],
	handicap_history: [
		{
			handicap: { type: Number },
			date: { type: Date }
		}
	]
});

export const User_Model = mongoose.model('User', User_Schema);
