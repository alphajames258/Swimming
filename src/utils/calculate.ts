export function analyzeSwimmerPerformance(
  formData,
  totalSwimmers,
  firstPercent,
  secondPercent
) {
  const parsedSwimmers = totalSwimmers.map(swimmer => ({
    ...swimmer,
    time: parseFloat(swimmer.time),
  }));

  const timeToFloat = parseFloat(formData.time);

  // Insert form data time into the array
  parsedSwimmers.push({
    name: 'Form Data Swimmer',
    profileLink: '',
    organization: '',
    time: timeToFloat,
  });

  parsedSwimmers.sort((a, b) => a.time - b.time);

  const formDataIndex = parsedSwimmers.findIndex(
    swimmer => swimmer.name === 'Form Data Swimmer'
  );

  const firstIndex = Math.floor(formDataIndex * firstPercent);
  const secondIndex = Math.floor(formDataIndex * secondPercent);

  const slightlyBetterSwimmer = parsedSwimmers[firstIndex];
  const betterSwimmer = parsedSwimmers[secondIndex];
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
