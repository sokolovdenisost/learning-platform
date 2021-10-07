export const useDate = (data: string): string => {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dataSplit: string[] = data.split("/");

  return `${months[Number(dataSplit[0]) - 1]} ${dataSplit[1]}, ${dataSplit[2]}`;
};
