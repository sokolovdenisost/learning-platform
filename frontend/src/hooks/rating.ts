export const useRating = (rating: IRating[]): Rating => {
  let sumRating = 0;
  rating.forEach((r) => (sumRating += r.ratingNum));

  return { rating: sumRating, ratings: rating.length };
};

interface IRating {
  user: string;
  ratingNum: number;
}

interface Rating {
  rating: number;
  ratings: number;
}
