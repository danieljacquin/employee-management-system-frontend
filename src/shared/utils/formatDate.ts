/**
 * Formats a date string into a human-readable format.
 * Example output: "January 12, 2026"
 *
 * @param dateString - ISO date string or valid date value
 * @returns Formatted date string or "-" if no date is provided
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Formats a date value for HTML date input fields.
 * Converts the date into "YYYY-MM-DD" format.
 *
 * @param date - Date object or date string
 * @returns Formatted date string compatible with input[type="date"]
 */
export const formatDateForInput = (date: string | Date) => {
  return new Date(date).toISOString().split('T')[0];
};
