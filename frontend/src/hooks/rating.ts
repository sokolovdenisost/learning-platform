export const useRating = (rating: IRating[]): Rating => {
  let sumRating = 0;

  rating.forEach((r) => (sumRating += r.ratingNum));
  const avgRating = isNaN(sumRating / rating.length) ? 0 : sumRating / rating.length;

  return { rating: avgRating.toFixed(1), ratings: rating.length };
};

interface IRating {
  user: string;
  ratingNum: number;
}

interface Rating {
  rating: string;
  ratings: number;
}
