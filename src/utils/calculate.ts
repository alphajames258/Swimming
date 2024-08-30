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

  // Insert form data time into the array
  parsedSwimmers.push({
    name: 'Form Data Swimmer',
    profileLink: '',
    organization: '',
    time: parseFloat(formData.time),
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
    percentile,
    slightlyBetterSwimmer,
    betterSwimmer,
  };
}
