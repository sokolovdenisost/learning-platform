export const useProcent = (currentNumber: number, maxNumber: number): string => {
  if (currentNumber && maxNumber) return `${(((currentNumber - 1) / maxNumber) * 100).toFixed(0)}%`;

  return `0%`;
};
