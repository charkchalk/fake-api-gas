import Service from "./service";

export default class DateRangeService extends Service<RawDateRange> {
  public constructor() {
    super("DateRanges");
  }

  public buildData(data: string[]): RawDateRange {
    const [id, name, description, start, end] = data;

    return {
      id,
      name,
      description,
      start,
      end,
    };
  }
}
