export const hourConversor = (
  date: Date,
  hourType: string,
  hasMinutes: boolean
) => {
  // will make 12h shift or 24h shift conversion based on user preference
  let hours = date.getHours();
  const min = date.getMinutes();
  const minutes = min < 10 ? "0" + min : min;
  // if user wants 12h shift, type will be 12h, if not, it will be 24h
  if (hourType === "12h") {
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    // hasMinutes param is used to return string with 2 digits (just hours)
    return hasMinutes ? `${hours}:${minutes} ${ampm}` : `${hours} ${ampm}`;
  }
  return hasMinutes ? `${hours}:${minutes}` : `${hours}`;
};
