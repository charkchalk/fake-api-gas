import Service from "./service";

export default class DateRangeService extends Service<RawDateRange> {
  public constructor() {
    super("DateRanges");
  }

  public matches(data: string[], value: string): boolean {
    return (
      data[1].toLowerCase().includes(value.toLowerCase()) ||
      data[2].toLowerCase().includes(value.toLowerCase()) ||
      data[3].toLowerCase().includes(value.toLowerCase()) ||
      data[4].toLowerCase().includes(value.toLowerCase())
    );
  }

  public buildData(data: string[]): RawDateRange {
    const [uuid, name, description, start, end] = data;

    return {
      uuid,
      name,
      description,
      start,
      end,
    };
  }
}
