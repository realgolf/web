import type { Achievements } from "./interface/Achievements";
import type { GolfRound } from "./interface/GolfRound";
import type { HandicapHistory } from "./interface/HandicapHistory";
import type { OnePlayerPrecisionHighscore } from "./interface/OnePlayerPrecision";

export interface User {
  user: {
    email: string;
    password: string;
    name: string;
    username: string;
    registration_date: Date;
    last_login_date: Date;
    measurement_units: string;
    theme: string;
    handicap: number;
    handicap_updated: Date;
    bio?: string;
    badges?: { title: string; description: string; color: string }[];
  };
  achievements: Achievements[];
  games: {
    id: string;
    name: string;
    teams: string;
    date: string;
    data: string;
  }[];
  total_games: number;
  one_player_precision_highscore: OnePlayerPrecisionHighscore;
  golf_round: GolfRound[];
  handicap_history: HandicapHistory[];
}
