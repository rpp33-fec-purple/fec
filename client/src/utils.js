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


export const shorten = (string, maxChars, id) => {
  //count characters in string
  //if string is less than maxChars
    //return string
  //otherwise
  // split string at maxChars
  // store first string and second string
  //wrap second string in a span tag

  //return firststring moreButton span secondstring
  return <div>`${string}`</div>;
}