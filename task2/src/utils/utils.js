import moment from "moment";

const HOST = "localhost";
const PORT = "5000";
export const BASE_URL = `http://${HOST}:${PORT}`;

export const formatDateYYYYMMDD = (datetime) => {
  if (!datetime) return "";
  return moment(new Date(datetime)).format("YYYY-MM-DD");
};
