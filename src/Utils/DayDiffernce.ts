import dayjs, { Dayjs } from "dayjs";


/**
 * 
 * @param date 
 * @returns days
 */
const DayDiffernce = (date:Dayjs): string => {

  
  // Calculating dateDiffernce and return the differnce in days
  const dateDiffernce = Math.round(dayjs(date).diff(dayjs(), "day", true));


  // If date differnce eqyal 1 then  return in hours
  if(dateDiffernce===1){
    return  `${Math.round(Math.abs(dayjs().diff(date,'hour',true))).toString()} Hours`
  }


  return `${dateDiffernce} Days`;
};




export default DayDiffernce
