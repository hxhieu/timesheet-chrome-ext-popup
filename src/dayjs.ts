/*
 * This agumented DayJS with plugins we need
 */

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import en from 'dayjs/locale/en';

// English and Monday week start
dayjs.locale({
  ...en,
  weekStart: 1,
});

// Custom format
dayjs.extend(customParseFormat);
