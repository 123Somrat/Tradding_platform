import dayjs, { Dayjs } from "dayjs";


/**
 * 
 * @param date 
 * @returns days
 */
const DayDiffernce = (date:Dayjs): number => {
  // Calculating dateDiffernce and return the differnce in days
  const dateDiffernce = Math.round(dayjs(date).diff(dayjs(), "day", true));

  return dateDiffernce;
};




export { DayDiffernce }
