export const mockStudentData = [
  {
    id: 1,
    name: "Jayden Zhen",
    age: 15,
    times: {
      weekOne: {
        freestyle: 27.17,
        backstroke: 30.66,
        breaststroke: 35.33,
        butterfly: 30.55,
      },
      weekFour: {
        freestyle: 26.55,
        backstroke: 29.55,
        breaststroke: 34.22,
        butterfly: 28.99,
      },
    },
  },
  {
    id: 2,
    name: "Charlotte",
    age: 16,
    times: {
      weekOne: {
        freestyle: 30.2,
        backstroke: 33.5,
        breaststroke: 36.2,
        butterfly: 32.3,
      },
      weekFour: {
        freestyle: 29.99,
        backstroke: 32.99,
        breaststroke: 35.99,
        butterfly: 31.5,
      },
    },
  },
];

export const swimmingApi = {
  "2024Summer": mockStudentData,
};
