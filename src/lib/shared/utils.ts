export function capitalizeFirstLetter(string: string | undefined) {
  // Check if the string is defined and not empty
  if (typeof string === "string" && string.length > 0) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    // If the string is not a valid string or is undefined, replace it with "undefined"
    return "undefined";
  }
}

export function removeLastLetter(string: string) {
  return string.slice(0, -1);
}

export function asignNameToTeam(teams: string) {
  let name: string;

  if (teams === "4winning_2_teams") {
    name = "4 Winning 2 Players";
  } else if (teams === "4winning_3_teams") {
    name = "4 Winning 3 Players";
  } else if (teams === "4winning_4_teams") {
    name = "4 Winning 4 Players";
  } else if (teams === "exact_2_teams") {
    name = "Exact 2 Players";
  } else if (teams === "exact_3_teams") {
    name = "Exact 3 Players";
  } else if (teams === "exact_4_teams") {
    name = "Exact 4 Players";
  } else {
    name = "Undefined";
  }

  return name;
}

export function getTimeThreshold(period: string): number {
  switch (period) {
    case "daily":
      return 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    case "weekly":
      return 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    case "monthly":
      return 28 * 24 * 60 * 60 * 1000; // 28 days in milliseconds
    case "yearly":
      return 365 * 24 * 60 * 60 * 1000; // 365 days in milliseconds
    default:
      return 0;
  }
}
