// lib/utils.js
export function formatDate(dateString) {
  if (!dateString) return "";

  // Parse the date string (which is already in Indian time from the backend)
  const date = new Date(dateString);

  // Format it for display
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
