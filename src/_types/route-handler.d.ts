interface RouteHandler<T = unknown> {
  route: string;
  handler(
    pagination?: CanPaginate,
    params?: Record<string, string>,
    urlParams?: { [k: string]: string },
  ): T | null | (T | null)[];
}
