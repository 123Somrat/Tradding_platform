import { Dayjs } from "dayjs";
import DayDiffernce from "./DayDiffernce";

/**
 *
 * @param date
 * @returns status
 */
const Status = (date: Dayjs): string => {
  // Call the DayDiffernce utils to calculate the dayDiffernce
  const dayDiffernce = DayDiffernce(date);
  const hoursOrDays = dayDiffernce.split(' ');
   

 // retun the status
  const status = hoursOrDays.includes('Hour') ? "Expired soon" : "Have time";

  return status;
};

export default Status;
