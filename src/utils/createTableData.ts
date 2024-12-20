export function createTableData(data, week: string) {
  const rows: any = [];
  const hasWeekData = data.some(student => student.times[week]);

  if (!hasWeekData) {
    return [];
  }

  for (let i = 0; i < data.length; i++) {
    let student = data[i];
    let id = student.id;
    let name = student.name ?? 'N/A';
    let age = student.age ?? 'N/A';
    const freestyle = student.times?.[`${week}`]?.freestyle ?? 'N/A';
    const backstroke = student.times?.[`${week}`]?.backstroke ?? 'N/A';
    const breaststroke = student.times?.[`${week}`]?.breaststroke ?? 'N/A';
    const butterfly = student.times?.[`${week}`]?.butterfly ?? 'N/A';
    const IM = student.times?.[`${week}`]?.IM ?? 'N/A'; 

    rows.push({ id, name, age, freestyle, backstroke, breaststroke, butterfly, IM });
  }

  return rows;
}
