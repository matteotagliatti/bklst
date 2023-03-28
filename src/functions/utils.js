export function firstLetterUppercase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatDate(string) {
  return string.replace(/ .*/, "").slice(2);
}
