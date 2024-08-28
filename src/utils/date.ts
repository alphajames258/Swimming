export function getTodaysDate() {
  const currentDate = new Date();

  const todaysDate = new Date(currentDate.getTime() - 0 * 60 * 60 * 1000);
  const todaysDateString = todaysDate.toISOString().split('T')[0];

  return todaysDateString;
}
