import dayjs, { Dayjs } from "dayjs";


/**
 * 
 * @param date 
 * @returns days or hours
 */

const getExpirationTime = (date: Dayjs): string => {
  const now = dayjs();
   
  // Calculate the difference in days and hours
  const dayDifference = dayjs(date).diff(now, 'day', true);
  const hourDifference = dayjs(date).diff(now, 'hour', true);
    
  console.log(dayDifference,hourDifference)
  // Determine if the difference should be displayed in hours or days
  if (dayDifference <= 1) {
    const hoursRemaining = Math.round(Math.abs(hourDifference));
    console.log('inside hours',hourDifference)
    return `${hoursRemaining} Hour${hoursRemaining !== 1 ? 's' : ''}`;
  }

  const daysRemaining = Math.round(dayDifference);
  return `${daysRemaining} Day${daysRemaining !== 1 ? 's' : ''}`;
}


export default getExpirationTime
