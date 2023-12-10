type DRFResponse<T> = {
  count: number;
  next: null;
  previous: null;
  results: T[];
};
