export function formatDate(date, dateStyle = "date-time") {
  if (dateStyle === "date-time") {
    var intl = new Intl.DateTimeFormat("en-UK", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } else if (dateStyle === "time") {
    var intl = new Intl.DateTimeFormat("en-UK", {
      timeStyle: "short",
    });
  } else if (dateStyle === "date") {
    var intl = new Intl.DateTimeFormat("en-UK", {
      dateStyle: "medium",
    });
  } else if (dateStyle === "day-month") {
    var intl = new Intl.DateTimeFormat("en-UK", {
      day: "numeric",
      month: "numeric",
    });
  }
  const formatted = intl?.format(new Date(date));
  return formatted;
}

export function formatDateRelative(date, dateStyle = "long") {
  const rtf = new Intl.RelativeTimeFormat("en-UK");
  const currTS = Date.now();
  const diff = currTS - new Date(date).getTime();
  const msToMin = 60000;
  const msToH = msToMin * 60;
  const msToD = msToH * 24;

  if (dateStyle === "long") {
    if (diff < msToMin) {
      return "Moins d'une minute";
    } else if (diff < 60 * msToMin) {
      return rtf.format(-Math.floor(diff / msToMin), "minute");
    } else if (diff < msToD) {
      return rtf.format(-Math.floor(diff / msToH), "hour");
    } else if (diff < 7 * msToD) {
      return rtf.format(-Math.floor(diff / msToD), "day");
    } else {
      return formatDate(date);
    }
  } else if (dateStyle === "short") {
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;

    if (diff < minute) {
      return "now";
    } else if (diff < hour) {
      const minutes = Math.floor(diff / minute);
      return `${minutes}m`;
    } else if (diff < day) {
      const hours = Math.floor(diff / hour);
      return `${hours}h`;
    } else if (diff < month) {
      const days = Math.floor(diff / day);
      return `${days}d`;
    } else if (diff < year) {
      const months = Math.floor(diff / month);
      return `${months}mo`;
    } else {
      const years = Math.floor(diff / year);
      return `${years}y`;
    }
  }
}
