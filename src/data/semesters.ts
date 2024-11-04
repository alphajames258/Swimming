export interface ProfileData {
    semester: string;
    id?: number; 
    name?: string; 
    age?: number; 
    times: {
      weekOne: SwimmingTimes;
      weekFour: SwimmingTimes;
      weekSeven: SwimmingTimes;
      weekTen: SwimmingTimes;
    };
  }
  export interface SwimmingTimes {
    freestyle: number;
    backstroke: number;
    breaststroke: number;
    butterfly: number;
    IM: number | string; 
  }


export interface PersonalBestTimes {
    freestyle: number; 
    backstroke: number;
    breaststroke: number;
    butterfly: number;
    IM: number | string; 
  }

export const semesterData = [
    {
        id: 1,
        age: 17,
        name: 'Jayden Zhen',
        attendedSemesters: ['2024Summer'],
    },
    {
        id: 2,
        age: 15,
        name: 'Charlotte Li',
        attendedSemesters: ['2024Summer', '2024Fall'],
    },
    {
        id: 3,
        age: 13,
        name: 'Cody Wu',
        attendedSemesters: ['2024Summer', '2024Fall'],
    },
    {
        id: 4,
        age: 16,
        name: 'Rafael Liao',
        attendedSemesters: ['2024Summer'],
    },
    {
        id: 5,
        age: 13,
        name: 'Anthony Xue',
        attendedSemesters: ['2024Summer', '2024Fall'],
    },
    {
        id: 6,
        age: 12,
        name: 'Evan Wang',
        attendedSemesters: ['2024Summer', '2024Fall'],
    },
    {
        id: 7,
        age: 12,
        name: 'Eric Wang',
        attendedSemesters: ['2024Summer', '2024Fall'],
    },
    {
        id: 8,
        age: 12,
        name: 'Jayden Ko',
        attendedSemesters: ['2024Summer', '2024Fall'],
    },
    {
        id: 9,
        age: 11,
        name: 'Julian Ko',
        attendedSemesters: ['2024Summer', '2024Fall'],
    },
    {
        id: 10,
        age: 15,
        name: 'Catherine Kwan',
        attendedSemesters: ['2024Summer', '2024Fall'],
    },
    {
        id: 11,
        age: 13,
        name: 'Christopher Kwan',
        attendedSemesters: ['2024Summer', '2024Fall'],
    },
    {
        id: 12,
        age: 16,
        name: 'Shu Xin',
        attendedSemesters: ['2024Summer', '2024Fall'],
    },
    {
        id: 13,
        age: 16,
        name: 'Xiao Wu',
        attendedSemesters: ['2024Summer', '2024Fall'],
    },
    {
        id: 14,
        age: 12,
        name: 'Ella Ngun',
        attendedSemesters: ['2024Summer', '2024Fall'],
    },
];
