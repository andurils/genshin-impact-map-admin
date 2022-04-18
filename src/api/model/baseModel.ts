export interface BasicPageParams {
  current: number;
  size: number;
}

// export interface BasicFetchResult<T> {
//   items: T[];
//   total: number;
// }

export interface BasicFetchPageResult<T> {
  current: number;
  maxLimit: number;
  size: number;
  total: number;
  pages: number;
  records: T[];

  countId: boolean;
  hitCount: boolean;
  optimizeCountSql: boolean;
  searchCount: boolean;
}
