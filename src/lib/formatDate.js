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
  }
  const formatted = intl.format(new Date(date));
  return formatted;
}
