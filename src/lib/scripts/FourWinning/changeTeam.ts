import type { Team } from './types';
import { updateTeamTurn } from './updateTeamTurn';

export function changeTeam(
	currentTeamIndex: number,
	teams: Team[],
	currentTeam: Team,
	color: string
) {
	currentTeamIndex = (currentTeamIndex + 1) % teams.length;
	currentTeam = teams[currentTeamIndex];
	color = currentTeam.color;
	updateTeamTurn(color);
	return { currentTeamIndex, currentTeam, color, updateTeamTurn };
}
