export function createTableData(data, week: string) {
  const rows: any = [];

  for (let i = 0; i < data.length; i++) {
    let student = data[i];

    if (!student.times[week]) {
      return [];
    }
    let name = student.name;
    const freestyle = student.times[`${week}`].freestyle;
    const backstroke = student.times[`${week}`].backstroke;
    const breastroke = student.times[`${week}`].freestyle;
    const butterfly = student.times[`${week}`].freestyle;

    rows.push({ name, freestyle, backstroke, breastroke, butterfly });
  }
  return rows;
}
