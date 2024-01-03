import mongoose from "mongoose";

const User_Schema = new mongoose.Schema({
  user: {
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    name: { type: String, require: true },
    measurement_units: { type: String, required: true, default: "meters" },
    theme: { type: String, required: true, default: "system" },
    handicap: { type: Number, required: true, default: 54 },
    handicap_updated: { type: Date, required: true, default: new Date() },
  },
  games: [
    {
      id: { type: String },
      name: { type: String },
      teams: { type: String },
      date: { type: String },
      data: { type: String },
    },
  ],
  handicap_history: [
    {
      handicap: { type: Number },
      date: { type: Date },
    },
  ],
  one_player_precision_highscore: {
    daily: {
      value: { type: Number, default: 0 },
      lastUpdated: { type: Date, default: null },
    },
    weekly: {
      value: { type: Number, default: 0 },
      lastUpdated: { type: Date, default: null },
    },
    monthly: {
      value: { type: Number, default: 0 },
      lastUpdated: { type: Date, default: null },
    },
    yearly: {
      value: { type: Number, default: 0 },
      lastUpdated: { type: Date, default: null },
    },
    all_time: {
      value: { type: Number, default: 0 },
      lastUpdated: { type: Date, default: null },
    },
  },
});

export const User_Model = mongoose.model("User", User_Schema);
