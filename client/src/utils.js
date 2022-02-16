export const justAnAlert = () => {
  alert('hello');
}

//convert ISO8601 date to Month DD, YYYY format
export const formatDate = (isoDate) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const monthName = months[monthIndex];

  return `${monthName} ${day}, ${year}`
}