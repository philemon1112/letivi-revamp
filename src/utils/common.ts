import moment from "moment";

interface FormatDateOptions {
  format?: string; // Custom date format (default: "DD/MM/YYYY")
  relative?: boolean; // Use "fromNow" format (e.g. "2 hours ago")
  locale?: string; // Set locale (e.g. "en", "fr", "ar")
  utc?: boolean; // Format as UTC time
}

export const formatDate = (
  date: string | Date | undefined | null,
  options: FormatDateOptions = {}
): string => {
  if (!date) return "";

  const {
    format = "DD/MM/YYYY",
    relative = false,
    locale = "en",
    utc = false,
  } = options;

  let m = utc ? moment.utc(date) : moment(date);

  m.locale(locale);

  return relative ? m.fromNow() : m.format(format);
};
