import type { GolfRoundOverallStatistics } from "./GolfRoundOverallStatistics";
import type { GolfRoundCourse } from "./golfRoundCourse";
import type { GolfRoundHole } from "./golfRoundHole";
import type { GolfRoundRoundInfo } from "./golfRoundRoundInfo";

export interface GolfRound {
  id: string;
  course: GolfRoundCourse;
  roundInfo: GolfRoundRoundInfo;
  holeByHoleData: GolfRoundHole[];
  overallStatistics: GolfRoundOverallStatistics;
}
