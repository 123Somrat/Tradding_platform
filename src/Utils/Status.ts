import { Dayjs } from "dayjs";
import DayDiffernce from "./DayDiffernce";

/**
 *
 * @param date
 * @returns status dependes on day , hours , minutes
 */
const Status = (date: Dayjs): string => {
  // Call the DayDiffernce utils to calculate the dayDiffernce
  const dayDiffernce = DayDiffernce(date);
  const hoursOrDays = dayDiffernce.split(' ');
   

 // retun the status dependes on day hours minutes
  const status = hoursOrDays.includes('Hours' || 'minutes') ? "Expired soon" : "Have time";

  return status;
};

export default Status;
