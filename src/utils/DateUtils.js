import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

// returns the current date as an iso string
export const dateNow = () => {
    return new Date().toISOString()
};

// count the days from last watering/fertilizing to current day
export const dayCounter = (date, interval) => {
    const dateZero = dayjs(date).utc().startOf('day'); // set hh:mm:ss to 0
    const destDate = dateZero.add(interval, 'day');
    const currDate = dayjs().utc().startOf('day');
    const difference = destDate.diff(currDate, 'day');
    return difference;
};