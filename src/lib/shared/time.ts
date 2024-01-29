//Add Date and time
export const today = new Date();

// Get the current time
const hours = today.getHours();
const minutes = today.getMinutes();
const seconds = today.getSeconds();

// Format the time
export const formattedTime =
  hours +
  ":" +
  (minutes < 10 ? "0" : "") +
  minutes +
  ":" +
  (seconds < 10 ? "0" : "") +
  seconds;

const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, "0");
const day = today.getDate().toString().padStart(2, "0");
export const formattedDate = `${year}-${month}-${day}`;
