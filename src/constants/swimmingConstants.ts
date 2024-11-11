import {
  MIDDLESCHOOL_100_IM_2023_2024,
  MIDDLESCHOOL_50_BACK_2023_2024,
  MIDDLESCHOOL_50_BREAST_2023_2024,
  MIDDLESCHOOL_50_FLY_2023_2024,
  MIDDLESCHOOL_50_FREE_2023_2024,
  NYC_50_FREE_2023_2024,
} from '../server/firebase/constants';
import {
  FREESTYLE_ICON,
  BACKSTROKE_ICON,
  BREASTSTROKE_ICON,
  BUTTERFLY_ICON,
} from './icons';

const WEEK_ONE = 'weekOne';
const WEEK_FOUR = 'weekFour';
const WEEK_SEVEN = 'weekSeven';
const WEEK_TEN = 'weekTen';

export const WEEKS = [WEEK_ONE, WEEK_FOUR, WEEK_SEVEN, WEEK_TEN];

export const mapWeekToString = {
  [WEEK_ONE]: 'Week One',
  [WEEK_FOUR]: 'Week Four',
  [WEEK_SEVEN]: 'Week Seven',
  [WEEK_TEN]: 'Week Ten',
};

const EVENTS = [
  {
    name: '50 Yard Freestyle',
    imgSrc: FREESTYLE_ICON,
    data: [NYC_50_FREE_2023_2024, MIDDLESCHOOL_50_FREE_2023_2024],
  },
  // { name: '100 Yard Freestyle', imgSrc: FREESTYLE_ICON },
  // { name: '200 Yard Freestyle', imgSrc: FREESTYLE_ICON },
  // { name: '500 Yard Freestyle', imgSrc: FREESTYLE_ICON },

  {
    name: '50 Yard Backstroke',
    imgSrc: BACKSTROKE_ICON,
    data: [MIDDLESCHOOL_50_BACK_2023_2024],
  },
  // { name: '100 Yard Backstroke', imgSrc: BACKSTROKE_ICON },
  // { name: '200 Yard Backstroke', imgSrc: BACKSTROKE_ICON },
  // { name: '400 Yard Backstroke', imgSrc: BACKSTROKE_ICON },

  {
    name: '50 Yard Breaststroke',
    imgSrc: BREASTSTROKE_ICON,
    data: [MIDDLESCHOOL_50_BREAST_2023_2024],
  },
  // { name: '100 Yard Breaststroke', imgSrc: BREASTSTROKE_ICON },
  // { name: '200 Yard Breaststroke', imgSrc: BREASTSTROKE_ICON },
  // { name: '400 Yard Breaststroke', imgSrc: BREASTSTROKE_ICON },

  {
    name: '50 Yard Butterfly',
    imgSrc: BUTTERFLY_ICON,
    data: [MIDDLESCHOOL_50_FLY_2023_2024],
  },
  // { name: '100 Yard Butterfly', imgSrc: BUTTERFLY_ICON },
  // { name: '200 Yard Butterfly', imgSrc: BUTTERFLY_ICON },
  {
    name: '100 Yard IM',
    imgSrc: BUTTERFLY_ICON,
    data: [MIDDLESCHOOL_100_IM_2023_2024],
  },
];

export {
  EVENTS,
  FREESTYLE_ICON,
  BACKSTROKE_ICON,
  BREASTSTROKE_ICON,
  BUTTERFLY_ICON,
};
