import moment from "moment"

export const getDate = (user_time) => {
    const date = moment(user_time);
    let formatedDate = "";

    if (moment().format("D MM YYYY") === date.format("D MM YYYY")) {
      formatedDate = `${date.format("HH:mm")}`;
    } else if (moment(user_time).format("D MM YYYY") === moment().subtract(1, "days").format("D MM YYYY")) {
      formatedDate = `Yesterday ${date.format("HH:mm")}`;
    } else if (moment().isoWeek() === date.isoWeek()) {
      formatedDate = date.format("dddd HH:mm");
    } else {
      formatedDate = date.format(`D/MM${moment().year() !== date.year() ? "/YY" : ""}, HH:mm`);
    }

    return formatedDate;
};

export const getOnlyDate = (user_time) => {
  const date = moment(user_time);
  let formatedDate = "";

  if (moment().format("D MM YYYY") === date.format("D MM YYYY")) {
    formatedDate = `Today`;
  } else if (moment(user_time).format("D MM YYYY") === moment().subtract(1, "days").format("D MM YYYY")) {
    formatedDate = `Yesterday`;
  } else if (moment().isoWeek() === date.isoWeek()) {
    formatedDate = date.format("dddd");
  } else {
    formatedDate = date.format(`D/MM${moment().year() !== date.year() ? "/YY" : ""}`);
  }

  return formatedDate;
};

export const getInitialsNameLetters = name => {
  let result = "";

  if (name && typeof name === "string") {
    let splittedName = name.split(" ");

    if (splittedName.length === 0) {
      splittedName = name.split("-");
    }

    if (splittedName.length > 2) {
      result = splittedName[0].charAt(0) + splittedName[splittedName.length - 1].charAt(0);
    } else {
      splittedName.forEach((item) => (result += item.charAt(0)));
    }
  }
  return result;
};

export const getURL = ({ url }) => {
  const publicUrl = "https://material-piquant-opinion.glitch.me";//"http://localhost:5000";

  if(Boolean(url) && (url.startsWith("https://") || url.startsWith("http://"))) return url;

  return `${publicUrl}/${url}`;
};

