interface StandardResponse<T = unknown> {
  content: T;
  pagination: PaginationStat;
}
