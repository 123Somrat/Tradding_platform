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
  const status = dayDiffernce <= 1 ? "Expired soon" : "Have time";

  return status;
};

export default Status;
