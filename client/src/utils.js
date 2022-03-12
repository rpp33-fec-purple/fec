import {useParams} from 'react-router-dom';
const baseUrl = require('./../../config.js');


export const wrapWithParams = (Component) => {
  return props => <Component {...props} params = {useParams()}/>;
}
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

export const clickTracker = (element, widgetName) => {
  var currentTime = formatDate(new Date());
  $.ajax({
    url: `${baseUrl}/interactions`,
    method: 'POST',
    data: {
      element: element,
      widget: widgetName,
      time: currentTime
    },
    success: () => {
      console.log(`Post request to ${baseUrl}/interactions successful!`);
    },
    error: () => {
      // console.log('Error sending post request to http://localhost:3000/interactions');
    }

  })

}


export const shorten = (string, maxChars, id) => {};