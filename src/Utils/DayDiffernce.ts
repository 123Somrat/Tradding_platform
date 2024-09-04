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
  const minuteDifference = dayjs(date).diff(now,"minute",true)
 
  // Determine if the difference should be displayed in hours or days
  if (dayDifference <= 1) {
    const hoursRemaining = Math.round(Math.abs(hourDifference));
    const minutesRemainig = Math.round(Math.abs(minuteDifference))
    if(hoursRemaining<=1){
        console.log(minuteDifference)
        return `${minutesRemainig} minutes`
    }
    return `${hoursRemaining} Hours`;
  }

  const daysRemaining = Math.round(dayDifference);
  return `${daysRemaining} Day${daysRemaining !== 1 ? 's' : ''}`;
}


export default getExpirationTime
