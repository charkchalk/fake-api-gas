interface Service<T> {
  getAll(): T[];
  get(id: string): T | null;
}
