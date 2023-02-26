interface Service<T = unknown> {
  tableName: string;
  getAll(): T[];
  get(id: string): T | null;
  buildData(data: string[]): T;
}
