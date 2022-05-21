import moment from "moment"

export const getDate = (user_time) => {
    const date = moment(user_time);
    let formatedDate = "";

    if (moment().format("D MM YYYY") === date.format("D MM YYYY")) {
      formatedDate = `Today ${date.format("HH:mm")}`;
    } else if (moment(user_time).format("D MM YYYY") === moment().subtract(1, "days").format("D MM YYYY")) {
      formatedDate = `Yesterday ${date.format("HH:mm")}`;
    } else if (moment().isoWeek() === date.isoWeek()) {
      formatedDate = date.format("dddd HH:mm");
    } else {
      formatedDate = date.format(`D/MM${moment().year() !== date.year() ? "/YY" : ""}, HH:mm`);
    }

    return formatedDate;
  };

