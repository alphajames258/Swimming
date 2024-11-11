export function analyzeSwimmerPerformance(
  formData,
  totalSwimmers,
  firstPercent,
  secondPercent
) {
  console.log(totalSwimmers, 'anthony total swimmers');
  const parsedSwimmers = totalSwimmers.map(swimmer => ({
    ...swimmer,
    time: convertTimeStringToSeconds(swimmer.time),
  }));

  console.log(parsedSwimmers, 'anthony parsed swimmers');

  const timeToFloat = parseFloat(formData.time);

  // Insert form data time into the array
  parsedSwimmers.push({
    name: 'Your Time',
    profileLink: '',
    organization: '',
    time: timeToFloat,
  });

  parsedSwimmers.sort((a, b) => a.time - b.time);

  const formDataIndex = parsedSwimmers.findIndex(
    swimmer => swimmer.name === 'Your Time'
  );

  const firstIndex = Math.floor(formDataIndex * firstPercent);
  const secondIndex = Math.floor(formDataIndex * secondPercent);

  const slightlyBetterSwimmer = parsedSwimmers[firstIndex];
  const betterSwimmer = parsedSwimmers[secondIndex];
  console.log(parsedSwimmers, secondIndex, 'anthony parsed swimmers');
  const percentile = ((formDataIndex / parsedSwimmers.length) * 100).toFixed(2);

  return {
    time: timeToFloat,
    percentile,
    slightlyBetterSwimmer,
    betterSwimmer,
  };
}

export function convertTimeToSeconds(
  minutes?: string,
  second?: string,
  milliseconds?: string
): number {
  // Split the time string into its components
  const minutesInt = parseInt(minutes || '0');
  const secondsInt = parseInt(second || '0');
  const millisecondsInt = parseInt(milliseconds || '0');
  const totalSeconds = minutesInt * 60 + secondsInt + millisecondsInt / 1000;

  return totalSeconds;
}

export function convertTimeStringToSeconds(timeString: string): number {
  // Check if the time string contains a colon
  if (timeString.includes(':')) {
    // Split the time string into its components
    const [minutes, secondsWithMilliseconds] = timeString.split(':');
    const [seconds, milliseconds] = secondsWithMilliseconds.split('.');

    // Convert the components to numbers
    const totalSeconds =
      parseInt(minutes) * 60 + parseInt(seconds) + parseInt(milliseconds) / 100;

    return totalSeconds;
  } else {
    // Handle the case where the time string is in the format SS.SS
    const [seconds, milliseconds] = timeString.split('.');

    // Convert the components to numbers
    const totalSeconds = parseInt(seconds) + parseInt(milliseconds) / 100;

    return totalSeconds;
  }
}
